'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Shield, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import { apiService } from '@/services/api'

export default function Analytics() {
  const [permissionAnalytics, setPermissionAnalytics] = useState(null)
  const [tradingHistory, setTradingHistory] = useState([])
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = async () => {
    try {
      const [analyticsData, historyData, portfolioData] = await Promise.all([
        apiService.getPermissionAnalytics(),
        apiService.getTradingHistory(),
        apiService.getPortfolio()
      ])

      if (analyticsData?.analytics) {
        setPermissionAnalytics(analyticsData.analytics)
      }

      if (historyData?.trades) {
        setTradingHistory(historyData.trades)
      }

      if (portfolioData) {
        setPortfolio(portfolioData)
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">Loading analytics...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h1>
          <p className="text-gray-400">Comprehensive analysis of your trading performance and risk management</p>
        </div>

        {/* Key Metrics */}
        {portfolio && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Portfolio</p>
                  <p className="text-2xl font-bold text-white">${portfolio.totalValue?.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total P&L</p>
                  <p className={`text-2xl font-bold ${portfolio.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${portfolio.totalPnL?.toFixed(2)}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Positions</p>
                  <p className="text-2xl font-bold text-white">{portfolio.positions}</p>
                </div>
                <Activity className="h-8 w-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Cash Available</p>
                  <p className="text-2xl font-bold text-white">${portfolio.cash?.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Permission Analytics */}
        {permissionAnalytics && (
          <div className="mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Vincent Permission Analytics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{permissionAnalytics.totalPermissions}</p>
                <p className="text-gray-400 text-sm">Total Permissions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">{permissionAnalytics.enabledPermissions}</p>
                <p className="text-gray-400 text-sm">Enabled</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Low: {permissionAnalytics.riskDistribution?.low || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Med: {permissionAnalytics.riskDistribution?.medium || 0}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Risk Distribution</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">High: {permissionAnalytics.riskDistribution?.high || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Safety: {permissionAnalytics.riskDistribution?.safety || 0}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">High/Safety</p>
              </div>
            </div>

            {/* Recent Permission Activity */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Recent Permission Activity</h3>
              <div className="space-y-3">
                {permissionAnalytics.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.permission}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300 text-sm">{activity.change}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trading Performance Chart */}
        <div className="mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
            Trading Performance
          </h2>
          <div className="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Advanced charting integration coming soon</p>
              <p className="text-gray-500 text-sm">Will include P&L curves, drawdown analysis, and risk metrics</p>
            </div>
          </div>
        </div>

        {/* Recent Trading History */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-400" />
            Recent Trading History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="pb-3 text-gray-400">Time</th>
                  <th className="pb-3 text-gray-400">Symbol</th>
                  <th className="pb-3 text-gray-400">Side</th>
                  <th className="pb-3 text-gray-400">Amount</th>
                  <th className="pb-3 text-gray-400">Price</th>
                  <th className="pb-3 text-gray-400">P&L</th>
                  <th className="pb-3 text-gray-400">Strategy</th>
                </tr>
              </thead>
              <tbody>
                {tradingHistory.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-700">
                    <td className="py-3 text-gray-300 text-sm">
                      {new Date(trade.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 text-white font-medium">{trade.symbol}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        trade.side === 'buy' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {trade.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-white">{trade.amount}</td>
                    <td className="py-3 text-gray-300">${trade.price?.toLocaleString()}</td>
                    <td className={`py-3 ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.pnl?.toFixed(2)}
                    </td>
                    <td className="py-3 text-blue-400 text-sm">{trade.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
