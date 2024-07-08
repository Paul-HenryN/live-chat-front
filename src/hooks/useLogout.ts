import { useAuth } from "./useAuth";

export function useLogout() {
  const { setUser, setAccessToken } = useAuth();

  const logout = () => {
    setUser(undefined);
    setAccessToken(undefined);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return { logout };
}
