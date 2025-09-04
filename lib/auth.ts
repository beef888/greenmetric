"use client";

// Assessment and Calculation interfaces
export interface Assessment {
  id: string;
  createdAt: string;
  updatedAt?: string;
  overall_score?: number;
  environmental_score?: number;
  social_score?: number;
  governance_score?: number;
  responses?: Record<string, any>;
  recommendations?: string[];
}

export interface Calculation {
  id: string;
  createdAt: string;
  total_emissions?: number;
  scope1_emissions?: number;
  scope2_emissions?: number;
  scope3_emissions?: number;
  company_info?: Record<string, any>;
  emission_sources?: Record<string, any>;
}

// Simple local authentication system
export interface User {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Local storage keys
const AUTH_STORAGE_KEY = 'greenmetric_auth';
const USER_DATA_KEY = 'greenmetric_user_data';

// Mock user database (in real app, this would be a proper database)
const mockUsers: Record<string, User & { password: string }> = {};

export class AuthService {
  static getAuthState(): AuthState {
    if (typeof window === 'undefined') {
      return { user: null, isAuthenticated: false };
    }

    try {
      const authData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        const user = JSON.parse(authData);
        return { user, isAuthenticated: true };
      }
    } catch (error) {
      console.error('Error reading auth state:', error);
    }

    return { user: null, isAuthenticated: false };
  }

  static async login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check mock users or create demo user
    const mockUser = mockUsers[email];
    
    if (!mockUser && email === 'demo@greenmetric.my' && password === 'demo123') {
      // Create demo user
      const demoUser: User = {
        id: 'demo-user-1',
        email: 'demo@greenmetric.my',
        fullName: 'Demo User',
        companyName: 'Demo Company Sdn Bhd',
        industry: 'Technology',
        companySize: 'SME',
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    }

    if (mockUser && mockUser.password === password) {
      const { password: _, ...user } = mockUser;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password' };
  }

  static async signup(userData: {
    email: string;
    password: string;
    fullName: string;
    companyName: string;
    industry: string;
    companySize: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers[userData.email]) {
      return { success: false, error: 'User already exists' };
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      fullName: userData.fullName,
      companyName: userData.companyName,
      industry: userData.industry,
      companySize: userData.companySize,
      createdAt: new Date().toISOString()
    };

    // Store in mock database
    mockUsers[userData.email] = { ...newUser, password: userData.password };

    // Store in localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    return { success: true, user: newUser };
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    window.location.href = '/';
  }

  static async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would send an email
    console.log(`Password reset email sent to: ${email}`);
    return { success: true };
  }

  static requireAuth(): User | null {
    const { user, isAuthenticated } = this.getAuthState();
    
    if (!isAuthenticated && typeof window !== 'undefined') {
      window.location.href = '/auth/login';
      return null;
    }

    return user;
  }
}

// Mock data storage for assessments and calculations
export class DataService {
  static saveAssessment(assessment: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>): Assessment {
    const assessments = this.getAssessments();
    const newAssessment: Assessment = {
      ...assessment,
      id: `assessment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    assessments.push(newAssessment);
    localStorage.setItem('greenmetric_assessments', JSON.stringify(assessments));
    return newAssessment;
  }

  static getAssessments(): Assessment[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem('greenmetric_assessments');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveCalculation(calculation: Omit<Calculation, 'id' | 'createdAt'>): Calculation {
    const calculations = this.getCalculations();
    const newCalculation: Calculation = {
      ...calculation,
      id: `calculation-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    calculations.push(newCalculation);
    localStorage.setItem('greenmetric_calculations', JSON.stringify(calculations));
    return newCalculation;
  }

  static getCalculations(): Calculation[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem('greenmetric_calculations');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}