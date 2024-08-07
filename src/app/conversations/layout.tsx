import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar/sidebar";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

interface ChatLayoutProps
  extends Omit<React.ComponentProps<typeof ResizablePanelGroup>, "direction"> {}

export default function ChatLayout({
  className,
  children,
  ...rest
}: ChatLayoutProps) {
  return (
    <main className="grid grid-rows-[1fr_5fr] place-items-center min-h-screen pb-5">
      <div className="flex items-center justify-between w-full px-[5%]">
        <h1 className="text-3xl font-bold text-gradient">
          <Link href="#">Live Chat</Link>
        </h1>

        <LogoutButton />
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch border rounded-lg max-w-[90%]"
        {...rest}
      >
        <Sidebar defaultSize={30} collapsedSize={8} />

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={70} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
