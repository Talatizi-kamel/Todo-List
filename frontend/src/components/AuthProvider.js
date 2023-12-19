import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { LoginUser } from "../api/user";

function AuthProvider({ children }) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);

  async function login(credentials) {
    const newuser = await LoginUser(credentials);
    setUser(newuser);
  }
  async function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setUser(null);
  }

  //console.log(initialUser);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
