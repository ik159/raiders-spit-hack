import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setuser] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const restoreUser = async () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/fetchMe`,
          {
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        console.log("user" ,res);
        if (res.data.success) {
          console.log("from 30");

          setuser(res.data.data);
          setLoading(false);
          navigate(`/profile`)
        }
        // } else {
        //   // CHANGE THIS
        //   alert("couldnt set category on login");
        // }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setLoading(false);
    
  };

  useEffect(() => {
    restoreUser();
  }, []);
   
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
      if(!res.data.success) return res.data;
      
      localStorage.setItem('auth-token', res.data.token);
      restoreUser();
      return res.data;
      
      
    } catch (err) {
        throw err;
    }
  };

  const logout = async () => {
    try {
      setuser(null);
      localStorage.removeItem('auth-token');
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user,
    logout,
    login,
    loading,
    open,
    setOpen
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
