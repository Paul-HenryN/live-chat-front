"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "../sidebar/sidebar";
import { useActiveConversationId } from "@/hooks/useActiveConversationId";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MESSAGE_MUTATION, GET_MESSAGES_QUERY } from "@/services/messages";
import { io } from "socket.io-client";

export function ChatMessagesList() {
  const activeConversationId = useActiveConversationId();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL!);

    socket.on("connect", () => {
      console.log("socket.id");
    });

    socket.on(activeConversationId!, (message) => {
      console.log("message", message);
    });
  }, []);

  const { data, error, loading } = useQuery(GET_MESSAGES_QUERY, {
    variables: {
      getMessagesInput: {
        conversationId: activeConversationId!,
      },
    },
  });

  const [addMessage] = useMutation(ADD_MESSAGE_MUTATION);

  const handleSendMessage = async (newMessage: Message) => {
    await addMessage({
      variables: {
        newMessageData: {
          content: newMessage.content,
          conversationId: activeConversationId!,
        },
      },
    });
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full max-h-full flex flex-col">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
          <AnimatePresence>
            {data &&
              data.getMessages.map((message, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: "spring",
                      bounce: 0.3,
                      duration: data.getMessages.indexOf(message) * 0.05 + 0.2,
                    },
                  }}
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  className={cn(
                    "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                    message.sender.id === currentUser!.id
                      ? "items-end"
                      : "items-start"
                  )}
                >
                  <div className="flex gap-3 items-center">
                    <span
                      className={cn(
                        "bg-accent p-3 rounded-md max-w-xs font-medium",
                        message.sender.id === currentUser!.id &&
                          "bg-[#494abc] text-white"
                      )}
                    >
                      {message.content}
                    </span>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}

      <ChatBottombar onSendMessage={handleSendMessage} />
    </div>
  );
}
