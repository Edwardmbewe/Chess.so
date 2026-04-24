import { supabase } from '../supabase'
import { User } from '@/types'

export const userService = {
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async createUser(userId: string, email: string, username: string) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email,
          username,
          rating: 1200,
          wins: 0,
          losses: 0,
          draws: 0,
          followers_count: 0,
          following_count: 0,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUserByUsername(username: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data || null
  },

  async searchUsers(query: string, limit = 20) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .ilike('username', `%${query}%`)
      .limit(limit)

    if (error) throw error
    return data
  },

  async getLeaderboard(limit = 100) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async followUser(followerId: string, followingId: string) {
    const { error } = await supabase.from('follows').insert([
      {
        follower_id: followerId,
        following_id: followingId,
      },
    ])

    if (error) throw error

    // Update follower/following counts
    const user = await this.getUser(followingId)
    await this.updateUser(followingId, {
      followers_count: (user?.followers_count || 0) + 1,
    })

    const follower = await this.getUser(followerId)
    await this.updateUser(followerId, {
      following_count: (follower?.following_count || 0) + 1,
    })
  },

  async unfollowUser(followerId: string, followingId: string) {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId)

    if (error) throw error

    // Update follower/following counts
    const user = await this.getUser(followingId)
    await this.updateUser(followingId, {
      followers_count: Math.max((user?.followers_count || 0) - 1, 0),
    })

    const follower = await this.getUser(followerId)
    await this.updateUser(followerId, {
      following_count: Math.max((follower?.following_count || 0) - 1, 0),
    })
  },

  async isFollowing(followerId: string, followingId: string) {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  },
}
