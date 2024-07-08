import { ADD_USER_MUTATION } from "@/services/auth";
import { useMutation } from "@apollo/client";

export function useRegister() {
  const [addUser, { loading }] = useMutation(ADD_USER_MUTATION);

  const register = async (username: string, password: string) => {
    await addUser({
      variables: { newUserData: { username, password } },
    });
  };

  return { register, loading };
}
