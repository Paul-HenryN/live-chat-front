import { LOGIN_MUTATION } from "@/services/auth";
import { useMutation } from "@apollo/client";
import { useAuth } from "./useAuth";

export function useLogin() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { setUser, setAccessToken } = useAuth();

  const signin = async (username: string, password: string) => {
    const { data } = await login({
      variables: { authInput: { username, password } },
    });

    setUser(data?.login.user);
    setAccessToken(data?.login.access_token);

    localStorage.setItem("user", JSON.stringify(data?.login.user));
    localStorage.setItem(
      "accessToken",
      JSON.stringify(data?.login.access_token)
    );
  };

  return { login: signin, loading };
}
