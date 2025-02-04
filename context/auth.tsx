import { useRootNavigation, useRouter, useSegments } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

interface SignInResponse {
  data: Models.User<Models.Preferences> | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: object | undefined;
}

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<SignInResponse>;
  signUp: (e: string, p: string, n: string, r: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  user: Models.User<Models.Preferences> | null;
  authInitialized: boolean;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function Provider(props: ProviderProps) {
  const [user, setAuth] = useState<Models.User<Models.Preferences> | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  const useProtectedRoute = (user: Models.User<Models.Preferences> | null) => {
    const segments = useSegments();
    const router = useRouter();
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return () => unsubscribe && unsubscribe();
    }, [rootNavigation]);

    useEffect(() => {
      if (!isNavigationReady) return;

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      if (!user && !inAuthGroup) {
        router.push("/");
      } else if (user && inAuthGroup) {
        router.push("/");
      }
    }, [user, segments, isNavigationReady, router]);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/me"); // Fetch the current user
        const { data } = await response.json();

        if (data) {
          setAuth(data); // Set the authenticated user
        } else {
          setAuth(null); // No authenticated user
        }
      } catch (error) {
        setAuth(null); // Error fetching user
        console.log(error + "me error");
      } finally {
        setAuthInitialized(true); // Mark initialization as complete
      }
    })();
  }, []);

  const login = async (email: string, password: string): Promise<SignInResponse> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const { data, error } = await response.json();
      if (error) throw new Error(error);
      setAuth(data);
      return { data, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  const signup = async (
    email: string,
    password: string,
    username: string,
    role: string
  ): Promise<SignInResponse> => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, role }),
      });
      const { data, error } = await response.json();
      if (error) throw new Error(error);
      setAuth(data);
      return { data, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  const logout = async (): Promise<SignOutResponse> => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      const { data, error } = await response.json();
      if (error) throw new Error(error);
      setAuth(null);
      return { data, error: undefined };
    } catch (error) {
      return { error, data: undefined };
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: signup,
        user,
        authInitialized,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return authContext;
};