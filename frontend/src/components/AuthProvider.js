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
    // Logique de déconnexion ici
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
