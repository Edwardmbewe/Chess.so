import { supabase } from '../supabase'
import { Message, Status } from '@/types'

export const messagingService = {
  async sendMessage(
    senderId: string,
    recipientId: string,
    content: string,
    imageUrl?: string
  ) {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          sender_id: senderId,
          recipient_id: recipientId,
          content,
          image_url: imageUrl,
          read: false,
        },
      ])
      .select('*, sender:users!sender_id(*), recipient:users!recipient_id(*)')
      .single()

    if (error) throw error
    return data
  },

  async getConversation(userId1: string, userId2: string, limit = 50) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*), recipient:users!recipient_id(*)')
      .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getConversations(userId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*), recipient:users!recipient_id(*)')
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Group by conversation
    const conversations = new Map()
    data?.forEach((msg: any) => {
      const otherId = msg.sender_id === userId ? msg.recipient_id : msg.sender_id
      if (!conversations.has(otherId)) {
        conversations.set(otherId, msg)
      }
    })

    return Array.from(conversations.values())
  },

  async markAsRead(messageId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId)

    if (error) throw error
  },

  async createStatus(userId: string, content: string, imageUrl: string) {
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const { data, error } = await supabase
      .from('statuses')
      .insert([
        {
          user_id: userId,
          content,
          image_url: imageUrl,
          expires_at: expiresAt.toISOString(),
        },
      ])
      .select('*, author:users!user_id(*)')
      .single()

    if (error) throw error
    return data
  },

  async getStatuses(userId: string) {
    const { data, error } = await supabase
      .from('statuses')
      .select('*, author:users!user_id(*)')
      .eq('user_id', userId)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async viewStatus(statusId: string, userId: string) {
    const { data: status, error: fetchError } = await supabase
      .from('statuses')
      .select('viewed_by')
      .eq('id', statusId)
      .single()

    if (fetchError) throw fetchError

    const viewedBy = status?.viewed_by || []
    if (!viewedBy.includes(userId)) {
      viewedBy.push(userId)
    }

    const { error } = await supabase
      .from('statuses')
      .update({ viewed_by: viewedBy })
      .eq('id', statusId)

    if (error) throw error
  },
}
