import { useContext, createContext, useEffect } from "react";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  deleteUser as authDeleteUser,
} from "firebase/auth";
import { auth } from "../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
   const [loading, setLoading] = useState(true);

 const login = (email, password) => {
   return signInWithEmailAndPassword(auth,email, password);
 };

 const logout = () => {
   return auth.signOut();
 };

  const deleteUserFromAuth = (receptionist) => {
    return authDeleteUser(auth, receptionist);
  };
  

 const signup = (email, password) => {
   return createUserWithEmailAndPassword(auth,email, password);
 };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, deleteUser: deleteUserFromAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
