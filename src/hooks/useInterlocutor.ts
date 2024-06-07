import { Conversation } from "@/components/sidebar/sidebar";
import { useAuth } from "./useAuth";

export function useInterlocutor(conversation: Conversation) {
  const { user: currentUser } = useAuth();

  if (!currentUser) {
    return undefined;
  }

  return conversation.users.find((user) => user.id !== currentUser.id);
}
