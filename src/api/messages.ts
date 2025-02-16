import api from "@/config/axios";

interface SendMessageDataProps {
  receiver_id: string;
  content: string;
  request_id: string;
}

export const messagesApi = {
  getMessageContacts: async () => {
    const { data } = await api.get("/message-contacts");
    return data;
  },
  getMessagesForContact: async (requestId: string) => {
    const { data } = await api.get(`/messages/${requestId}`);
    return data;
  },
  sendMessage: async (sendMessageData: SendMessageDataProps) => {
    const { data } = await api.post("/message", sendMessageData);
    return data;
  },
};
