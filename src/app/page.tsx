"use client";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    redirect("/login");
  }

  redirect("/conversations");
}
