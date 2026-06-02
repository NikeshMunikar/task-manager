import { createContext, useContext, useState } from "react";
import { authApi } from "../api/auth.api";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login:(email:string, password:string)=>Promise<void>;
  logout: ()=>void;
}

const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = ({ children }: {children:React.ReactNode}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = Boolean(token); // can use !!token as well

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);

    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context){
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context;
}
