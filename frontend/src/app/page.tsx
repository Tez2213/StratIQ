import Link from 'next/link'
import { Bot, Shield, TrendingUp, Zap, Trophy, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Bot className="h-16 w-16 text-blue-400" />
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              StratIQ
              <span className="block text-blue-400">AI Trading Agent</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Autonomous trading agent that learns from Recall Network's top performers 
              while maintaining user control through Vincent's permission system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Start Trading</span>
              </Link>
              <Link 
                href="/permissions"
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Set Permissions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why StratIQ Wins
            </h2>
            <p className="text-gray-300 text-lg">
              Built for the Autonomous Apes Hackathon with winning features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <Bot className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Recall Intelligence</h3>
              <p className="text-gray-300">
                Learns from top performer strategies on Recall Network's leaderboard for competitive advantage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <Shield className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Vincent Security</h3>
              <p className="text-gray-300">
                User-controlled permissions ensure you maintain full control over your assets at all times.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <Zap className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Adaptive AI</h3>
              <p className="text-gray-300">
                Strategy switching based on market conditions and real-time performance analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Section */}
      <div className="py-24 bg-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Autonomous Apes Hackathon
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <Target className="h-8 w-8 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Main Track</h3>
              <p className="text-gray-300 mb-2">Trading Competition July 23rd</p>
              <p className="text-2xl font-bold text-blue-400">$25,000 Prize Pool</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <Shield className="h-8 w-8 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Lit Protocol Track</h3>
              <p className="text-gray-300 mb-2">Vincent AI Agent Integration</p>
              <p className="text-2xl font-bold text-green-400">$5,000 Prize Pool</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Start Trading?
          </h2>
          <Link 
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2"
          >
            <Bot className="h-6 w-6" />
            <span>Launch StratIQ</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
