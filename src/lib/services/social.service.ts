import { supabase } from '../supabase'
import { Post, Comment } from '@/types'

export const socialService = {
  async createPost(userId: string, content: string, imageUrl?: string) {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: userId,
          content,
          image_url: imageUrl,
        },
      ])
      .select('*, author:users!user_id(*)')
      .single()

    if (error) throw error
    return data
  },

  async getPosts(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:users!user_id(*)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data
  },

  async getFollowingFeed(userId: string, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:users!user_id(*), likes:likes(count)')
      .in('user_id', [
        userId,
        ...((await this.getFollowing(userId)).map((f: any) => f.following_id) || []),
      ])
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data
  },

  async likePost(postId: string, userId: string) {
    const { error } = await supabase.from('likes').insert([
      {
        post_id: postId,
        user_id: userId,
      },
    ])

    if (error) throw error
  },

  async unlikePost(postId: string, userId: string) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)

    if (error) throw error
  },

  async addComment(postId: string, userId: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: postId,
          user_id: userId,
          content,
        },
      ])
      .select('*, author:users!user_id(*)')
      .single()

    if (error) throw error
    return data
  },

  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, author:users!user_id(*)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  },

  async deletePost(postId: string) {
    const { error } = await supabase.from('posts').delete().eq('id', postId)

    if (error) throw error
  },

  async getFollowing(userId: string) {
    const { data, error } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', userId)

    if (error) throw error
    return data
  },
}
