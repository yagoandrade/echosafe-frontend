"use client";
import useReports from "@/app/hooks/reports";
import { useReportStore } from "@/app/hooks/reports/store";
import { auth } from "@/config/firebase";
import useTokenVerifier from "@/hooks/useTokenVerifier";
import { useCurrentReportStore } from "@/store/currentReport";
import { useCurrentUserStore } from "@/store/currentUser";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);
export interface IAuthContext {
  loading: boolean;
  user: User;
}

export function AuthContextProvider({
  children,
}: Readonly<AuthContextProviderProps>): JSX.Element {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { complaints } = useReportStore();
  const { setUserData } = useCurrentUserStore();
  const { setCurrentComplaint } = useCurrentReportStore();

  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  useTokenVerifier();
  useReports();
  const reportId =
    pathname === "/report" ? params.toString().substring(1) : null;

  useEffect(() => {
    if (
      (typeof window !== "undefined" &&
        localStorage.getItem("@user") &&
        pathname === "/") ||
      user
    ) {
      router.replace("/dashboard");
    }

    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setUserData(JSON.parse(localStorage.getItem("@user") ?? "{}"));
      } else {
        // User is signed out
        setUser(null);
      }
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Set loading to false if it takes more than 5 seconds
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  // useEffect(() => {
  //   if (reportId)
  //     setCurrentComplaint(
  //       complaints.filter((complaint) => complaint.id === reportId)[0]
  //     );
  // }, [complaints]);

  // Make video faster on loading screen
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3.0; // Set the video speed to 2x
    }
  }, []);

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, loading }), [user, loading])}
    >
      {loading && pathname !== "/" ? (
        <main className="flex h-screen w-full items-center justify-center bg-white">
          <video autoPlay muted ref={videoRef} className="loading-splash-logo">
            <source
              src="/assets/animation/animate_in_dark.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
