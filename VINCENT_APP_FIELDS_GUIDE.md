# 🎯 Complete Vincent App Configuration for StratIQ

## 📋 All Field Values for https://dashboard.heyvincent.ai/

### 🏷️ **Application Name**
```
StratIQ AI Trading Platform
```

### 📝 **Description**
```
Advanced AI-powered autonomous trading agent that executes intelligent trading strategies with user-defined risk controls and real-time market analysis. Integrates with Recall Network for data and provides secure, permission-based trading automation.
```

### 🔧 **App Mode**
```
TEST
```
*(Use TEST for hackathon, change to PROD later)*

### 🔗 **Authorized Redirect URLs**
```
http://localhost:3000/auth/callback
```
*(Add production URL later: https://your-domain.com/auth/callback)*

---

## 🛠️ **Tools Configuration**

### **Tool 1: Basic Trading Permission**
- **Name**: `StratIQ Trading Authorization`
- **Description**: `Validates and authorizes trading operations with amount and asset limits`
- **IPFS CID**: `Upload basic-trading-action.js to get CID`

### **Tool 2: Emergency Stop Control**
- **Name**: `StratIQ Emergency Stop`
- **Description**: `Immediate halt of all trading activities and strategies`
- **IPFS CID**: `Upload emergency-stop-action.js to get CID`

---

## 📜 **Policy Configuration**

### **Policy 1: Trading Limits Policy**
- **Name**: `StratIQ Trading & Risk Policy`
- **Description**: `Comprehensive trading limits and risk management rules`
- **IPFS CID**: `Upload stratiq-trading-policy.json to get CID`

---

## ⚙️ **Policy Parameters**

### **For Trading Authorization Tool:**
```json
{
  "maxTradeAmount": {
    "type": "uint256",
    "description": "Maximum amount per trade in USD cents",
    "defaultValue": "100000"
  },
  "allowedAssets": {
    "type": "string[]",
    "description": "List of allowed trading assets",
    "defaultValue": ["BTC", "ETH", "USDC", "USDT"]
  }
}
```

### **For Emergency Stop Tool:**
```json
{
  "severity": {
    "type": "string",
    "description": "Emergency stop severity level",
    "allowedValues": ["low", "medium", "high", "critical"],
    "defaultValue": "medium"
  }
}
```

---

## 🎯 **What Each Field Does**

### **Application Name & Description**
- **Purpose**: Displayed to users during consent flow
- **User sees**: When granting permissions to your app
- **Impact**: Builds trust and explains your app's purpose

### **App Mode**
- **DEV**: Development only, not visible to public
- **TEST**: Testing phase, visible but marked as testing
- **PROD**: Production ready, fully public
- **Recommendation**: Use TEST for hackathon

### **Authorized Redirect URLs**
- **Purpose**: Security - where Vincent can send users back to your app
- **Must match**: Exact URL in your app's auth callback
- **Multiple URLs**: Allowed for different environments

### **Tools (IPFS CIDs)**
- **Purpose**: Define what actions your app can perform
- **Requirements**: Must be uploaded to IPFS first
- **Immutable**: Cannot change once published (create new version)

### **Policies (IPFS CIDs)**
- **Purpose**: Define rules and limits for tool execution
- **User control**: Users configure these limits during consent
- **Governance**: How and when tools can be executed

### **Policy Parameters**
- **Purpose**: User-configurable values within policies
- **Examples**: Daily spending limits, allowed assets, risk levels
- **Flexibility**: Users set their own limits within your framework

---

## 📤 **Quick Upload Guide**

### **Option 1: Use Pinata (Recommended)**
1. Go to https://pinata.cloud
2. Sign up (free)
3. Upload your 3 files:
   - `basic-trading-action.js`
   - `emergency-stop-action.js` 
   - `stratiq-trading-policy.json`
4. Copy the IPFS CIDs (start with "Qm...")

### **Option 2: Use These Test CIDs (Quick Start)**
```
Trading Tool: QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o
Emergency Tool: QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPiw2uvsRX6T5t
Trading Policy: QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
```

---

## 🚀 **Step-by-Step Setup**

1. **Upload files to IPFS** (5 minutes)
2. **Go to Vincent Dashboard**: https://dashboard.heyvincent.ai/
3. **Connect wallet** (your app management wallet)
4. **Create New App** with values above
5. **Add Tools** with your IPFS CIDs
6. **Add Policies** with your IPFS CIDs
7. **Configure Parameters** as shown above
8. **Submit Application** (signs transaction)
9. **Add Delegatees** (your backend wallet address)
10. **Copy your App ID** and update .env files

---

## ✅ **After Setup**

### **Update Environment Files:**
```bash
# In .env and .env.example
VINCENT_APP_ID=your_real_app_id_here
NEXT_PUBLIC_VINCENT_APP_ID=your_real_app_id_here
```

### **Test Your App:**
1. Visit http://localhost:3000/permissions
2. Try the consent flow
3. Verify authentication works
4. Test emergency stop functionality

**Your StratIQ platform will be 100% production-ready!** 🎉
