# ♟️ Chess Game - Full Stack Multiplayer

A beautiful, full-featured chess game with real-time multiplayer, user authentication, and friend system.
<img width="1919" height="865" alt="Screenshot 2025-12-01 062244" src="https://github.com/user-attachments/assets/30647934-8365-47fd-b6e6-1da1c3aed05d" />
<img width="718" height="719" alt="Screenshot 2025-12-01 021639" src="https://github.com/user-attachments/assets/e3732b4d-c3ae-431b-85c0-748900fc8de7" />

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/chess-game)
## 🚀 APK DOUNLOAD

<img width="724" height="458" alt="Screenshot 2025-12-01 070540" src="https://github.com/user-attachments/assets/ef14b370-5b69-4c1f-adce-74cfda88276c" />

https://drive.google.com/file/d/1ETZtBGjTjpKn4TeLtD0b5ZMehiOn_uTw/view?usp=sharing

## 🚀 Quick Start

**Want to deploy? Read [START_HERE.md](START_HERE.md)** ⭐

**Local development:**
```bash
npm install
npm start
# Open http://localhost:3000
```

## 🎮 Features

- **User Authentication**: Register and login to save your profile
- **Friends System**: Add friends and challenge them to games
- **Challenge Links**: Create shareable links to invite specific players
- **Random Matchmaking**: Find random opponents online
- **Offline Mode**: Local two-player mode on the same device
- **Guest Mode**: Play without registration
- **Real-time Updates**: See when friends are online
- **Full Chess Rules**: Powered by chess.js library

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chess

# Install dependencies
npm install

# Start MongoDB (if using local)
mongod

# Start the server
npm start
```

Open http://localhost:3000 in your browser.

## 📦 Deployment

### Deploy to Vercel (Frontend + API)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

Quick steps:
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `NODE_ENV` - Set to `production`
4. Deploy!

**Note**: For production with real-time features, consider deploying the backend to Railway or Render (see DEPLOYMENT.md).

## 🎯 How to Play

### Game Modes

1. **Offline Mode**: Play locally on the same device
2. **Random Opponent**: Quick matchmaking with online players
3. **Challenge Link**: Share a link to play with anyone
4. **Friend Challenge**: Challenge your online friends directly

### Moving Pieces

1. Click on a piece (your color)
2. Valid moves will be highlighted
3. Click on the destination square
4. Piece moves automatically

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT, bcryptjs
- **Chess Logic**: chess.js

## 📁 Project Structure

```
chess/
├── public/
│   ├── index.html          # Main HTML file
│   ├── app.js              # Frontend JavaScript
│   ├── style.css           # Styles
│   └── chess-browser.js    # Chess.js library
├── models/
│   └── User.js             # User model
├── server.js               # Express + Socket.IO server
├── package.json
├── vercel.json             # Vercel configuration
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file (for local development):

```env
MONGODB_URI=mongodb://localhost:27017/chess-game
JWT_SECRET=your-secret-key-here
PORT=3000
NODE_ENV=development
```

For production, set these in your hosting platform.

## 🌐 API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/friends/request` - Send friend request
- `POST /api/friends/accept` - Accept friend request
- `GET /api/friends` - Get friends list

## 🎮 Socket Events

- `createChallenge` - Create a challenge link
- `joinChallenge` - Join via challenge link
- `findGame` - Find random opponent
- `challengeFriend` - Challenge a friend
- `move` - Make a chess move
- `gameStart` - Game started
- `moveMade` - Move was made

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📝 License

ISC

## 🙏 Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) - Chess logic
- [Socket.IO](https://socket.io/) - Real-time communication
- Chess piece Unicode symbols

## 📞 Support

For issues or questions, open an issue on GitHub.

---

Made with <3 by Ayushman bosu roy

