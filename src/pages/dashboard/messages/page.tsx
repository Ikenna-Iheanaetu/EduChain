import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";
import ChatView from "./chat-view";
import MessageList from "./message-list";
import { useGetMessageContacts, useSendMessage } from "@/hooks/messages";
import { messagesApi } from "@/api/messages";
import { toast } from "sonner";
import { pickAnImage } from "@/lib/pick-image";
import { format } from "date-fns";
import { useProfile } from "@/hooks/profile";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  timestamp: string;
}

interface Message {
  content: string;
  created_at: string;
  is_read: boolean;
  messageid: string;
  receiverid: string;
  request_id: string;
  senderid: string;
}

export default function Messages() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sendMessageMutation = useSendMessage();
  const { data: profile } = useProfile();

  const { data: contacts, isLoading: isLoadingContacts } =
    useGetMessageContacts();

  const handleSelectingContact = async (requestId: string) => {
    setIsLoading(true);

    try {
      const selectedContact = contacts?.find(
        (contact) => contact.request_id === requestId
      );

      if (selectedContact) {
        setSelectedConversation({
          id: requestId,
          name: `${selectedContact.firstname} ${selectedContact.lastname}`,
          lastMessage: "Loading...",
          avatar: pickAnImage(selectedContact.avatar_number) || "",
          timestamp: format(
            new Date(selectedContact.course.creation_date),
            "PPpp"
          ),
        });

        const messagesData = await messagesApi.getMessagesForContact(requestId);
        console.log(messagesData);
        setMessages(messagesData || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    try {
      const selectedContact = contacts?.find(
        (contact) => contact.request_id === selectedConversation.id
      );

      if (!selectedContact) {
        toast.error("Could not find contact information");
        return;
      }

      const messageData = {
        receiver_id: selectedContact.userid,
        content: messageInput,
        request_id: selectedConversation.id,
      };

      await sendMessageMutation.mutateAsync(messageData);
      setMessageInput("");

      const updatedMessages = await messagesApi.getMessagesForContact(
        selectedConversation.id
      );
      setMessages(updatedMessages || []);
    } catch (error) {
      console.error("Error in send message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleBack = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

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

          {isLoadingContacts ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <span className="text-gray-500">Loading contacts...</span>
            </div>
          ) : (
            <MessageList
              contacts={contacts || []}
              selectContact={handleSelectingContact}
              setSelectedConversation={setSelectedConversation}
            />
          )}
        </div>

        <div
          className={cn(
            "absolute inset-0 md:relative md:flex flex-1 flex-col bg-white transition-transform duration-300 md:translate-x-0",
            selectedConversation
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          )}
        >
          {selectedConversation ? (
            <>
              <ChatView
                selectedConversation={selectedConversation}
                messages={messages}
                messageInput={messageInput}
                setMessageInput={setMessageInput}
                handleBack={handleBack}
                handleSendMessage={handleSendMessage}
                currentUserId={profile?.userid || ''} // Pass the current user's ID
                currentUserAvatar={profile?.avatar_number || 1 } 
              />
              {isLoading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <span className="text-gray-500">Loading messages...</span>
                </div>
              )}
            </>
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
