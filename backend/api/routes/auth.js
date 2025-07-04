const express = require('express');
const router = express.Router();

// Mock authentication for hackathon demo
router.post('/login', (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address required' });
    }

    // Mock JWT token for demo
    const token = `mock_jwt_${Date.now()}_${walletAddress.slice(-6)}`;

    res.json({
        success: true,
        token,
        user: {
            walletAddress,
            permissions: ['trade', 'view_portfolio', 'manage_strategies'],
            createdAt: new Date().toISOString()
        }
    });
});

router.post('/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
});

router.get('/profile', (req, res) => {
    // Mock user profile
    res.json({
        walletAddress: '0x742d35Cc6481C7E6b78D2Cb5D68e8A8b1234567',
        balance: 10000,
        tradingLevel: 'Advanced',
        totalTrades: 1247,
        winRate: 73.2,
        permissions: ['trade', 'view_portfolio', 'manage_strategies']
    });
});

module.exports = router;