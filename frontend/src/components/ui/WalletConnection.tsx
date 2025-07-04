'use client'

import { useState } from 'react'
import { Wallet, LogOut } from 'lucide-react'

export default function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        // Request account access
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        })
        
        if (accounts.length > 0) {
          const address = accounts[0]
          setWalletAddress(address)
          setIsConnected(true)
          
          // You could call your API login here
          // await apiService.login(address)
          
          console.log('Connected to wallet:', address)
        }
      } else {
        alert('MetaMask is not installed. Please install MetaMask to continue.')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
    // Could call logout API here
    console.log('Wallet disconnected')
  }

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-white text-sm">{formatAddress(walletAddress)}</span>
        </div>
        <button
          onClick={disconnectWallet}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
    >
      <Wallet className="h-5 w-5" />
      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </button>
  )
}
