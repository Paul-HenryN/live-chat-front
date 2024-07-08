"use client";
import SidebarHeader from "./sidebar-header";
import SidebarButton from "./sidebar-button";
import { cn } from "@/lib/utils";
import { ResizablePanel } from "../ui/resizable";
import React, { useState } from "react";
import { useActiveConversationId } from "@/hooks/useActiveConversationId";
import { useQuery } from "@apollo/client";
import { GET_CONVERSATIONS_QUERY } from "@/services/conversations";
import { Conversation } from "@/gql/graphql";

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

interface SidebarProps
  extends Pick<
    React.ComponentProps<typeof ResizablePanel>,
    "defaultSize" | "collapsedSize"
  > {}

export function Sidebar({ defaultSize, collapsedSize }: SidebarProps) {
  const [isCollapsed, setCollapsed] = React.useState(false);
  const activeConversationId = useActiveConversationId();
  const { loading, error, data, refetch } = useQuery(GET_CONVERSATIONS_QUERY, {
    onError: (error) => {
      console.error(error);
    },
  });

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
          <SidebarHeader
            conversationsCount={data?.getConversations.length || 0}
            onCreateConversation={() => {
              refetch({});
            }}
            alreadyConversedWith={data?.getConversations.map(
              (conversation) => conversation.users[0].id
            )}
          />
        )}

        {loading ? (
          "loading..."
        ) : (
          <div className="grid gap-5 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {data?.getConversations.map((conversation, index) => (
              <SidebarButton
                key={index}
                active={conversation.id === activeConversationId}
                collapsed={isCollapsed}
                conversation={conversation}
                href={`/conversations?id=${conversation.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </ResizablePanel>
  );
}
