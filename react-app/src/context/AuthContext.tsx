import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize loading state

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setIsLoading(false); // Set loading to false after checking
    };
    checkAuth();
  }, []);

  const login = (token: string, refreshToken: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
