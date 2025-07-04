const express = require('express');
const router = express.Router();
const VincentLitProtocolService = require('../services/VincentLitProtocolService');

// Initialize Vincent/Lit Protocol service
const vincentService = new VincentLitProtocolService();

// Initialize the service when the route is loaded
vincentService.initialize().then(connected => {
    if (connected) {
        console.log('✅ Vincent/Lit Protocol service initialized successfully');
    } else {
        console.log('⚠️ Vincent/Lit Protocol service running in mock mode');
    }
});

// Get all permissions
router.get('/permissions', async(req, res) => {
    try {
        const walletAddress = req.query.walletAddress || req.headers['x-wallet-address'];
        const result = await vincentService.getPermissions(walletAddress);
        res.json(result);
    } catch (error) {
        console.error('Permissions fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch permissions',
            details: error.message
        });
    }
});

// Update permission settings
router.put('/permissions/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { enabled, maxAmount, conditions } = req.body;
        const walletAddress = req.body.walletAddress || req.headers['x-wallet-address'];

        const result = await vincentService.updatePermission(id, {
            enabled,
            maxAmount,
            conditions
        }, walletAddress);

        res.json(result);
    } catch (error) {
        console.error('Permission update error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update permission',
            details: error.message
        });
    }
});

// Validate current permissions before action
router.post('/validate-action', async(req, res) => {
    try {
        const { action, amount, context } = req.body;
        const walletAddress = req.body.walletAddress || req.headers['x-wallet-address'];

        const result = await vincentService.validateAction(action, amount, context, walletAddress);
        res.json(result);
    } catch (error) {
        console.error('Action validation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to validate action',
            details: error.message
        });
    }
});

// Emergency stop all activities
router.post('/emergency-stop', async(req, res) => {
    try {
        const walletAddress = req.body.walletAddress || req.headers['x-wallet-address'];
        const result = await vincentService.emergencyStop(walletAddress);
        res.json(result);
    } catch (error) {
        console.error('Emergency stop error:', error);
        res.status(500).json({
            success: false,
            error: 'Emergency stop failed',
            details: error.message
        });
    }
});

// Get permission analytics
router.get('/analytics', async(req, res) => {
    try {
        const result = await vincentService.getAnalytics();
        res.json(result);
    } catch (error) {
        console.error('Analytics fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch analytics',
            details: error.message
        });
    }
});

module.exports = router;