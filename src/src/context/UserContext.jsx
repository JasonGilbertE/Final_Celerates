import { Children, createContext, useContext, useState } from "react";

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ Children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => setLoggedIn(!isLoggedIn);
  const logout = () => setLoggedIn(!isLoggedIn);

  return <userContext.Provider value={{ isLoggedIn, login, logout }}>{Children}</userContext.Provider>;
};
