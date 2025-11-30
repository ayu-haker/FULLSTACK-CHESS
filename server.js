const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Chess } = require('chess.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const MONGODB_URI = process.env.MONGODB_URI || null;

// Connect to MongoDB only if URI is provided
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.log('MongoDB connection error:', err.message);
    });
} else {
  console.log('MongoDB URI not provided. Running without authentication features.');
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const games = new Map();
const waitingPlayers = [];
const challenges = new Map();
const onlineUsers = new Map();

function generateGameId() {
  return Math.random().toString(36).substring(2, 9);
}

// Middleware to check MongoDB connection
const requireMongoDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database not available. Please try guest mode.' });
  }
  next();
};

// Auth Routes
app.post('/api/register', requireMongoDB, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);
    res.json({ token, username: user.username, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', requireMongoDB, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);
    res.json({ token, username: user.username, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Friend Routes
app.post('/api/friends/request', requireMongoDB, async (req, res) => {
  try {
    const { token, friendUsername } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (friend._id.toString() === decoded.userId) {
      return res.status(400).json({ error: 'Cannot add yourself' });
    }

    const user = await User.findById(decoded.userId);
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Already friends' });
    }

    const alreadyRequested = friend.friendRequests.some(
      req => req.from.toString() === decoded.userId
    );
    if (alreadyRequested) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    friend.friendRequests.push({ from: decoded.userId, username: user.username });
    await friend.save();

    res.json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/friends/accept', requireMongoDB, async (req, res) => {
  try {
    const { token, requesterId } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    const requester = await User.findById(requesterId);

    user.friendRequests = user.friendRequests.filter(
      req => req.from.toString() !== requesterId
    );
    user.friends.push(requesterId);
    requester.friends.push(decoded.userId);

    await user.save();
    await requester.save();

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/friends', requireMongoDB, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(decoded.userId)
      .populate('friends', 'username')
      .populate('friendRequests.from', 'username');

    const friendsWithStatus = user.friends.map(friend => ({
      _id: friend._id,
      username: friend.username,
      online: onlineUsers.has(friend._id.toString())
    }));

    res.json({ 
      friends: friendsWithStatus,
      requests: user.friendRequests 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('userOnline', (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.userId = userId;
    console.log('User online:', userId);
  });

  socket.on('challengeFriend', ({ friendId }) => {
    const friendSocketId = onlineUsers.get(friendId);
    if (friendSocketId) {
      const gameId = generateGameId();
      const game = new Chess();
      
      challenges.set(gameId, {
        game: game,
        host: socket.id,
        hostUserId: socket.userId
      });

      socket.join(gameId);
      io.to(friendSocketId).emit('friendChallenge', { 
        gameId, 
        from: socket.userId 
      });
    } else {
      socket.emit('friendOffline');
    }
  });

  socket.on('createChallenge', () => {
    const gameId = generateGameId();
    const game = new Chess();
    
    challenges.set(gameId, {
      game: game,
      host: socket.id,
      hostSocket: socket
    });

    socket.join(gameId);
    socket.emit('challengeCreated', { gameId });
    console.log('Challenge created:', gameId);
  });

  socket.on('joinChallenge', (gameId) => {
    const challenge = challenges.get(gameId);
    
    if (!challenge) {
      socket.emit('challengeNotFound');
      return;
    }

    if (challenge.host === socket.id) {
      socket.emit('cannotJoinOwnChallenge');
      return;
    }

    const gameData = {
      game: challenge.game,
      white: challenge.host,
      black: socket.id
    };

    games.set(gameId, gameData);
    challenges.delete(gameId);

    socket.join(gameId);

    io.to(challenge.host).emit('gameStart', { 
      gameId, 
      color: 'white',
      fen: gameData.game.fen()
    });
    
    io.to(socket.id).emit('gameStart', { 
      gameId, 
      color: 'black',
      fen: gameData.game.fen()
    });

    console.log('Game started:', gameId);
  });

  socket.on('findGame', () => {
    if (waitingPlayers.length > 0) {
      const opponent = waitingPlayers.shift();
      const gameId = generateGameId();
      const game = new Chess();
      
      games.set(gameId, {
        game: game,
        white: socket.id,
        black: opponent.id
      });

      socket.join(gameId);
      opponent.join(gameId);

      io.to(socket.id).emit('gameStart', { 
        gameId, 
        color: 'white',
        fen: game.fen()
      });
      io.to(opponent.id).emit('gameStart', { 
        gameId, 
        color: 'black',
        fen: game.fen()
      });
    } else {
      waitingPlayers.push(socket);
      socket.emit('waiting');
    }
  });

  socket.on('move', ({ gameId, move }) => {
    const gameData = games.get(gameId);
    if (!gameData) return;

    const { game, white, black } = gameData;
    
    try {
      const result = game.move(move);
      if (result) {
        io.to(gameId).emit('moveMade', {
          move: result,
          fen: game.fen(),
          isGameOver: game.isGameOver(),
          isCheckmate: game.isCheckmate(),
          isDraw: game.isDraw()
        });
      }
    } catch (error) {
      socket.emit('invalidMove');
    }
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
    }

    const index = waitingPlayers.findIndex(p => p.id === socket.id);
    if (index !== -1) {
      waitingPlayers.splice(index, 1);
    }

    for (const [gameId, challenge] of challenges.entries()) {
      if (challenge.host === socket.id) {
        challenges.delete(gameId);
      }
    }
  });
});

// Catch-all route to serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = server;
