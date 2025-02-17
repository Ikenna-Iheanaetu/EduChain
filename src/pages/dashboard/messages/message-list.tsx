import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { pickAnImage } from "@/lib/pick-image";
import { Contacts } from "@/types/messages.types";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  timestamp: string;
}

interface MessageListProps {
  contacts: Contacts[];
  selectContact: (requestId: string) => void;
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
}

export default function MessageList({
  contacts,
  selectContact,
  setSelectedConversation,
}: MessageListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleContactClick = (contact: Contacts) => {
    setSelectedId(contact.request_id);

    // Create a conversation object from the contact
    const conversation: Conversation = {
      id: contact.request_id,
      name: `${contact.firstname} ${contact.lastname}`,
      lastMessage: contact.course.course_name, // Use course name as a placeholder for the last message
      avatar: pickAnImage(contact.avatar_number) || "",
      timestamp: format(new Date(contact.course.creation_date), "PPpp"),
    };

    // Update the selected conversation
    setSelectedConversation(conversation);

    // Call the selectContact function to fetch messages
    selectContact(contact.request_id);
  };

  // Handle empty or loading state
  if (!contacts || contacts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-500">
        No contacts available
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="pr-3">
        {contacts.map((contact) => (
          <button
            key={contact.request_id}
            onClick={() => handleContactClick(contact)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
              selectedId === contact.request_id ? "bg-gray-50" : ""
            }`}
          >
            <img
              src={pickAnImage(contact.avatar_number)}
              alt={`${contact.firstname} ${contact.lastname}`}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-start">
                <span className="font-medium truncate">
                  {contact.firstname} {contact.lastname}
                </span>
                <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                  {format(new Date(contact.course.creation_date), "PPp")}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {contact.course.course_name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}