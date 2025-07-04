'use client'

import { useState, useEffect } from 'react'
import { Bot, TrendingUp, Users, Target, Star } from 'lucide-react'
import { apiService } from '@/services/api'

export default function Strategies() {
  const [leaderboard, setLeaderboard] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [marketSentiment, setMarketSentiment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStrategiesData()
  }, [])

  const loadStrategiesData = async () => {
    try {
      const [leaderboardData, recommendationsData, sentimentData] = await Promise.all([
        apiService.getLeaderboard(),
        apiService.getStrategyRecommendations(),
        apiService.getMarketSentiment()
      ])

      if (leaderboardData?.leaderboard) {
        setLeaderboard(leaderboardData.leaderboard)
      }

      if (recommendationsData?.recommendations) {
        setRecommendations(recommendationsData.recommendations)
      }

      if (sentimentData?.sentiment) {
        setMarketSentiment(sentimentData.sentiment)
      }
    } catch (error) {
      console.error('Failed to load strategies data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">Loading strategies...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Trading Strategies</h1>
          <p className="text-gray-400">Learn from Recall Network's top performers and deploy winning strategies</p>
        </div>

        {/* Market Sentiment */}
        {marketSentiment && (
          <div className="mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
              Market Sentiment Analysis
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{marketSentiment.overall}</p>
                <p className="text-gray-400 text-sm">Overall Sentiment</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{marketSentiment.confidence}%</p>
                <p className="text-gray-400 text-sm">Confidence</p>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-2">
                  {marketSentiment.topSignals?.slice(0, 2).map((signal, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white">{signal.asset}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        signal.sentiment === 'Strong Buy' ? 'bg-green-900 text-green-300' :
                        signal.sentiment === 'Buy' ? 'bg-blue-900 text-blue-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {signal.sentiment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strategy Recommendations */}
        <div className="mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-400" />
            AI Strategy Recommendations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white">{rec.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">{rec.confidence}%</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{rec.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Expected ROI:</span>
                    <span className="text-green-400 ml-2">{rec.expectedRoi}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Risk Level:</span>
                    <span className={`ml-2 ${
                      rec.riskLevel === 'Low' ? 'text-green-400' :
                      rec.riskLevel === 'Medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {rec.riskLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Horizon:</span>
                    <span className="text-white ml-2">{rec.timeHorizon}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Based on:</span>
                    <span className="text-blue-400 ml-2 text-xs">{rec.basedOn}</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors">
                  Deploy Strategy
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recall Network Leaderboard */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-400" />
            Recall Network Leaderboard
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="pb-3 text-gray-400">Rank</th>
                  <th className="pb-3 text-gray-400">Trader</th>
                  <th className="pb-3 text-gray-400">P&L</th>
                  <th className="pb-3 text-gray-400">Win Rate</th>
                  <th className="pb-3 text-gray-400">ROI</th>
                  <th className="pb-3 text-gray-400">Strategy</th>
                  <th className="pb-3 text-gray-400">Followers</th>
                  <th className="pb-3 text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((trader, index) => (
                  <tr key={trader.id} className="border-b border-gray-700">
                    <td className="py-3 text-white">#{index + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-400" />
                        <span className="text-white font-medium">{trader.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-green-400">${trader.pnl?.toLocaleString()}</td>
                    <td className="py-3 text-white">{trader.winRate}%</td>
                    <td className="py-3 text-green-400">{trader.roi}%</td>
                    <td className="py-3 text-gray-300 text-sm">{trader.strategy}</td>
                    <td className="py-3 text-gray-300">{trader.followers?.toLocaleString()}</td>
                    <td className="py-3">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Follow
                      </button>
                    </td>
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
