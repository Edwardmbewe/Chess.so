'use client';

import React, { useState, useEffect } from 'react';
import { IoArrowBack, IoHeart, IoHeartOutline, IoChatbubbleOutline, IoShareSocialOutline } from 'react-icons/io5';
import Link from 'next/link';
import { videoService } from '@/lib/services/video.service';
import { Video } from '@/types';
import { useAuth } from '@/hooks';

export default function VideosPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const feedVideos = await videoService.getVideoFeed();
    setVideos(feedVideos);
    setLoading(false);
  };

  const handleLike = async (videoId: string) => {
    if (!user) return;

    if (likedVideos.has(videoId)) {
      await videoService.unlikeVideo(videoId, user.id);
      setLikedVideos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    } else {
      await videoService.likeVideo(videoId, user.id);
      setLikedVideos((prev) => new Set([...prev, videoId]));
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-chess-dark-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-chess-green to-chess-green-dark text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
          <IoArrowBack size={24} />
          <span>Back</span>
        </Link>
        <h1 className="text-xl font-bold">Chess Videos</h1>
        <div className="w-6"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chess-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-white dark:bg-chess-dark-surface rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-chess-dark-border"
              >
                <div className="relative aspect-video bg-gray-200 dark:bg-chess-dark-bg">
                  {video.thumbnail_url && (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition flex items-center justify-center">
                    <div className="w-16 h-16 bg-chess-green rounded-full flex items-center justify-center text-white text-3xl">
                      ▶
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{video.author?.username || 'Unknown'}</p>

                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-3">
                    <span>❤️ {video.likes_count}</span>
                    <span>💬 {video.comments_count}</span>
                    <span>📤 {video.shares_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-chess-dark-surface rounded-lg w-full max-w-4xl max-h-96 flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Video Player Area */}
            <div className="flex-1 flex items-center justify-center bg-black rounded-lg mx-4 mb-4">
              <video
                src={selectedVideo.video_url}
                controls
                autoPlay
                className="w-full h-full max-h-80 rounded"
              />
            </div>

            {/* Video Info */}
            <div className="px-4 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedVideo.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-chess-green text-white font-bold flex items-center justify-center">
                    {selectedVideo.author?.username.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedVideo.author?.username || 'Unknown'}</span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleLike(selectedVideo.id)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-chess-green transition"
                  >
                    {likedVideos.has(selectedVideo.id) ? (
                      <IoHeart size={24} className="text-chess-green" />
                    ) : (
                      <IoHeartOutline size={24} />
                    )}
                    <span className="font-semibold">{selectedVideo.likes_count}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-chess-green transition">
                    <IoChatbubbleOutline size={24} />
                    <span className="font-semibold">{selectedVideo.comments_count}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-chess-green transition">
                    <IoShareSocialOutline size={24} />
                    <span className="font-semibold">{selectedVideo.shares_count}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
