import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { logoutUser, loginUser, registerUser } from "../services/auth.api.js";
import { getMe } from "../services/auth.api.js";

export const useAuth = () => {

  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (credentials) => {
    setLoading(true);

    try {
      const data = await loginUser(credentials);
      setUser(data.user);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);

    try {
      const data = await registerUser(userData);
      setUser(data.user);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {

  const getAndSetUser = async () => {
    try {
      const data = await getMe()
      setUser(data.user)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  getAndSetUser()

}, [])



  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout
  };
};