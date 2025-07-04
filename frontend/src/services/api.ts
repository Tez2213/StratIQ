const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication APIs
  async login(walletAddress: string) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    });
  }

  async logout() {
    return this.makeRequest('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile() {
    return this.makeRequest('/auth/profile');
  }

  // Trading APIs
  async getPortfolio() {
    return this.makeRequest('/trading/portfolio');
  }

  async getStrategies() {
    return this.makeRequest('/trading/strategies');
  }

  async getPositions() {
    return this.makeRequest('/trading/positions');
  }

  async updateStrategy(strategyId: string, action: 'start' | 'stop') {
    return this.makeRequest(`/trading/strategies/${strategyId}/${action}`, {
      method: 'POST',
    });
  }

  async getTradingHistory() {
    return this.makeRequest('/trading/history');
  }

  // Recall Network APIs
  async getLeaderboard(limit: number = 10) {
    return this.makeRequest(`/recall/leaderboard?limit=${limit}`);
  }

  async getTraderInsights(traderId: string) {
    return this.makeRequest(`/recall/trader/${traderId}/insights`);
  }

  async getMarketSentiment() {
    return this.makeRequest('/recall/market-sentiment');
  }

  async getStrategyRecommendations(options: Record<string, any> = {}) {
    const params = new URLSearchParams(options).toString();
    return this.makeRequest(`/recall/strategy-recommendations?${params}`);
  }

  // Vincent/Lit Protocol APIs
  async getPermissions(walletAddress?: string) {
    const params = walletAddress ? `?walletAddress=${walletAddress}` : '';
    return this.makeRequest(`/vincent/permissions${params}`);
  }

  async updatePermission(permissionId: string, updates: any, walletAddress?: string) {
    return this.makeRequest(`/vincent/permissions/${permissionId}`, {
      method: 'PUT',
      body: JSON.stringify({ ...updates, walletAddress }),
    });
  }

  async validateAction(action: string, amount?: number, context?: any, walletAddress?: string) {
    return this.makeRequest('/vincent/validate-action', {
      method: 'POST',
      body: JSON.stringify({ action, amount, context, walletAddress }),
    });
  }

  async emergencyStop(walletAddress?: string) {
    return this.makeRequest('/vincent/emergency-stop', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    });
  }

  async getPermissionAnalytics() {
    return this.makeRequest('/vincent/analytics');
  }

  // Health check
  async healthCheck() {
    return fetch('http://localhost:3001/health').then(res => res.json());
  }
}

export const apiService = new ApiService();
export default apiService;
