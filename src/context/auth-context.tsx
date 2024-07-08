"use client";
import { User } from "@/gql/graphql";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type AuthContextType = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  accessToken?: string;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
  setAccessToken: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
