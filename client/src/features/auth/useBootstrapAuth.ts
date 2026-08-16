import { setApiTokenGetter } from "@/lib/api";
import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import { getMe, syncUser } from "./api";
import { useAuthStore } from "./store";

export function useBootstrapAuth() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { setLoading, setUser, clearAuth, setError } = useAuthStore();

  // Set up token getter
  useEffect(() => {
    setApiTokenGetter(async () => {
      try {
        // Fetch standard session token without template parameter
        const token = await getToken();
        if (token) return token;

        // Direct Clerk window session fallback
        if (typeof window !== "undefined" && (window as unknown as { Clerk?: { session?: { getToken: () => Promise<string | null> } } }).Clerk?.session) {
          const directToken = await (window as unknown as { Clerk: { session: { getToken: () => Promise<string | null> } } }).Clerk.session.getToken();
          if (directToken) return directToken;
        }

        return null;
      } catch (error) {
        console.error("Error getting token:", error);
        return null;
      }
    });
  }, [getToken]);

  // Sync user after auth is ready
  useEffect(() => {
    async function run() {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn) {
        clearAuth();
        return;
      }

      try {
        setLoading();
        const syncResult = await syncUser();
        if (syncResult?.user) {
          setUser(syncResult.user);
        } else {
          const me = await getMe();
          setUser(me?.user ?? null);
        }
      } catch (error) {
        const errMessage =
          error instanceof Error ? error.message : "Failed to load user";
        console.error("Auth sync error:", errMessage);
        setError(errMessage);
      }
    }

    void run();
  }, [isLoaded, isSignedIn, clearAuth, setError, setLoading, setUser]);
}

