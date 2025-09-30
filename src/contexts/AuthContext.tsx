import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('investe_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      const users = JSON.parse(localStorage.getItem('investe_users') || '[]');
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
        setUser(userData);
        localStorage.setItem('investe_user', JSON.stringify(userData));
        toast.success('Login realizado com sucesso!');
        return true;
      } else {
        toast.error('Email ou senha incorretos');
        return false;
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('investe_users') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        toast.error('Email já cadastrado');
        return false;
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        name,
      };

      users.push(newUser);
      localStorage.setItem('investe_users', JSON.stringify(users));

      const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(userData);
      localStorage.setItem('investe_user', JSON.stringify(userData));
      
      toast.success('Conta criada com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao criar conta');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('investe_user');
    toast.success('Logout realizado com sucesso');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
