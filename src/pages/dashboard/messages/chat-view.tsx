import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, Send } from "lucide-react";

interface ChatViewProps {
  selectedConversation: {
    id: string;
    name: string;
    lastMessage: string;
    avatar: string;
    timestamp: string;
  };
  messages: {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
    avatar: string;
    isSender: boolean;
  }[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  handleBack: () => void;
}

export default function ChatView({
  selectedConversation,
  messages,
  messageInput,
  setMessageInput,
  scrollAreaRef,
  handleBack,
}: ChatViewProps) {
  return (
    <div className="flex flex-col h-full">
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
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{selectedConversation.name}</span>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {(messages || []).map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.isSender ? "flex-row-reverse" : ""
              }`}
            >
              <img
                src={message.avatar || "/placeholder.svg"}
                alt=""
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div
                className={`rounded-lg p-3 max-w-[70%] ${
                  message.isSender ? "bg-[#6366F1] text-white" : "bg-gray-100"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs mt-1 block opacity-70">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="bg-[#6366F1] hover:bg-[#4F46E5]">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
