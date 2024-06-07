"use client";
import SidebarHeader from "./sidebar-header";
import SidebarButton from "./sidebar-button";
import { cn } from "@/lib/utils";
import { ResizablePanel } from "../ui/resizable";
import React from "react";
import { conversations } from "../../../dummy";
import { useActiveConversationId } from "@/hooks/useActiveConversationId";

export type User = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  sender: User;
  receiver: User;
  content: string;
};

export type Conversation = {
  id: string;
  users: User[];
  messages: Message[];
};

interface SidebarProps
  extends Pick<
    React.ComponentProps<typeof ResizablePanel>,
    "defaultSize" | "collapsedSize"
  > {}

export function Sidebar({ defaultSize, collapsedSize }: SidebarProps) {
  const [isCollapsed, setCollapsed] = React.useState(false);
  const activeConversationId = useActiveConversationId();

  return (
    <ResizablePanel
      defaultSize={defaultSize}
      collapsedSize={collapsedSize}
      collapsible={true}
      minSize={24}
      maxSize={30}
      onCollapse={() => {
        setCollapsed(true);
      }}
      onExpand={() => {
        setCollapsed(false);
      }}
      className={cn(
        isCollapsed &&
          "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
      )}
    >
      <div
        data-collapsed={isCollapsed}
        className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
      >
        {!isCollapsed && (
          <SidebarHeader conversationsCount={conversations.length} />
        )}
        <div className="grid gap-5 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {conversations.map((conversation, index) => (
            <SidebarButton
              key={index}
              active={conversation.id === activeConversationId}
              collapsed={isCollapsed}
              conversation={conversation}
              href={`/conversations?id=${conversation.id}`}
            />
          ))}
        </div>
      </div>
    </ResizablePanel>
  );
}
