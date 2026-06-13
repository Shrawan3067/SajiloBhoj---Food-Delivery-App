import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

type User = {
  _id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  role?: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<User>;
  signup: (name: string, emailOrPhone: string, password: string) => Promise<User>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (_) {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrPhone: string, password: string) => {
    const response = await api.post('/auth/login', {
      emailOrPhone,
      password,
    });

    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const signup = async (name: string, emailOrPhone: string, password: string) => {
    const response = await api.post('/auth/register', {
      name,
      email: emailOrPhone.includes('@') ? emailOrPhone : null,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : null,
      password,
    });

    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextValue = { user, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
