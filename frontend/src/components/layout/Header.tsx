'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Bot, Shield, TrendingUp, Settings } from 'lucide-react'
import WalletConnection from '@/components/ui/WalletConnection'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">StratIQ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/permissions" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Permissions</span>
            </Link>
            <Link href="/strategies" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <Bot className="h-4 w-4" />
              <span>Strategies</span>
            </Link>
            <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            <WalletConnection />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <Link href="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link href="/permissions" className="block px-3 py-2 text-gray-300 hover:text-white">
                Permissions
              </Link>
              <Link href="/strategies" className="block px-3 py-2 text-gray-300 hover:text-white">
                Strategies
              </Link>
              <Link href="/analytics" className="block px-3 py-2 text-gray-300 hover:text-white">
                Analytics
              </Link>
              <button className="w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-2">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
