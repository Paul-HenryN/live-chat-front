"use client";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { logout } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Button onClick={handleLogout} variant="secondary">
      <LogOutIcon className="mr-2 h-5 w-5" />
      Logout
    </Button>
  );
}
