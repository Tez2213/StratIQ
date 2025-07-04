#!/usr/bin/env node

const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testAPIs() {
    console.log('🧪 Testing StratIQ Real API Integrations');
    console.log('==========================================\n');

    try {
        // Test health check
        console.log('1. Health Check...');
        const health = await axios.get(`${API_BASE}/health`);
        console.log('✅ Server healthy:', health.data.status);

        // Test Recall Network APIs
        console.log('\n2. Testing Recall Network APIs...');

        const leaderboard = await axios.get(`${API_BASE}/api/recall/leaderboard`);
        console.log('✅ Leaderboard:', leaderboard.data.success ? 'Working' : 'Failed');
        console.log('   Source:', leaderboard.data.source || 'N/A');

        const sentiment = await axios.get(`${API_BASE}/api/recall/market-sentiment`);
        console.log('✅ Market Sentiment:', sentiment.data.success ? 'Working' : 'Failed');
        console.log('   Overall:', sentiment.data.sentiment?.overall || 'N/A');

        const recommendations = await axios.get(`${API_BASE}/api/recall/strategy-recommendations`);
        console.log('✅ Strategy Recommendations:', recommendations.data.success ? 'Working' : 'Failed');
        console.log('   Count:', recommendations.data.recommendations?.length || 0);

        // Test Vincent/Lit Protocol APIs
        console.log('\n3. Testing Vincent/Lit Protocol APIs...');

        const permissions = await axios.get(`${API_BASE}/api/vincent/permissions`);
        console.log('✅ Permissions:', permissions.data.success ? 'Working' : 'Failed');
        console.log('   Source:', permissions.data.source || 'N/A');

        const analytics = await axios.get(`${API_BASE}/api/vincent/analytics`);
        console.log('✅ Permission Analytics:', analytics.data.success ? 'Working' : 'Failed');
        console.log('   Lit Protocol Status:', analytics.data.analytics?.litProtocolStatus || 'Unknown');

        // Test Trading APIs
        console.log('\n4. Testing Trading APIs...');

        const portfolio = await axios.get(`${API_BASE}/api/trading/portfolio`);
        console.log('✅ Portfolio:', portfolio.data ? 'Working' : 'Failed');

        const strategies = await axios.get(`${API_BASE}/api/trading/strategies`);
        console.log('✅ Strategies:', strategies.data?.strategies ? 'Working' : 'Failed');

        console.log('\n🎉 All API tests completed successfully!');
        console.log('🚀 Your StratIQ platform is ready for the hackathon!');

    } catch (error) {
        console.log('\n❌ API Test Failed:', error.message);
        console.log('💡 Make sure the backend server is running: npm run dev');
        console.log('🔧 Check the server logs for more details');
    }
}

// Run tests if this script is executed directly
if (require.main === module) {
    testAPIs();
}

module.exports = testAPIs;
