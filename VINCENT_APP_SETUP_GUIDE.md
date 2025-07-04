# 🔧 Vincent App Setup Guide for StratIQ

## 📋 Step-by-Step Configuration

### 1. **Update Redirect URI**
Replace the example URL with:
```
http://localhost:3000/auth/callback
```

### 2. **Add Trading Tools**

You need to add Lit Actions for trading functionality. Here are the required tools:

#### Tool 1: Trading Executor
- **Name**: "Trading Executor"
- **Description**: "Execute trades based on AI recommendations"
- **IPFS CID**: You need to create or use an existing Lit Action
- **Function**: Handle trade execution with user-defined limits

#### Tool 2: Portfolio Manager  
- **Name**: "Portfolio Manager"
- **Description**: "Analyze and manage portfolio positions"
- **IPFS CID**: Portfolio analysis Lit Action
- **Function**: Read portfolio data and provide insights

#### Tool 3: Emergency Stop
- **Name**: "Emergency Stop"
- **Description**: "Immediately halt all trading activities"
- **IPFS CID**: Emergency control Lit Action
- **Function**: Stop all automated trading

### 3. **Add Trading Policies**

Configure policies to govern tool usage:

#### Policy 1: Trade Limits
- **Name**: "Trade Size Limits"
- **Description**: "Maximum trade size and daily limits"
- **Parameters**:
  - `maxTradeAmount`: Maximum per trade
  - `dailyLimit`: Maximum daily trading volume
  - `riskScore`: Maximum risk score allowed

#### Policy 2: Time Restrictions
- **Name**: "Trading Hours"
- **Description**: "Limit trading to specific hours"
- **Parameters**:
  - `startHour`: Trading start time
  - `endHour`: Trading end time
  - `timezone`: User timezone

#### Policy 3: Asset Restrictions
- **Name**: "Allowed Assets"
- **Description**: "Whitelist of tradeable assets"
- **Parameters**:
  - `allowedTokens`: Array of allowed token addresses
  - `blacklistedTokens`: Array of forbidden tokens

## 🛠️ Quick Solution - Use Demo Tools

If you need to get started quickly for the hackathon, you can use these approaches:

### Option 1: Use Example Lit Actions

Vincent provides example IPFS CIDs for common use cases. You can find them in:
- [Lit Protocol Examples](https://github.com/LIT-Protocol/lit-examples)
- [Vincent Demo Tools](https://github.com/LIT-Protocol/Vincent/tree/main/examples)

### Option 2: Create Simple Tools

Create basic Lit Actions for your specific needs:

1. **Go to [Lit Protocol Playground](https://playground.litprotocol.com/)**
2. **Create a simple trading action**
3. **Deploy to IPFS**
4. **Copy the IPFS CID**

### Option 3: Use Community Tools

Check the Lit Protocol community for existing trading tools:
- Browse [Lit Actions Registry](https://litprotocol.com/lit-actions)
- Use tested community tools
- Fork and modify existing actions

## 📝 Example Configuration

Here's what your Vincent App might look like:

```
Tools:
- QmTradingExecutor123... (Trading Executor)
- QmPortfolioManager456... (Portfolio Manager)  
- QmEmergencyStop789... (Emergency Stop)

Policies:
- QmTradeLimits123... (Trade Size Limits)
- QmTimeRestrictions456... (Trading Hours)
- QmAssetWhitelist789... (Allowed Assets)
```

## 🚀 Quick Start for Hackathon

**For immediate testing**, you can:

1. **Use the IPFS CID already in the form**: `QmUT4Ke8cPtJYRZiWrkoG9RZc77hmRETNQjvDYfLtrMUEY`
2. **Add a simple policy** with a basic IPFS CID
3. **Save the app** to get your Vincent App ID
4. **Update your .env files** with the App ID
5. **Test the integration** 

## 🔗 Resources

- **Lit Actions Documentation**: https://developer.litprotocol.com/sdk/serverless-signing/lit-actions/overview
- **Vincent Examples**: https://github.com/LIT-Protocol/Vincent/tree/main/examples
- **IPFS Upload**: https://app.pinata.cloud/ (for hosting your Lit Actions)

## ⚡ Next Steps

1. Configure your tools and policies in the Vincent Dashboard
2. Copy your Vincent App ID
3. Update your `.env` files with the App ID
4. Test the integration by visiting `/permissions` in your app

The exact IPFS CIDs will depend on your specific Lit Actions, but the structure above gives you a framework to work with!
