import { supabase } from '../supabase'
import { Video } from '@/types'

export const videoService = {
  async uploadVideo(
    userId: string,
    title: string,
    description: string,
    videoFile: File,
    thumbnailFile?: File
  ) {
    // Upload video file
    const videoPath = `videos/${userId}/${Date.now()}_${videoFile.name}`
    const { error: videoError } = await supabase.storage
      .from('videos')
      .upload(videoPath, videoFile)

    if (videoError) throw videoError

    const videoUrl = supabase.storage.from('videos').getPublicUrl(videoPath).data.publicUrl

    // Upload thumbnail if provided
    let thumbnailUrl = null
    if (thumbnailFile) {
      const thumbnailPath = `thumbnails/${userId}/${Date.now()}_${thumbnailFile.name}`
      const { error: thumbError } = await supabase.storage
        .from('thumbnails')
        .upload(thumbnailPath, thumbnailFile)

      if (thumbError) throw thumbError
      thumbnailUrl = supabase.storage.from('thumbnails').getPublicUrl(thumbnailPath).data.publicUrl
    }

    // Create video record
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          user_id: userId,
          title,
          description,
          video_url: videoUrl,
          thumbnail_url: thumbnailUrl,
        },
      ])
      .select('*, author:users!user_id(*)')
      .single()

    if (error) throw error
    return data
  },

  async getVideoFeed(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('videos')
      .select('*, author:users!user_id(*)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data
  },

  async getVideo(videoId: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('*, author:users!user_id(*)')
      .eq('id', videoId)
      .single()

    if (error) throw error
    return data
  },

  async likeVideo(videoId: string, userId: string) {
    const { error } = await supabase.from('likes').insert([
      {
        video_id: videoId,
        user_id: userId,
      },
    ])

    if (error) throw error
  },

  async unlikeVideo(videoId: string, userId: string) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('video_id', videoId)
      .eq('user_id', userId)

    if (error) throw error
  },

  async getUserVideos(userId: string) {
    const { data, error } = await supabase
      .from('videos')
      .select('*, author:users!user_id(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async deleteVideo(videoId: string) {
    const { error } = await supabase.from('videos').delete().eq('id', videoId)

    if (error) throw error
  },
}
