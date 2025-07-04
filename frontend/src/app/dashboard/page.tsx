'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Bot, Shield, Activity } from 'lucide-react'
import { wsService } from '@/services/websocket'
import { apiService } from '@/services/api'

export default function Dashboard() {
  const [portfolioValue, setPortfolioValue] = useState(10000)
  const [dailyPnL, setDailyPnL] = useState(245.67)
  const [activeStrategies, setActiveStrategies] = useState(3)
  const [isTrading, setIsTrading] = useState(true)
  const [connected, setConnected] = useState(false)
  const [strategies, setStrategies] = useState([])
  const [positions, setPositions] = useState([])

  // Initialize WebSocket connection and fetch initial data
  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const socket = wsService.connect()
    
    if (socket) {
      socket.on('connect', () => setConnected(true))
      socket.on('disconnect', () => setConnected(false))
      
      // Listen for portfolio updates
      wsService.onPortfolioUpdate((data) => {
        setPortfolioValue(data.portfolioValue)
        setDailyPnL(data.dailyPnL)
        setActiveStrategies(data.activeStrategies)
      })
    }

    // Fetch initial data from API
    loadInitialData()

    return () => {
      wsService.disconnect()
    }
  }, [])

  const loadInitialData = async () => {
    try {
      const [portfolioData, strategiesData, positionsData] = await Promise.all([
        apiService.getPortfolio(),
        apiService.getStrategies(),
        apiService.getPositions()
      ])

      if (portfolioData) {
        setPortfolioValue(portfolioData.totalValue || 10000)
        setDailyPnL(portfolioData.dailyPnL || 245.67)
        setActiveStrategies(portfolioData.activeStrategies || 3)
      }

      if (strategiesData?.strategies) {
        setStrategies(strategiesData.strategies)
      }

      if (positionsData?.positions) {
        setPositions(positionsData.positions)
      }
    } catch (error) {
      console.error('Failed to load initial data:', error)
    }
  }

  const toggleStrategy = async (strategyId: string, currentStatus: string) => {
    try {
      const action = currentStatus === 'active' ? 'stop' : 'start'
      await apiService.updateStrategy(strategyId, action)
      // Refresh strategies data
      const strategiesData = await apiService.getStrategies()
      if (strategiesData?.strategies) {
        setStrategies(strategiesData.strategies)
      }
    } catch (error) {
      console.error('Failed to toggle strategy:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
            <p className="text-gray-400">Real-time portfolio management and AI strategy monitoring</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-400">
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Portfolio Value */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">
                  ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>

          {/* Daily P&L */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Daily P&L</p>
                <p className={`text-2xl font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {dailyPnL >= 0 ? '+' : ''}${dailyPnL.toFixed(2)}
                </p>
              </div>
              {dailyPnL >= 0 ? 
                <TrendingUp className="h-8 w-8 text-green-400" /> : 
                <TrendingDown className="h-8 w-8 text-red-400" />
              }
            </div>
          </div>

          {/* Active Strategies */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Strategies</p>
                <p className="text-2xl font-bold text-white">{activeStrategies}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          {/* Trading Status */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className={`text-lg font-semibold ${isTrading ? 'text-green-400' : 'text-red-400'}`}>
                  {isTrading ? 'Active' : 'Paused'}
                </p>
              </div>
              <Activity className={`h-8 w-8 ${isTrading ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </div>
        </div>

        {/* Active Strategies */}
        <div className="mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Bot className="h-5 w-5 mr-2 text-blue-400" />
            Active Trading Strategies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((strategy: any) => (
              <div key={strategy.id} className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{strategy.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    strategy.status === 'active' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {strategy.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">P&L:</span>
                    <span className={strategy.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${strategy.pnl?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-white">{strategy.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trades:</span>
                    <span className="text-white">{strategy.trades}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleStrategy(strategy.id, strategy.status)}
                  className={`mt-3 w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                    strategy.status === 'active'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {strategy.status === 'active' ? 'Stop' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trading Chart */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Portfolio Performance</h2>
            <div className="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Chart integration coming soon</p>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-400" />
              AI Insights
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                <p className="text-blue-300 text-sm">Market Analysis</p>
                <p className="text-white">Bullish trend detected in DeFi tokens</p>
              </div>
              <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-300 text-sm">Strategy Update</p>
                <p className="text-white">Learning from top Recall performers</p>
              </div>
              <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                <p className="text-yellow-300 text-sm">Risk Alert</p>
                <p className="text-white">Position size within safe limits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Trades</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="pb-3 text-gray-400">Time</th>
                  <th className="pb-3 text-gray-400">Pair</th>
                  <th className="pb-3 text-gray-400">Type</th>
                  <th className="pb-3 text-gray-400">Amount</th>
                  <th className="pb-3 text-gray-400">Price</th>
                  <th className="pb-3 text-gray-400">P&L</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-gray-700">
                  <td className="py-3">14:23:45</td>
                  <td className="py-3">ETH/USDC</td>
                  <td className="py-3 text-green-400">BUY</td>
                  <td className="py-3">0.5 ETH</td>
                  <td className="py-3">$3,245.67</td>
                  <td className="py-3 text-green-400">+$23.45</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3">14:18:32</td>
                  <td className="py-3">BTC/USDT</td>
                  <td className="py-3 text-red-400">SELL</td>
                  <td className="py-3">0.01 BTC</td>
                  <td className="py-3">$67,890.12</td>
                  <td className="py-3 text-green-400">+$156.78</td>
                </tr>
                <tr>
                  <td className="py-3">14:15:21</td>
                  <td className="py-3">UNI/ETH</td>
                  <td className="py-3 text-green-400">BUY</td>
                  <td className="py-3">100 UNI</td>
                  <td className="py-3">$12.34</td>
                  <td className="py-3 text-green-400">+$45.23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Control Panel */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Controls</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsTrading(!isTrading)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                isTrading 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTrading ? 'Pause Trading' : 'Resume Trading'}
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Adjust Risk Settings
            </button>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
              View Strategies
            </button>
            <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Vincent Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
