"use client";
import { cn } from "@/lib/utils";
import React from "react";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { Message } from "../sidebar/sidebar";
import { useActiveConversationId } from "@/hooks/useActiveConversationId";
import { conversations } from "../../../dummy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

export function ChatMessagesList() {
  const activeConversationId = useActiveConversationId();
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: ["messages", activeConversationId],
    queryFn: () =>
      conversations.find(
        (conversation) => conversation.id === activeConversationId
      )?.messages,
  });

  const mutation = useMutation({
    mutationKey: ["addMessage", activeConversationId],
    mutationFn: async (newMessage: Message) => {
      conversations
        .find((conversation) => conversation.id === activeConversationId)
        ?.messages.push(newMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", activeConversationId],
      });
    },
  });

  const handleSendMessage = (newMessage: Message) => {
    mutation.mutate(newMessage);
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full max-h-full flex flex-col">
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <AnimatePresence>
          {messages &&
            messages.map((message, index) => (
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
                    duration: messages.indexOf(message) * 0.05 + 0.2,
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
      <ChatBottombar onSendMessage={handleSendMessage} />
    </div>
  );
}
