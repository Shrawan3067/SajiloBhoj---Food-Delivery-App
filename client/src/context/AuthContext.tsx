import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: number | string;
  name: string;
  email?: string | null;
  phone?: string | null;
  token?: string;
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
    const savedUser = localStorage.getItem('swiggy_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (_) {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrPhone: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (password === 'demopassword') {
      const userData: User = {
        id: 1,
        name: 'Demo User',
        email: emailOrPhone.includes('@') ? emailOrPhone : null,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : null,
        token: 'demo_jwt_token_' + Date.now(),
      };

      setUser(userData);
      localStorage.setItem('swiggy_user', JSON.stringify(userData));
      return userData;
    }

    throw new Error('Invalid credentials');
  };

  const signup = async (name: string, emailOrPhone: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData: User = {
      id: Date.now(),
      name,
      email: emailOrPhone.includes('@') ? emailOrPhone : null,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : null,
      token: 'demo_jwt_token_' + Date.now(),
    };

    setUser(userData);
    localStorage.setItem('swiggy_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swiggy_user');
  };

  const value: AuthContextValue = { user, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
