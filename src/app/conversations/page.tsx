import ChatHeader from "@/components/chat/chat-header";
import { ChatMessagesList } from "@/components/chat/chat-messages-list";
import React from "react";

export default function ConversationPages() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatHeader />

      <ChatMessagesList />
    </div>
  );
}
