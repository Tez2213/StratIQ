# StratIQ Development Quick Start

## 🚀 Real API Integration Status

✅ **Recall Network Integration**: Service class with fallback to mock data
✅ **Vincent/Lit Protocol Integration**: Service class with fallback to mock permissions
✅ **Frontend API Service**: Updated to use real backend endpoints
✅ **Environment Variables**: Configured for production APIs

## Start All Services
Run the batch file to start all services at once:
```cmd
start-all.bat
```

Or start them individually:

### Backend API (Port 3001)
```cmd
cd backend/api
npm run dev
```

### Python AI Service (Port 8000)
```cmd
cd backend/ai
python main.py
```

### Frontend (Port 3000)
```cmd
cd frontend
npm run dev
```

## 🔌 Real API Configuration

### Recall Network API
1. Get API key from https://recall.network/api
2. Add to .env file:
```bash
RECALL_API_URL=https://api.recall.network
RECALL_API_KEY=your_recall_api_key_here
```

### Vincent/Lit Protocol
1. No API key needed for development (uses datil-dev network)
2. Configure in .env:
```bash
LIT_NETWORK=datil-dev
LIT_DEBUG=true
```

## API Endpoints Available

### Authentication
- POST `/api/auth/login` - Wallet-based login
- POST `/api/auth/logout` - Logout
- GET `/api/auth/profile` - User profile

### Trading
- GET `/api/trading/portfolio` - Portfolio overview
- GET `/api/trading/strategies` - Active strategies
- GET `/api/trading/positions` - Current positions
- POST `/api/trading/strategies/:id/:action` - Start/stop strategies
- GET `/api/trading/history` - Trading history

### Recall Network Integration ✨
- GET `/api/recall/leaderboard` - **Real** top performer leaderboard
- GET `/api/recall/trader/:id/insights` - **Real** trader strategy insights
- GET `/api/recall/market-sentiment` - **Real** market sentiment analysis
- GET `/api/recall/strategy-recommendations` - **Real** AI recommendations

### Vincent/Lit Protocol Permissions ✨
- GET `/api/vincent/permissions` - **Real** permission management
- PUT `/api/vincent/permissions/:id` - **Real** permission updates
- POST `/api/vincent/validate-action` - **Real** action validation
- POST `/api/vincent/emergency-stop` - **Real** emergency halt
- GET `/api/vincent/analytics` - **Real** permission analytics

## 🛡️ Graceful Fallbacks
- **Recall API unavailable**: Automatically falls back to realistic mock data
- **Lit Protocol unavailable**: Falls back to mock permission system
- **No API keys**: System works with demo data for hackathon
- **Network issues**: Graceful error handling with user notifications

## Real-time Features
- WebSocket connection for live portfolio updates
- Real-time strategy performance monitoring
- Live market data simulation
- Connection status indicators

## 🎯 Production Ready Features
- Environment-based configuration
- Error handling and logging
- CORS and security headers
- Health check endpoints
- TypeScript type safety
- Graceful API degradation

## Next Development Steps
1. ✅ Real API integration (DONE)
2. Add comprehensive charting
3. Deploy to production
4. Add more trading strategies
5. Enhanced UI/UX polish
