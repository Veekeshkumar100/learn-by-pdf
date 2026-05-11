import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    return context;
  } catch (error) {
    console.error(error.responce || "failed to fetch");
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticat, setIsAuthenticat] = useState(false);
  const [lodding, setLodding] = useState(true);

  const checkAuthenticatUser = async () => {
    setLodding(true)
    try {
      const userStr = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (userStr && token) {
        setIsAuthenticat(true);
        setLodding(false);
        const userData = JSON.parse(userStr);
        setUser(userData);
      }
    } catch (error) {
      console.error("AUth cj=heck failed", error);
      logout();
    }finally{
      setLodding(false);
    }
  };
  useEffect(() => {
    checkAuthenticatUser();
  }, []);
  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setIsAuthenticat(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticat(false);
    setUser(null);
    window.location.href = "/";
  };
  const updataNewUser = (newUser) => {
    const newUserData = { ...user, newUser };
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const someValue = {
    user,
    login,
    logout,
    isAuthenticat,
    updataNewUser,

    lodding,
    setLodding,
  };

  return (
    <AuthContext.Provider value={someValue}>{children}</AuthContext.Provider>
  );
};
