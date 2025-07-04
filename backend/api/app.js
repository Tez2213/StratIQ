const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'StratIQ API Server is running!',
        version: '1.0.0',
        status: 'healthy'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API routes (to be implemented)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trading', require('./routes/trading'));
app.use('/api/recall', require('./routes/recall'));
app.use('/api/vincent', require('./routes/vincent'));

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join trading room for real-time updates
    socket.join('trading');

    // Send initial portfolio data
    socket.emit('portfolio_update', {
        portfolioValue: 10000,
        dailyPnL: 245.67,
        activeStrategies: 3,
        timestamp: new Date().toISOString()
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Simulate real-time trading updates
setInterval(() => {
    const portfolioUpdate = {
        portfolioValue: 10000 + (Math.random() - 0.5) * 2000,
        dailyPnL: 245.67 + (Math.random() - 0.5) * 100,
        activeStrategies: 3,
        timestamp: new Date().toISOString()
    };

    io.to('trading').emit('portfolio_update', portfolioUpdate);
}, 5000);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 StratIQ API Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔄 WebSocket server ready for real-time trading updates`);
});

module.exports = app;