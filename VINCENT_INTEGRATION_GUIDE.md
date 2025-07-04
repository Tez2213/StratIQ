# Vincent Integration Guide for StratIQ

## 🔧 Setup Steps

### 1. Register Your Vincent App

1. Visit the [Vincent App Dashboard](https://dashboard.heyvincent.ai/)
2. Create a new Vincent App for StratIQ
3. Configure your app settings:
   - **App Name**: StratIQ AI Trading Agent
   - **Description**: Autonomous trading agent with AI-powered strategy optimization
   - **Redirect URI**: `http://localhost:3000/auth/callback` (for development)
   - **Production URI**: `https://your-domain.com/auth/callback`
4. Select the following tools and policies:
   - **Trading Tools**: Execute trades, manage positions
   - **Portfolio Tools**: Read portfolio data, analyze performance
   - **Risk Management**: Emergency stop, position limits
5. Copy your **Vincent App ID** (you'll need this)

### 2. Environment Configuration

Add your Vincent App ID to your environment files:

**.env**:
```bash
# Vincent Configuration
VINCENT_APP_ID=your_vincent_app_id_here
NEXT_PUBLIC_VINCENT_APP_ID=your_vincent_app_id_here
VINCENT_CONSENT_PAGE_URL=https://consent.heyvincent.ai
```

**.env.example**:
```bash
# Vincent Configuration
VINCENT_APP_ID=your_vincent_app_id_here
NEXT_PUBLIC_VINCENT_APP_ID=your_vincent_app_id_here
VINCENT_CONSENT_PAGE_URL=https://consent.heyvincent.ai
```

### 3. Frontend Integration

The frontend now uses the real Vincent SDK with:
- **Authentication Flow**: Users redirected to Vincent consent page
- **JWT Management**: Secure token handling and validation
- **Permission System**: Real-time permission checking
- **Consent Management**: Dynamic policy configuration

### 4. Backend Integration

The backend now integrates with:
- **JWT Verification**: Validates Vincent JWTs
- **Permission Checking**: Real-time consent validation
- **Tool Execution**: Secure action execution with user consent
- **Analytics**: Real permission usage tracking

## 🚀 Implementation Status

### ✅ Completed
- Vincent SDK installed in frontend and backend
- Real authentication flow implemented
- JWT token management
- Permission system integration
- Mock data removal
- Environment configuration

### 🔄 In Progress
- Testing with real Vincent App ID
- Production deployment setup

### 📋 Next Steps
1. Register your Vincent App and get your App ID
2. Update .env files with your real Vincent App ID
3. Test the authentication flow
4. Deploy to production with production redirect URIs

## 🛡️ Security Features

- **Decentralized Key Management**: Uses Lit Protocol PKPs
- **Fine-Grained Permissions**: User-controlled trading limits
- **Verifiable Policies**: On-chain policy verification
- **Emergency Controls**: Instant trading halt capabilities
- **JWT Authentication**: Secure token-based auth

## 🔗 Resources

- [Vincent Documentation](https://docs.heyvincent.ai/)
- [Vincent App Dashboard](https://dashboard.heyvincent.ai/)
- [Lit Protocol Docs](https://developer.litprotocol.com/)
- [Vincent GitHub](https://github.com/LIT-Protocol/Vincent)

## 🧪 Testing

After setting up your Vincent App:

1. Start the development servers: `npm run dev`
2. Visit http://localhost:3000
3. Click "Connect Vincent" - should redirect to consent page
4. Complete the consent flow
5. Return to StratIQ with authentication

## 📞 Support

- Vincent GitHub Issues: https://github.com/LIT-Protocol/Vincent/issues
- Lit Protocol Telegram: https://t.me/c/2038294753/1
- StratIQ Support: Check project README
