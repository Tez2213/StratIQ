const express = require('express');
const router = express.Router();
const RecallNetworkService = require('../services/RecallNetworkService');

// Initialize Recall Network service
const recallService = new RecallNetworkService();

// Get leaderboard data
router.get('/leaderboard', async(req, res) => {
    try {
        const { limit = 10 } = req.query;
        const result = await recallService.getLeaderboard(parseInt(limit));
        res.json(result);
    } catch (error) {
        console.error('Leaderboard fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch leaderboard',
            details: error.message
        });
    }
});

// Get specific trader's strategy insights
router.get('/trader/:id/insights', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await recallService.getTraderInsights(id);
        res.json(result);
    } catch (error) {
        console.error('Trader insights fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trader insights',
            details: error.message
        });
    }
});

// Analyze market sentiment from top performers
router.get('/market-sentiment', async(req, res) => {
    try {
        const result = await recallService.getMarketSentiment();
        res.json(result);
    } catch (error) {
        console.error('Market sentiment fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch market sentiment',
            details: error.message
        });
    }
});

// Get strategy recommendations based on top performers
router.get('/strategy-recommendations', async(req, res) => {
    try {
        const userProfile = {
            riskTolerance: req.query.riskTolerance || 'medium',
            capital: parseInt(req.query.capital) || 10000,
            timeHorizon: req.query.timeHorizon || 'short'
        };

        const result = await recallService.getStrategyRecommendations(userProfile);
        res.json(result);
    } catch (error) {
        console.error('Strategy recommendations fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch strategy recommendations',
            details: error.message
        });
    }
});

module.exports = router;