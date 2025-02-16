import { useState } from "react"
import { Search, Menu, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardLayout from "@/pages/dashboard/dashboard-layout";
import Sidebar from "@/components/sidebar";

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  avatar: string
  isSender: boolean
}

interface Conversation {
  id: string
  name: string
  lastMessage: string
  avatar: string
  timestamp: string
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
]

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
]

export default function MessagesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageInput, setMessageInput] = useState("")

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

      <div className="flex flex-1 overflow-hidden">
        {/* Message List */}
        <div className="w-full md:w-80 border-r flex flex-col bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search messages" className="pl-9 h-10 bg-[#F8FAFC]" />
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                }`}
              >
                <img
                  src={conversation.avatar || "/placeholder.svg"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-start">
                    <span className="font-medium truncate">{conversation.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className="hidden md:flex flex-1 flex-col bg-white">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{selectedConversation.name}</span>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${message.isSender ? "flex-row-reverse" : ""}`}
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
                        <span className="text-xs mt-1 block opacity-70">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

