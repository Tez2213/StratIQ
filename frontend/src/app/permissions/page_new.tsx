'use client'

import { useState, useEffect } from 'react'
import { Shield, Check, X, AlertTriangle, Power, Settings } from 'lucide-react'
import { apiService } from '@/services/api'
import vincentAuth from '@/services/vincentAuth'

export default function Permissions() {
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [authState, setAuthState] = useState(vincentAuth.getAuthState())
  const [updating, setUpdating] = useState({})

  useEffect(() => {
    // Check authentication state periodically
    const checkAuth = () => {
      const newAuthState = vincentAuth.getAuthState()
      setAuthState(newAuthState)
      
      if (newAuthState.isAuthenticated) {
        loadPermissions()
      } else {
        setLoading(false)
      }
    }

    checkAuth()
    const interval = setInterval(checkAuth, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const loadPermissions = async () => {
    if (!authState.isAuthenticated) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await apiService.getPermissions()
      
      if (response.success) {
        setPermissions(response.permissions || [])
      } else if (response.requiresAuth) {
        // Need to re-authenticate
        console.log('Authentication required, clearing local auth state')
        vincentAuth.logout()
        setAuthState(vincentAuth.getAuthState())
      } else {
        console.error('Failed to load permissions:', response.error)
      }
    } catch (error) {
      console.error('Failed to load permissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = () => {
    if (authState.isAuthenticated) {
      vincentAuth.logout()
      setPermissions([])
      setAuthState(vincentAuth.getAuthState())
    } else {
      console.log('🔄 Initiating Vincent authentication...')
      vincentAuth.login()
    }
  }

  const handlePermissionToggle = async (permissionId, enabled) => {
    if (!authState.isAuthenticated) return

    setUpdating(prev => ({ ...prev, [permissionId]: true }))
    
    try {
      const response = await apiService.updatePermission(permissionId, { enabled })
      
      if (response.success) {
        setPermissions(prev => prev.map(perm => 
          perm.id === permissionId ? { ...perm, enabled } : perm
        ))
      } else if (response.requiresAuth) {
        vincentAuth.logout()
        setAuthState(vincentAuth.getAuthState())
      } else {
        console.error('Failed to update permission:', response.error)
        alert(`Failed to update permission: ${response.error}`)
      }
    } catch (error) {
      console.error('Failed to update permission:', error)
      alert('Failed to update permission')
    } finally {
      setUpdating(prev => ({ ...prev, [permissionId]: false }))
    }
  }

  const handleEmergencyStop = async () => {
    if (!authState.isAuthenticated) return

    if (!confirm('Are you sure you want to activate emergency stop? This will halt all trading activities.')) {
      return
    }

    try {
      const response = await apiService.emergencyStop()
      
      if (response.success) {
        alert('Emergency stop activated successfully')
        loadPermissions() // Reload to reflect changes
      } else if (response.requiresAuth) {
        vincentAuth.logout()
        setAuthState(vincentAuth.getAuthState())
      } else {
        alert(`Emergency stop failed: ${response.error}`)
      }
    } catch (error) {
      console.error('Emergency stop failed:', error)
      alert('Emergency stop failed')
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading permissions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Vincent Permissions
        </h1>
        <p className="text-gray-400">
          Manage your AI agent permissions through Vincent's decentralized consent system
        </p>
      </div>

      {/* Connection Status */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-3 ${authState.isAuthenticated ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <div>
              {authState.isAuthenticated ? (
                <div>
                  <p className="text-white font-semibold">Vincent Connected</p>
                  <p className="text-gray-400 text-sm">
                    Wallet: {authState.userAddress ? 
                      `${authState.userAddress.slice(0, 6)}...${authState.userAddress.slice(-4)}` : 
                      'Connected'
                    }
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-semibold">Vincent Not Connected</p>
                  <p className="text-gray-400 text-sm">Connect to manage permissions</p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleConnect}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              authState.isAuthenticated
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {authState.isAuthenticated ? 'Disconnect' : 'Connect Vincent'}
          </button>
        </div>
      </div>

      {!authState.isAuthenticated ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Vincent Authentication Required
          </h2>
          <p className="text-gray-400 mb-6">
            Connect with Vincent to manage your AI agent permissions securely through decentralized consent management.
          </p>
          <button
            onClick={handleConnect}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Connect with Vincent
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Emergency Stop */}
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">Emergency Stop</h3>
                  <p className="text-gray-400 text-sm">Immediately halt all trading activities</p>
                </div>
              </div>
              <button
                onClick={handleEmergencyStop}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Power className="h-4 w-4 mr-2 inline" />
                Emergency Stop
              </button>
            </div>
          </div>

          {/* Permissions List */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Active Permissions
              </h2>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {permissions.filter(p => p.enabled).length} / {permissions.length} Active
              </span>
            </div>
            
            {permissions.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No permissions configured</p>
                <p className="text-gray-500 text-sm mt-2">
                  Your Vincent App may not have any tools configured yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-white font-medium">{permission.name}</h3>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                          permission.riskLevel === 'High' ? 'bg-red-900 text-red-200' :
                          permission.riskLevel === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                          permission.riskLevel === 'Safety' ? 'bg-green-900 text-green-200' :
                          'bg-blue-900 text-blue-200'
                        }`}>
                          {permission.riskLevel} Risk
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-2">{permission.description}</p>
                      
                      {permission.maxAmount && (
                        <p className="text-gray-400 text-xs">
                          Max Amount: ${permission.maxAmount}
                        </p>
                      )}
                      
                      {permission.conditions && permission.conditions.length > 0 && (
                        <div className="mt-2">
                          <p className="text-gray-400 text-xs mb-1">Conditions:</p>
                          <ul className="text-gray-500 text-xs space-y-1">
                            {permission.conditions.map((condition, index) => (
                              <li key={index}>• {condition}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6">
                      <button
                        onClick={() => handlePermissionToggle(permission.id, !permission.enabled)}
                        disabled={updating[permission.id]}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          permission.enabled ? 'bg-green-600' : 'bg-gray-600'
                        } ${updating[permission.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                          permission.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}>
                          {updating[permission.id] ? (
                            <div className="w-full h-full rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
                          ) : permission.enabled ? (
                            <Check className="h-3 w-3 text-green-600 m-0.5" />
                          ) : (
                            <X className="h-3 w-3 text-gray-600 m-0.5" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Update Permissions Button */}
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">
              Need to modify permissions or add new tools? 
            </p>
            <button
              onClick={() => vincentAuth.login()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Update Permissions via Vincent</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
