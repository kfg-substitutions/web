import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/router";

const AuthenticationContext = createContext({
  authenticationToken: "",
  login: (token: string) => {},
  logout: () => {},
});

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [authenticationToken, setAuthenticationToken] = useState("");

  let state = {
    authenticationToken: authenticationToken,
    login: (token: string) => login(token),
    logout: () => logout(),
  };

  const login = (token: string) => {
    setAuthenticationToken(token);
    localStorage.setItem("authToken", token);

    router.push("/dashboard");
  };

  const logout = () => {
    setAuthenticationToken("");
    localStorage.removeItem("authToken");

    router.push("/");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");

    if (localToken) setAuthenticationToken(localToken);
  }, []);

  return (
    <AuthenticationContext.Provider value={state}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
