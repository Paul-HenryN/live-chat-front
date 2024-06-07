import { useSearchParams } from "next/navigation";

export function useActiveConversationId() {
  const searchParams = useSearchParams();
  const activeConversationId = searchParams.get("id");

  return activeConversationId;
}
