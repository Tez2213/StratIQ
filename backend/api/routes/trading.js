const express = require('express');
const router = express.Router();

// Mock trading data for hackathon
const mockStrategies = [{
        id: 'strat_001',
        name: 'Momentum Scalper',
        status: 'active',
        pnl: 342.56,
        winRate: 68.4,
        trades: 127,
        riskLevel: 'Medium'
    },
    {
        id: 'strat_002',
        name: 'Mean Reversion',
        status: 'active',
        pnl: -45.23,
        winRate: 71.2,
        trades: 89,
        riskLevel: 'Low'
    },
    {
        id: 'strat_003',
        name: 'Breakout Hunter',
        status: 'paused',
        pnl: 156.78,
        winRate: 65.8,
        trades: 43,
        riskLevel: 'High'
    }
];

const mockPositions = [{
        id: 'pos_001',
        symbol: 'ETH/USDT',
        side: 'long',
        size: 0.5,
        entryPrice: 2456.78,
        currentPrice: 2478.90,
        pnl: 11.06,
        pnlPercent: 0.45
    },
    {
        id: 'pos_002',
        symbol: 'BTC/USDT',
        side: 'short',
        size: 0.1,
        entryPrice: 43250.00,
        currentPrice: 43100.00,
        pnl: 15.00,
        pnlPercent: 0.35
    }
];

// Get portfolio overview
router.get('/portfolio', (req, res) => {
    res.json({
        totalValue: 10245.67,
        dailyPnL: 156.78,
        totalPnL: 245.67,
        positions: mockPositions.length,
        activeStrategies: mockStrategies.filter(s => s.status === 'active').length,
        cash: 7823.45,
        invested: 2422.22
    });
});

// Get trading strategies
router.get('/strategies', (req, res) => {
    res.json({
        strategies: mockStrategies,
        total: mockStrategies.length,
        active: mockStrategies.filter(s => s.status === 'active').length
    });
});

// Get current positions
router.get('/positions', (req, res) => {
    res.json({
        positions: mockPositions,
        total: mockPositions.length,
        totalPnL: mockPositions.reduce((sum, pos) => sum + pos.pnl, 0)
    });
});

// Start/stop strategy
router.post('/strategies/:id/:action', (req, res) => {
    const { id, action } = req.params;
    const strategy = mockStrategies.find(s => s.id === id);

    if (!strategy) {
        return res.status(404).json({ error: 'Strategy not found' });
    }

    if (action === 'start') {
        strategy.status = 'active';
    } else if (action === 'stop') {
        strategy.status = 'paused';
    } else {
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
        success: true,
        strategy,
        message: `Strategy ${action}ed successfully`
    });
});

// Get trading history
router.get('/history', (req, res) => {
    const mockHistory = [{
            id: 'trade_001',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            symbol: 'ETH/USDT',
            side: 'buy',
            amount: 0.5,
            price: 2456.78,
            pnl: 11.06,
            strategy: 'Momentum Scalper'
        },
        {
            id: 'trade_002',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            symbol: 'BTC/USDT',
            side: 'sell',
            amount: 0.1,
            price: 43250.00,
            pnl: -23.45,
            strategy: 'Mean Reversion'
        }
    ];

    res.json({
        trades: mockHistory,
        total: mockHistory.length,
        totalPnL: mockHistory.reduce((sum, trade) => sum + trade.pnl, 0)
    });
});

module.exports = router;