import { getVincentWebAppClient, jwt } from '@lit-protocol/vincent-app-sdk';

const { isExpired, verify } = jwt;

interface VincentAuthState {
  isAuthenticated: boolean;
  jwt: string | null;
  userAddress: string | null;
  permissions: any[];
}

class VincentAuthService {
  private vincentClient: any;
  private appId: string;
  private state: VincentAuthState = {
    isAuthenticated: false,
    jwt: null,
    userAddress: null,
    permissions: []
  };

  constructor() {
    this.appId = process.env.NEXT_PUBLIC_VINCENT_APP_ID || '';
    if (!this.appId) {
      console.warn('NEXT_PUBLIC_VINCENT_APP_ID not configured - Vincent features disabled');
      return;
    }

    this.vincentClient = getVincentWebAppClient({ appId: this.appId });
    this.initializeAuth();
  }

  private initializeAuth() {
    if (!this.vincentClient) return;

    // Check if user just returned from consent page with JWT
    if (this.vincentClient.isLoginUri()) {
      this.handleLoginReturn();
    } else {
      // Check for existing stored JWT
      this.checkStoredAuth();
    }
  }

  private handleLoginReturn() {
    try {
      const { decodedJWT, jwtStr } = this.vincentClient.decodeVincentLoginJWT(window.location.origin);
      
      // Store JWT for later use
      localStorage.setItem('VINCENT_AUTH_JWT', jwtStr);
      
      // Clean up the URL
      this.vincentClient.removeLoginJWTFromURI();
      
      // Update auth state
      this.updateAuthState(jwtStr, decodedJWT);
      
      console.log('✅ Vincent authentication successful');
    } catch (error) {
      console.error('❌ Vincent login processing failed:', error);
      this.clearAuth();
    }
  }

  private checkStoredAuth() {
    const storedJwt = localStorage.getItem('VINCENT_AUTH_JWT');
    
    if (!storedJwt) {
      this.state.isAuthenticated = false;
      return;
    }

    if (isExpired(storedJwt)) {
      console.log('🔄 Vincent JWT expired, clearing auth');
      this.clearAuth();
      return;
    }

    try {
      const decodedJWT = verify(storedJwt, window.location.origin);
      this.updateAuthState(storedJwt, decodedJWT);
      console.log('✅ Vincent authentication restored from storage');
    } catch (error) {
      console.error('❌ Vincent JWT verification failed:', error);
      this.clearAuth();
    }
  }

  private updateAuthState(jwtStr: string, decodedJWT: any) {
    this.state = {
      isAuthenticated: true,
      jwt: jwtStr,
      userAddress: decodedJWT.pkpAddress || null,
      permissions: decodedJWT.permissions || []
    };
  }

  public getAuthState(): VincentAuthState {
    return { ...this.state };
  }

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated && this.state.jwt && !isExpired(this.state.jwt);
  }

  public getUserAddress(): string | null {
    return this.state.userAddress;
  }

  public getJWT(): string | null {
    return this.state.jwt;
  }

  public getPermissions(): any[] {
    return this.state.permissions;
  }

  public login(redirectUri?: string): void {
    if (!this.vincentClient) {
      console.error('Vincent client not initialized - check NEXT_PUBLIC_VINCENT_APP_ID');
      return;
    }

    const finalRedirectUri = redirectUri || window.location.href;
    
    console.log('🔄 Redirecting to Vincent consent page...');
    this.vincentClient.redirectToConsentPage({ 
      redirectUri: finalRedirectUri,
      consentPageUrl: process.env.VINCENT_CONSENT_PAGE_URL || 'https://consent.heyvincent.ai'
    });
  }

  public logout(): void {
    this.clearAuth();
    console.log('✅ Vincent logout successful');
  }

  private clearAuth(): void {
    localStorage.removeItem('VINCENT_AUTH_JWT');
    this.state = {
      isAuthenticated: false,
      jwt: null,
      userAddress: null,
      permissions: []
    };
  }

  public hasPermission(permission: string): boolean {
    return this.state.permissions.some(p => p.type === permission || p.name === permission);
  }

  public async validateAction(action: string, amount?: number, context?: any): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    // This would typically make an API call to your backend
    // which would then validate the action against Vincent permissions
    try {
      const response = await fetch('/api/vincent/validate-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.jwt}`
        },
        body: JSON.stringify({ action, amount, context })
      });

      const result = await response.json();
      return result.success && result.validation?.allowed;
    } catch (error) {
      console.error('Action validation failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const vincentAuth = new VincentAuthService();

// Export types for TypeScript users
export type { VincentAuthState };
export default vincentAuth;
