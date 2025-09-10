import { NextRequest, NextResponse } from 'next/server';
import { AuthResponse, LoginCredentials, RegisterData, SubscriptionTier } from '@/types/auth';

// Mock user data for development
const mockUser = {
  id: '1',
  username: 'demo_user',
  email: 'demo@example.com',
  fullName: 'Demo User',
  subscriptionTier: SubscriptionTier.Free,
  monthlyExportsUsed: 0,
  monthlyExportsLimit: 10,
  isActive: true,
  createdAt: new Date().toISOString(),
};

// Mock authentication - replace with real auth logic
const mockAuth = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simple mock validation
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      return {
        success: true,
        message: 'Login successful',
        data: {
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          user: mockUser,
        },
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials',
      errors: ['Invalid email or password'],
    };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Simple mock validation
    if (data.password !== data.confirmPassword) {
      return {
        success: false,
        message: 'Passwords do not match',
        errors: ['Passwords do not match'],
      };
    }

    if (!data.acceptTerms) {
      return {
        success: false,
        message: 'Terms must be accepted',
        errors: ['Terms must be accepted'],
      };
    }

    return {
      success: true,
      message: 'Registration successful',
      data: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        user: {
          ...mockUser,
          username: data.username,
          email: data.email,
          fullName: data.fullName,
        },
      },
    };
  },
};

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/').pop();

    switch (path) {
      case 'login': {
        const credentials: LoginCredentials = await request.json();
        const result = await mockAuth.login(credentials);
        return NextResponse.json(result);
      }

      case 'register': {
        const data: RegisterData = await request.json();
        const result = await mockAuth.register(data);
        return NextResponse.json(result);
      }

      case 'logout': {
        return NextResponse.json({
          success: true,
          message: 'Logout successful',
        });
      }

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid endpoint' },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/').pop();

    if (path === 'profile') {
      // Mock profile endpoint - in real app, validate token and return user data
      return NextResponse.json({
        success: true,
        data: mockUser,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid endpoint' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
