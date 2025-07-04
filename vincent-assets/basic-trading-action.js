/**
 * StratIQ Basic Trading Permission Lit Action
 * Validates trading permissions for StratIQ AI Trading Platform
 */

const go = async() => {
    // Get parameters from the action
    const { userAddress, amount, asset, action, timestamp } = JSON.parse(params);

    // StratIQ Trading Rules
    const MAX_TRADE_AMOUNT = 1000; // $1000 max per trade
    const MAX_DAILY_AMOUNT = 5000; // $5000 max per day
    const ALLOWED_ASSETS = ['BTC', 'ETH', 'USDC', 'USDT', 'BNB'];
    const ALLOWED_ACTIONS = ['buy', 'sell', 'swap', 'limit_order'];

    // Validation results
    let isAllowed = true;
    let reasons = [];

    // Check amount limits
    if (amount > MAX_TRADE_AMOUNT) {
        isAllowed = false;
        reasons.push(`Trade amount ${amount} exceeds maximum ${MAX_TRADE_AMOUNT}`);
    }

    // Check allowed assets
    if (!ALLOWED_ASSETS.includes(asset.toUpperCase())) {
        isAllowed = false;
        reasons.push(`Asset ${asset} not in allowed list: ${ALLOWED_ASSETS.join(', ')}`);
    }

    // Check allowed actions
    if (!ALLOWED_ACTIONS.includes(action.toLowerCase())) {
        isAllowed = false;
        reasons.push(`Action ${action} not allowed. Permitted: ${ALLOWED_ACTIONS.join(', ')}`);
    }

    // Risk assessment
    let riskLevel = 'low';
    if (amount > 500) riskLevel = 'medium';
    if (amount > 800) riskLevel = 'high';

    // Create approval message
    const approvalData = {
        userAddress,
        amount,
        asset: asset.toUpperCase(),
        action: action.toLowerCase(),
        riskLevel,
        timestamp: timestamp || Date.now(),
        platform: 'StratIQ'
    };

    // Sign approval if allowed
    if (isAllowed) {
        const messageToSign = `StratIQ_TRADE_APPROVAL:${userAddress}:${action}:${amount}:${asset}:${approvalData.timestamp}`;

        const sigShare = await LitActions.signEcdsa({
            toSign: ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(messageToSign))),
            publicKey,
            sigName: "stratiqTradingApproval",
        });
    }

    // Return result
    LitActions.setResponse({
        response: JSON.stringify({
            approved: isAllowed,
            reasons: reasons.length > 0 ? reasons : ['Trade approved within limits'],
            tradeData: approvalData,
            signature: isAllowed ? 'signed' : null,
            nextAction: isAllowed ? 'execute_trade' : 'request_approval'
        })
    });
};

go();