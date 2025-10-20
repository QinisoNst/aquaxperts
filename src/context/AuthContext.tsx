import { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

interface AuthContextType {
  user: any; // You can define a more specific user type
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
