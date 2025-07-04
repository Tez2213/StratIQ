const axios = require('axios');

class RecallNetworkService {
    constructor() {
        this.baseURL = process.env.RECALL_API_URL || 'https://api.recall.network';
        this.apiKey = process.env.RECALL_API_KEY || null;
        this.httpClient = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
            }
        });
    }

    async getLeaderboard(limit = 10) {
        try {
            // Real Recall Network API call
            const response = await this.httpClient.get('/leaderboard', {
                params: { limit, sortBy: 'pnl', order: 'desc' }
            });

            return {
                success: true,
                leaderboard: response.data.traders || [],
                lastUpdated: new Date().toISOString(),
                totalTraders: response.data.total || 0
            };
        } catch (error) {
            console.warn('Recall API unavailable, using mock data:', error.message);
            return this.getMockLeaderboard();
        }
    }

    async getTraderInsights(traderId) {
        try {
            const response = await this.httpClient.get(`/traders/${traderId}/insights`);

            return {
                success: true,
                insights: response.data,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.warn('Recall API unavailable, using mock data:', error.message);
            return this.getMockTraderInsights(traderId);
        }
    }

    async getMarketSentiment() {
        try {
            const response = await this.httpClient.get('/market/sentiment');

            return {
                success: true,
                sentiment: response.data,
                source: 'Recall Network Live Analysis'
            };
        } catch (error) {
            console.warn('Recall API unavailable, using mock data:', error.message);
            return this.getMockMarketSentiment();
        }
    }

    async getStrategyRecommendations(userProfile = {}) {
        try {
            const response = await this.httpClient.post('/strategies/recommendations', {
                riskTolerance: userProfile.riskTolerance || 'medium',
                capital: userProfile.capital || 10000,
                timeHorizon: userProfile.timeHorizon || 'short'
            });

            return {
                success: true,
                recommendations: response.data.strategies || [],
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.warn('Recall API unavailable, using mock data:', error.message);
            return this.getMockStrategyRecommendations();
        }
    }

    // Fallback mock data methods
    getMockLeaderboard() {
        return {
            success: true,
            leaderboard: [{
                    id: 'trader_001',
                    name: 'AlphaBot',
                    pnl: 15678.90,
                    winRate: 84.2,
                    totalTrades: 2156,
                    roi: 156.78,
                    risk: 'Medium',
                    strategy: 'Momentum + Mean Reversion',
                    followers: 1247
                },
                {
                    id: 'trader_002',
                    name: 'CryptoWhale',
                    pnl: 12456.78,
                    winRate: 78.9,
                    totalTrades: 1893,
                    roi: 124.56,
                    risk: 'High',
                    strategy: 'Breakout + Scalping',
                    followers: 956
                },
                {
                    id: 'trader_003',
                    name: 'SafeTrader',
                    pnl: 8934.12,
                    winRate: 91.5,
                    totalTrades: 743,
                    roi: 89.34,
                    risk: 'Low',
                    strategy: 'Conservative DCA',
                    followers: 2341
                }
            ],
            lastUpdated: new Date().toISOString(),
            totalTraders: 3,
            source: 'Mock Data (Recall API unavailable)'
        };
    }

    getMockTraderInsights(traderId) {
        return {
            success: true,
            insights: {
                traderId,
                name: 'AlphaBot',
                keyPatterns: [
                    'High volume breakouts on 15min timeframe',
                    'Strong momentum signals in trending markets',
                    'Risk management with 2% max position size'
                ],
                preferredAssets: ['ETH/USDT', 'BTC/USDT', 'SOL/USDT'],
                timeframes: ['5m', '15m', '1h'],
                riskMetrics: {
                    maxDrawdown: 12.5,
                    sharpeRatio: 2.34,
                    calmarRatio: 1.89
                },
                recentPerformance: {
                    last7Days: 234.56,
                    last30Days: 1567.89,
                    lastQuarter: 4567.12
                }
            },
            lastUpdated: new Date().toISOString(),
            source: 'Mock Data (Recall API unavailable)'
        };
    }

    getMockMarketSentiment() {
        return {
            success: true,
            sentiment: {
                overall: 'Bullish',
                confidence: 76.8,
                topSignals: [{
                        asset: 'ETH/USDT',
                        sentiment: 'Strong Buy',
                        confidence: 89.2,
                        source: 'AlphaBot + CryptoWhale'
                    },
                    {
                        asset: 'BTC/USDT',
                        sentiment: 'Buy',
                        confidence: 72.4,
                        source: 'SafeTrader + AlphaBot'
                    },
                    {
                        asset: 'SOL/USDT',
                        sentiment: 'Hold',
                        confidence: 65.1,
                        source: 'CryptoWhale'
                    }
                ],
                lastUpdated: new Date().toISOString()
            },
            source: 'Mock Analysis (Recall API unavailable)'
        };
    }

    getMockStrategyRecommendations() {
        return {
            success: true,
            recommendations: [{
                    id: 'rec_001',
                    name: 'Momentum Breakout (AlphaBot Style)',
                    description: 'High-frequency momentum trading with breakout confirmation',
                    expectedRoi: 12.5,
                    riskLevel: 'Medium',
                    timeHorizon: 'Short-term',
                    confidence: 84.2,
                    basedOn: 'AlphaBot performance analysis'
                },
                {
                    id: 'rec_002',
                    name: 'Conservative DCA (SafeTrader Style)',
                    description: 'Dollar-cost averaging with safe entry/exit points',
                    expectedRoi: 8.9,
                    riskLevel: 'Low',
                    timeHorizon: 'Long-term',
                    confidence: 91.5,
                    basedOn: 'SafeTrader performance analysis'
                }
            ],
            lastUpdated: new Date().toISOString(),
            source: 'Mock Data (Recall API unavailable)'
        };
    }
}

module.exports = RecallNetworkService;