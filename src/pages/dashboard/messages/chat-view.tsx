import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { format } from "date-fns";
import { pickAnImage } from "@/lib/pick-image";
import { cn } from "@/lib/utils";

interface Message {
  content: string;
  created_at: string;
  is_read: boolean;
  messageid: string;
  receiverid: string;
  request_id: string;
  senderid: string;
}

interface ChatViewProps {
  selectedConversation: {
    id: string;
    name: string;
    lastMessage: string;
    avatar: string;
    timestamp: string;
  };
  messages: Message[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  handleBack: () => void;
  handleSendMessage?: () => void;
  currentUserId: string; // Add currentUserId to identify the current user
  currentUserAvatar: number; // Add currentUserAvatar to display the current user's avatar
}

export default function ChatView({
  selectedConversation,
  messages,
  messageInput,
  setMessageInput,
  handleBack,
  handleSendMessage,
  currentUserId,
  currentUserAvatar,
}: ChatViewProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-1"
            onClick={handleBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <img
            src={selectedConversation.avatar || "/placeholder.svg"}
            alt={`${selectedConversation.name} avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{selectedConversation.name}</span>
        </div>
      </div>

      {/* Message Display Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.messageid}
                className={`flex gap-2 ${
                  message.senderid === currentUserId
                    ? "justify-end" // Current user's message (right side)
                    : "justify-start" // Other user's message (left side)
                }`}
              >
                {/* Avatar for the other user (left side) */}
                {message.senderid !== currentUserId && (
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={`${selectedConversation.name} avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}

                {/* Message Bubble */}
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.senderid === currentUserId
                      ? "bg-[#6366F1] text-white" // Current user's message (blue)
                      : "bg-gray-100 text-gray-900" // Other user's message (gray)
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span
                    className={cn("text-xs block mt-1", {
                      "text-white": message.senderid === currentUserId, // Gray for current user
                      "text-gray-500": message.senderid !== currentUserId, // White for other user
                    })}
                  >
                    {format(new Date(message.created_at), "h:mm a")}
                  </span>
                </div>

                {/* Avatar for the current user (right side) */}
                {message.senderid === currentUserId && (
                  <img
                    src={pickAnImage(currentUserAvatar) || "/placeholder.svg"} // Use the current user's avatar
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 my-4">
              No messages yet. Send a message to start the conversation.
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && handleSendMessage) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            size="icon"
            className="bg-[#6366F1] hover:bg-[#4F46E5]"
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || !handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
