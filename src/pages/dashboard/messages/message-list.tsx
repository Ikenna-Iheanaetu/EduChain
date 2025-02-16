import { ScrollArea } from "@radix-ui/react-scroll-area";

type Conversation ={
    id: string;
    name: string;
    lastMessage: string;
    avatar: string;
    timestamp: string;
}

interface MessageListProps{
    conversations: Conversation[]
    selectedConversation: Conversation | null
    setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>
}

export default function MessageList({ conversations, selectedConversation, setSelectedConversation }: MessageListProps){
   return ( 
   <ScrollArea className="flex-1">
    {conversations.map((conversation) => (
      <button
        key={conversation.id}
        onClick={() => setSelectedConversation(conversation)}
        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
          selectedConversation?.id === conversation.id
            ? "bg-gray-50"
            : ""
        }`}
      >
        <img
          src={conversation.avatar || "/placeholder.svg"}
          alt=""
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0 text-left">
          <div className="flex justify-between items-start">
            <span className="font-medium truncate">
              {conversation.name}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              {conversation.timestamp}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">
            {conversation.lastMessage}
          </p>
        </div>
      </button>
    ))}
  </ScrollArea>
  )
}