import api from "@/config/axios";
import { GetContactListReturnType } from "@/types/messages.types";

interface SendMessageDataProps {
  receiver_id: string;
  content: string;
  request_id: string;
}

export const messagesApi = {
  getMessageContacts: async () => {
    const { data } = await api.get<GetContactListReturnType>("/message-contacts");
    return data.contacts;
  },
  getMessagesForContact: async (requestId: string) => {
    const { data } = await api.get(`/messages/${requestId}`);
    return data.messages;
  },
  sendMessage: async (sendMessageData: SendMessageDataProps) => {
    const { data } = await api.post("/message", sendMessageData);
    return data;
  },
};
