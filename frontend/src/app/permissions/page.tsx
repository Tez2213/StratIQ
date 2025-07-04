'use client'

import { useState } from 'react'
import { Shield, Lock, Unlock, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

export default function Permissions() {
  const [permissions, setPermissions] = useState({
    maxDailySpend: 1000,
    maxPositionSize: 500,
    allowedTokens: ['ETH', 'BTC', 'USDC'],
    tradingHours: { start: '09:00', end: '17:00' },
    riskLevel: 'medium',
    emergencyStop: true
  })

  const [isConnected, setIsConnected] = useState(false)

  const updatePermission = (key: string, value: any) => {
    setPermissions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-green-400" />
            Vincent Permissions
          </h1>
          <p className="text-gray-400">
            Control your AI trading agent with granular, secure permissions powered by Lit Protocol
          </p>
        </div>

        {/* Connection Status */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isConnected ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <p className="text-white font-semibold">Vincent Connected</p>
                    <p className="text-gray-400 text-sm">Your permissions are active and secure</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Vincent Not Connected</p>
                    <p className="text-gray-400 text-sm">Connect to enable secure AI trading</p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setIsConnected(!isConnected)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                isConnected
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isConnected ? 'Disconnect' : 'Connect Vincent'}
            </button>
          </div>
        </div>

        {/* Permission Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Financial Limits */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-400" />
              Financial Limits
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Max Daily Spend (USD)</label>
                <input
                  type="number"
                  value={permissions.maxDailySpend}
                  onChange={(e) => updatePermission('maxDailySpend', parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Max Position Size (USD)</label>
                <input
                  type="number"
                  value={permissions.maxPositionSize}
                  onChange={(e) => updatePermission('maxPositionSize', parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Risk Level</label>
                <select
                  value={permissions.riskLevel}
                  onChange={(e) => updatePermission('riskLevel', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Time & Token Restrictions */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Trading Restrictions
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Trading Hours</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={permissions.tradingHours.start}
                    onChange={(e) => updatePermission('tradingHours', 
                      { ...permissions.tradingHours, start: e.target.value })}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                  <input
                    type="time"
                    value={permissions.tradingHours.end}
                    onChange={(e) => updatePermission('tradingHours', 
                      { ...permissions.tradingHours, end: e.target.value })}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Allowed Tokens</label>
                <div className="flex flex-wrap gap-2">
                  {['ETH', 'BTC', 'USDC', 'UNI', 'LINK'].map(token => (
                    <button
                      key={token}
                      onClick={() => {
                        const newTokens = permissions.allowedTokens.includes(token)
                          ? permissions.allowedTokens.filter(t => t !== token)
                          : [...permissions.allowedTokens, token]
                        updatePermission('allowedTokens', newTokens)
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                        permissions.allowedTokens.includes(token)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {token}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Emergency Stop</span>
                <button
                  onClick={() => updatePermission('emergencyStop', !permissions.emergencyStop)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    permissions.emergencyStop
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {permissions.emergencyStop ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  <span>{permissions.emergencyStop ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Permission Templates */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Templates</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setPermissions({
                maxDailySpend: 100,
                maxPositionSize: 50,
                allowedTokens: ['USDC'],
                tradingHours: { start: '09:00', end: '17:00' },
                riskLevel: 'low',
                emergencyStop: true
              })}
              className="p-4 bg-green-900/20 border border-green-700 rounded-lg hover:bg-green-900/30 transition-colors"
            >
              <h3 className="text-green-300 font-semibold mb-2">Conservative</h3>
              <p className="text-gray-400 text-sm">Low risk, stable coins only</p>
            </button>

            <button
              onClick={() => setPermissions({
                maxDailySpend: 1000,
                maxPositionSize: 500,
                allowedTokens: ['ETH', 'BTC', 'USDC'],
                tradingHours: { start: '09:00', end: '17:00' },
                riskLevel: 'medium',
                emergencyStop: true
              })}
              className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg hover:bg-blue-900/30 transition-colors"
            >
              <h3 className="text-blue-300 font-semibold mb-2">Balanced</h3>
              <p className="text-gray-400 text-sm">Medium risk, major tokens</p>
            </button>

            <button
              onClick={() => setPermissions({
                maxDailySpend: 5000,
                maxPositionSize: 2000,
                allowedTokens: ['ETH', 'BTC', 'USDC', 'UNI', 'LINK'],
                tradingHours: { start: '00:00', end: '23:59' },
                riskLevel: 'high',
                emergencyStop: true
              })}
              className="p-4 bg-red-900/20 border border-red-700 rounded-lg hover:bg-red-900/30 transition-colors"
            >
              <h3 className="text-red-300 font-semibold mb-2">Aggressive</h3>
              <p className="text-gray-400 text-sm">High risk, all tokens, 24/7</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto space-x-2"
            disabled={!isConnected}
          >
            <Shield className="h-5 w-5" />
            <span>{isConnected ? 'Update Permissions' : 'Connect Vincent First'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
