import ChatHeader from "./chat-header";
import { ChatMessagesList } from "./chat-messages-list";
import React from "react";

export function Chat() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatHeader />

      <ChatMessagesList />
    </div>
  );
}
