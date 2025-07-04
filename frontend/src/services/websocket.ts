import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io('http://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to StratIQ WebSocket server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 3000 * this.reconnectAttempts);
    }
  }

  // Portfolio updates
  onPortfolioUpdate(callback: (data: any) => void) {
    this.socket?.on('portfolio_update', callback);
  }

  offPortfolioUpdate(callback: (data: any) => void) {
    this.socket?.off('portfolio_update', callback);
  }

  // Strategy updates
  onStrategyUpdate(callback: (data: any) => void) {
    this.socket?.on('strategy_update', callback);
  }

  offStrategyUpdate(callback: (data: any) => void) {
    this.socket?.off('strategy_update', callback);
  }

  // Market data updates
  onMarketUpdate(callback: (data: any) => void) {
    this.socket?.on('market_update', callback);
  }

  offMarketUpdate(callback: (data: any) => void) {
    this.socket?.off('market_update', callback);
  }

  getSocket() {
    return this.socket;
  }
}

export const wsService = new WebSocketService();
export default wsService;
