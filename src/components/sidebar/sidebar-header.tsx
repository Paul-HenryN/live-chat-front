import { MoreHorizontalIcon, SquarePenIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UsersList from "../users-list";
import { useState } from "react";
import { User } from "./sidebar";

interface SidebarHeaderProps {
  conversationsCount: number;
  onCreateConversation?: () => void;
  alreadyConversedWith?: User["id"][];
}

export default function SidebarHeader({
  conversationsCount,
  onCreateConversation = () => {},
  alreadyConversedWith = [],
}: SidebarHeaderProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex justify-between p-2 items-center">
      <div className="flex gap-2 items-center text-2xl">
        <p className="font-medium">Chats</p>
        <span className="text-zinc-300">({conversationsCount})</span>
      </div>

      <div>
        <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
          <Link href="#">
            <MoreHorizontalIcon size={20} />
          </Link>
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <SquarePenIcon size={20} />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a new conversation</DialogTitle>
              <DialogDescription>
                We are here to chat ! Start a new conversation with anyone by
                choosing a username in the list or search for someone.
              </DialogDescription>

              <UsersList
                onCreateConversation={() => {
                  onCreateConversation();
                  setDialogOpen(false);
                }}
                alreadyConversedWith={alreadyConversedWith}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
