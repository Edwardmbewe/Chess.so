// User Types
export interface User {
  id: string
  username: string
  email: string
  avatar_url?: string
  bio?: string
  rating: number
  wins: number
  losses: number
  draws: number
  created_at: string
  updated_at: string
  followers_count: number
  following_count: number
}

// Chess Game Types
export interface ChessGame {
  id: string
  white_player_id: string
  black_player_id: string
  white_player: User
  black_player: User
  status: 'pending' | 'active' | 'completed'
  result: 'white' | 'black' | 'draw' | null
  time_control: 'bullet' | 'blitz' | 'rapid' | 'classic'
  pgn: string
  created_at: string
  updated_at: string
}

// Social Post Types
export interface Post {
  id: string
  user_id: string
  author: User
  content: string
  image_url?: string
  likes_count: number
  comments_count: number
  shares_count: number
  created_at: string
  updated_at: string
}

// Video Types
export interface Video {
  id: string
  user_id: string
  author: User
  title: string
  description: string
  video_url: string
  thumbnail_url?: string
  likes_count: number
  comments_count: number
  shares_count: number
  created_at: string
  updated_at: string
}

// Message Types
export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  sender: User
  recipient: User
  content: string
  image_url?: string
  read: boolean
  created_at: string
}

// Status Types
export interface Status {
  id: string
  user_id: string
  author: User
  content: string
  image_url: string
  viewed_by: string[]
  created_at: string
  expires_at: string
}

// Comment Types
export interface Comment {
  id: string
  user_id: string
  post_id?: string
  video_id?: string
  author: User
  content: string
  likes_count: number
  created_at: string
}

// Like Types
export interface Like {
  id: string
  user_id: string
  post_id?: string
  video_id?: string
  created_at: string
}

// Follow Types
export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}

// Auth Types
export interface AuthUser {
  id: string
  email: string
  user_metadata?: {
    username?: string
    avatar_url?: string
  }
}
