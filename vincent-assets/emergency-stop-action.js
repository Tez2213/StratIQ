/**
 * StratIQ Emergency Stop Lit Action
 * Provides immediate halt functionality for all trading operations
 */

const go = async() => {
    // Get parameters
    const { userAddress, reason, severity, initiatedBy } = JSON.parse(params);

    // Emergency stop validation
    const VALID_SEVERITIES = ['low', 'medium', 'high', 'critical'];
    const emergencySeverity = severity || 'medium';

    if (!VALID_SEVERITIES.includes(emergencySeverity)) {
        LitActions.setResponse({
            response: JSON.stringify({
                error: 'Invalid severity level',
                validSeverities: VALID_SEVERITIES
            })
        });
        return;
    }

    // Create emergency stop data
    const emergencyData = {
        action: 'EMERGENCY_STOP',
        userAddress: userAddress,
        reason: reason || 'User initiated emergency stop',
        severity: emergencySeverity,
        initiatedBy: initiatedBy || userAddress,
        timestamp: Date.now(),
        platform: 'StratIQ',
        stopAllTrading: true,
        stopAllStrategies: true,
        requireManualRestart: emergencySeverity === 'critical'
    };

    // Create stop message
    const stopMessage = `STRATIQ_EMERGENCY_STOP:${userAddress}:${emergencyData.severity}:${emergencyData.timestamp}`;

    // Sign the emergency stop order
    const sigShare = await LitActions.signEcdsa({
        toSign: ethers.utils.arrayify(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(stopMessage))),
        publicKey,
        sigName: "stratiqEmergencyStop",
    });

    // Return emergency stop confirmation
    LitActions.setResponse({
        response: JSON.stringify({
            emergencyStop: true,
            data: emergencyData,
            message: `🚨 EMERGENCY STOP ACTIVATED - All StratIQ trading halted for ${userAddress}`,
            nextSteps: emergencyData.requireManualRestart ?
                'Manual restart required due to critical severity' : 'Trading can be resumed through dashboard',
            signature: 'emergency_signed'
        })
    });
};

go();