import { messagesApi } from "@/api/messages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useMine } from "./mine";

export const useGetMessageContacts = () => {
  return useQuery({
    queryKey: ["message-contacts"],
    queryFn: messagesApi.getMessageContacts,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useGetMessagesForContact = () => {
  return useQuery({
    queryKey: ["messages-for-contact"],
    queryFn: ({ queryKey }) => messagesApi.getMessagesForContact(queryKey[1]),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useSendMessage = () => {
  const mineMutation = useMine();

  return useMutation({
    mutationFn: messagesApi.sendMessage,

    onSuccess: async (data) => {
      console.log(data);

      try {
        await mineMutation.mutateAsync();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Mining operation failed");
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to send the message. Please try again.";

      toast.error(errorMessage);
    },
  });
};
