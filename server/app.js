const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server); 

const db = process.env.DB_CONNECTION;
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// MongoDB connection
mongoose.connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Set io instance to be used in controllers
app.set('io', io);

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A 7user connected:', socket.id);

  // Join a room
  socket.on('joinRoom', ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
    
    // Notify others in the room that a user joined
    socket.to(roomId).emit('userJoined', { userId });
  });

  // Handle typing events
  socket.on('typing', ({ roomId, userId, isTyping }) => {
    socket.to(roomId).emit('typing', { userId, isTyping });
  });

  // Handle new message broadcasting
  socket.on('newMessage', (message) => {
    const { roomId } = message;
    socket.to(roomId).emit('message', message);
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Routes from routes folder
const userRouter = require('./routes/user');
const chatRoomRouter = require('./routes/room');
const messageRouter = require('./routes/message');
const typingRouter = require('./routes/typing');
const friendshipRouter = require('./routes/friend');

// Use routes
app.use('/users', userRouter);
app.use('/rooms', chatRoomRouter);
app.use('/messages', messageRouter);
app.use('/typing', typingRouter);
app.use('/friendships', friendshipRouter); // Friendship routes

// Starting the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
