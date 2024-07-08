"use client";
import { useAuth } from "@/hooks/useAuth";
import { GET_USERS_QUERY } from "@/services/users";
import { useMutation, useQuery } from "@apollo/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ADD_CONVERSATION_MUTATION } from "@/services/conversations";
import { Conversation, User } from "@/gql/graphql";

export default function UsersList({
  onCreateConversation = () => {},
  alreadyConversedWith = [],
}: {
  onCreateConversation?: () => void;
  alreadyConversedWith?: User["id"][];
}) {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const { user: currentUser } = useAuth();

  const [addConversation] = useMutation(ADD_CONVERSATION_MUTATION);

  const handleAddConversation = async (interlocutorId: string) => {
    await addConversation({
      variables: {
        newConversationData: {
          interlocutorId,
        },
      },

      onCompleted: () => {
        onCreateConversation();
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="max-h-80 overflow-auto">
      {data!.getUsers
        .filter(
          (user) =>
            user.id !== currentUser?.id &&
            !alreadyConversedWith.includes(user.id)
        )
        .map((user) => (
          <li key={user.id} className="my-5 w-full">
            <Button
              variant="ghost"
              className="gap-5 justify-start w-full h-12"
              onClick={() => handleAddConversation(user.id)}
            >
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {user.username}
            </Button>
          </li>
        ))}
    </ul>
  );
}
