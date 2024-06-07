"use client";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Conversation } from "./sidebar";
import Link from "next/link";

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
  const interlocutor = conversation.users[1];

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
                    alt={interlocutor.name}
                  />
                </Avatar>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {interlocutor.name}
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
            alt={interlocutor.name}
          />
        </Avatar>

        <p>{interlocutor.name}</p>
      </Link>
    </Button>
  );
}
