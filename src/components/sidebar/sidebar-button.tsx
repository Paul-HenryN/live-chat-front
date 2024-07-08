"use client";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Conversation } from "@/gql/graphql";
import { useInterlocutor } from "@/hooks/useInterlocutor";

interface SidebarButtonProps {
  collapsed: boolean;
  active: boolean;
  conversation: Conversation;
  href: string;
}

export default function SidebarButton({
  collapsed,
  active,
  conversation,
  href,
}: SidebarButtonProps) {
  const interlocutor = useInterlocutor(conversation);

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant={active ? "secondary" : "ghost"}
              className="h-12"
              asChild
            >
              <Link href={href}>
                <Avatar>
                  <AvatarImage
                    src="https://i.pravatar.cc/300"
                    alt={interlocutor?.username}
                  />
                </Avatar>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {interlocutor?.username}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="flex justify-start items-center gap-5 h-12"
      asChild
    >
      <Link href={href}>
        <Avatar>
          <AvatarImage
            src="https://i.pravatar.cc/300"
            alt={interlocutor?.username}
          />
        </Avatar>

        <p>{interlocutor?.username}</p>
      </Link>
    </Button>
  );
}
