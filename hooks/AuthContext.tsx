import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface AuthContextProps {
  isLoggedIn: boolean;
  userDetails: { name: string; email: string } | null;
  login: (details: { name: string; email: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // Load login state and user details from storage
    const loadAuthState = async () => {
      const storedUserDetails = await AsyncStorage.getItem("userDetails");
      if (storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
        setIsLoggedIn(true);
      }
    };

    loadAuthState();
  }, []);

  const login = async (details: { name: string; email: string }) => {
    await AsyncStorage.setItem("userDetails", JSON.stringify(details));
    setUserDetails(details);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userDetails");
    setUserDetails(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
