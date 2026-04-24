# Chess.so - Social Chess Platform

A modern social chess platform combining the best features of chess.com, lichess, Facebook, TikTok, WhatsApp, and Instagram.

## 🎯 Features

### ♟️ Chess Features
- **Quick Pairing**: Find opponents based on rating and time control
- **Multiple Time Controls**: Bullet (1 min), Blitz (3 min), Rapid (10 min), Classic (30+ min)
- **Live Chess Games**: Real-time multiplayer games
- **Game Analysis**: Move-by-move analysis and statistics
- **Rating System**: ELO-based rating calculation

### 📱 Social Features
- **Social Feed**: Facebook-style post feed with likes and comments
- **TikTok Videos**: Upload and share chess instructional videos
- **User Profiles**: Detailed player profiles with stats and achievements
- **Follow System**: Follow favorite players and get updates
- **Leaderboards**: Global and regional rankings

### 💬 Messaging
- **WhatsApp-style Chat**: Direct messaging with read receipts
- **Status Updates**: Instagram Stories-like 24-hour status
- **Image Sharing**: Share images and media in conversations
- **Group Chats**: Create and manage group conversations (coming soon)

### 🎨 UI/UX
- **Dark & Light Theme**: Full dark mode support with green accents
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion for delightful interactions
- **Clean Interface**: Inspired by Instagram's simplicity

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Real-time**: Supabase Realtime

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/Edwardmbewe/Chess.so.git
cd Chess.so

# Install dependencies
npm install

# Create .env.local file with your Supabase credentials
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://rxtzjmuwbvfrccyfrcwx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ivLcYXdknInGUCTQ53_ufg_0glxmzBx
EOF

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── page.tsx        # Home page
│   ├── layout.tsx      # Root layout
│   ├── videos/         # Videos page
│   └── auth/           # Authentication pages
├── components/          # Reusable components
│   ├── Sidebar.tsx
│   ├── Navigation.tsx
│   ├── ChessQuickPair.tsx
│   └── FeedSection.tsx
├── lib/
│   ├── supabase.ts     # Supabase client
│   └── services/       # API services
├── context/             # React context
├── store/              # Zustand stores
├── types/              # TypeScript types
└── styles/             # Global styles
```

## 🚀 Quick Start Guide

### 1. **Home Page** (`/`)
   - **Chess Quick Pair**: Select time control and find an opponent
   - **Social Feed**: See posts from players you follow
   - **User Stats**: View your rating, wins, losses, draws

### 2. **Videos** (`/videos`)
   - Browse chess tutorials and streams
   - Like, comment, and share videos
   - Create your own content

### 3. **Messages** (`/messages`)
   - Direct messaging with other players
   - Status updates (24-hour expiring)
   - Group chat support

### 4. **Profile** (`/profile/[id]`)
   - View player statistics and achievements
   - Game history
   - Follow/Unfollow options

## 🎮 How to Play

1. Sign up with email and create your profile
2. Set your rating level (or start at 1200)
3. Go to Home page and select a time control
4. Click "Quick Pair" to find an opponent
5. Play chess in the browser with live updates
6. Share your results on the social feed

## 🔐 Database Schema

The application uses these main Supabase tables:
- `users` - Player profiles
- `chess_games` - Game records
- `game_moves` - Individual moves
- `posts` - Social posts
- `videos` - Video content
- `messages` - Direct messages
- `statuses` - Story-like statuses
- `follows` - Follow relationships
- `likes` - Post/video likes
- `comments` - Post/video comments

## 🌙 Theme Support

Switch between dark mode (default) and light mode:
- Click theme toggle in sidebar
- Preference is saved to localStorage
- Green accents remain consistent across both themes

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔄 Real-time Features

Connected to Supabase Realtime for:
- Live game moves
- Real-time notifications
- Chat message updates
- Status expiration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Supabase Project**: https://rxtzjmuwbvfrccyfrcwx.supabase.co
- **GitHub Repository**: https://github.com/Edwardmbewe/Chess.so

## 💬 Support

For support, email support@chess.so or open an issue on GitHub.

---

Built with ❤️ by Edward Mbewe
