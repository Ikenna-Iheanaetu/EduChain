"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";
import ChatView from "./chat-view";
import MessageList from "./message-list";
import { useGetMessageContacts } from "@/hooks/messages";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  avatar: string;
  isSender: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  timestamp: string;
}

// Mock data
const conversations: Conversation[] = [
  {
    id: "1",
    name: "Elmer Laverty",
    lastMessage: "Haha oh man 😅",
    avatar: "/placeholder.svg",
    timestamp: "12m",
  },
  {
    id: "2",
    name: "Florencio Dorrance",
    lastMessage: "woohoooo",
    avatar: "/placeholder.svg",
    timestamp: "24m",
  },
  {
    id: "3",
    name: "Lavern Laboy",
    lastMessage: "Haha that's terrifying 😅",
    avatar: "/placeholder.svg",
    timestamp: "1h",
  },
  // Add more conversations...
];

const messages: Message[] = [
  {
    id: "1",
    content: "omg, this is amazing",
    sender: "Florencio",
    timestamp: "12:30 PM",
    avatar: "/placeholder.svg",
    isSender: false,
  },
  {
    id: "2",
    content: "perfect! ✅",
    sender: "You",
    timestamp: "12:31 PM",
    avatar: "/placeholder.svg",
    isSender: true,
  },
  {
    id: "3",
    content: "Wow, this is really epic",
    sender: "Florencio",
    timestamp: "12:32 PM",
    avatar: "/placeholder.svg",
    isSender: false,
  },
  // Add more messages...
];

export default function Messages() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { data: contacts } = useGetMessageContacts()
  console.log(contacts)

  const handleBack = () => {
    setSelectedConversation(null);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 overflow-hidden bg-white">
        <div
          className={cn(
            "w-full md:w-80 border-r flex flex-col bg-white transition-transform duration-300 md:translate-x-0",
            selectedConversation
              ? "-translate-x-full md:translate-x-0"
              : "translate-x-0"
          )}
        >
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search messages"
                  className="pl-9 h-10 bg-[#F8FAFC]"
                />
              </div>
            </div>
          </div>

          {/* Message List */}
         <MessageList conversations={conversations} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
        </div>

        {/* Chat View */}
        <div
          className={cn(
            "absolute inset-0 md:relative md:flex flex-1 flex-col bg-white transition-transform duration-300 md:translate-x-0",
            selectedConversation
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          )}
        >
          {selectedConversation ? (
            <ChatView
              selectedConversation={selectedConversation}
              messages={messages}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
              scrollAreaRef={scrollAreaRef}
              handleBack={() => handleBack()}
            />
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
