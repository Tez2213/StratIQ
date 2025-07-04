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
        console.log('⚠️ Vincent/Lit Protocol service initialized (limited mode)');
    }
});

// Helper function to extract JWT from request
function extractJWT(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    return req.headers['x-vincent-jwt'] || req.body.jwt || req.query.jwt;
}

// Get all permissions
router.get('/permissions', async(req, res) => {
    try {
        const walletAddress = req.query.walletAddress || req.headers['x-wallet-address'];
        const jwtToken = extractJWT(req);
        
        const result = await vincentService.getPermissions(walletAddress, jwtToken);
        
        if (result.requiresAuth) {
            return res.status(401).json(result);
        }
        
        res.json(result);
    } catch (error) {
        console.error('Permissions fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch permissions',
            details: error.message,
            requiresAuth: error.message.includes('JWT') || error.message.includes('token')
        });
    }
});

// Update permission settings
router.put('/permissions/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { enabled, maxAmount, conditions } = req.body;
        const walletAddress = req.body.walletAddress || req.headers['x-wallet-address'];
        const jwtToken = extractJWT(req);

        const result = await vincentService.updatePermission(id, {
            enabled,
            maxAmount,
            conditions
        }, walletAddress, jwtToken);

        if (result.requiresAuth) {
            return res.status(401).json(result);
        }

        res.json(result);
    } catch (error) {
        console.error('Permission update error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update permission',
            details: error.message,
            requiresAuth: error.message.includes('JWT') || error.message.includes('token')
        });
    }
});

// Validate current permissions before action
router.post('/validate-action', async(req, res) => {
    try {
        const { action, amount, context } = req.body;
        const walletAddress = req.body.walletAddress || req.headers['x-wallet-address'];
        const jwtToken = extractJWT(req);

        const result = await vincentService.validateAction(action, amount, context, jwtToken);

        if (result.validation?.requiresAuth) {
            return res.status(401).json(result);
        }

        res.json(result);
    } catch (error) {
        console.error('Action validation error:', error);
        res.status(500).json({
            success: false,
            validation: {
                allowed: false,
                reason: 'Validation failed',
                error: error.message
            }
        });
    }
});

// Emergency stop all activities
router.post('/emergency-stop', async(req, res) => {
    try {
        const walletAddress = req.body.walletAddress || req.headers['x-wallet-address'];
        const jwtToken = extractJWT(req);

        const result = await vincentService.emergencyStop(walletAddress, jwtToken);

        if (result.requiresAuth) {
            return res.status(401).json({
                ...result,
                message: 'Authentication required for emergency stop'
            });
        }

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
        const jwtToken = extractJWT(req);
        const result = await vincentService.getAnalytics(jwtToken);

        if (result.requiresAuth) {
            return res.status(401).json(result);
        }

        res.json(result);
    } catch (error) {
        console.error('Analytics fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch analytics',
            details: error.message,
            requiresAuth: error.message.includes('JWT') || error.message.includes('token')
        });
    }
});

// Verify JWT endpoint (for testing)
router.post('/verify-jwt', async(req, res) => {
    try {
        const jwtToken = extractJWT(req);
        const audience = req.body.audience || req.headers['x-audience'] || 'http://localhost:3000';

        if (!jwtToken) {
            return res.status(400).json({
                success: false,
                error: 'No JWT token provided'
            });
        }

        const verification = vincentService.verifyVincentJWT(jwtToken, audience);
        
        res.json({
            success: true,
            verified: true,
            userAddress: verification.userAddress,
            permissions: verification.permissions,
            decoded: verification.decoded
        });
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).json({
            success: false,
            verified: false,
            error: 'JWT verification failed',
            details: error.message
        });
    }
});

module.exports = router;
