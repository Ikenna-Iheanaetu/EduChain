import { sendApi } from "@/api/send";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useSend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendApi.sendFunds,

    onSuccess: () => {
      toast.success("Amount sent successfully");

      //* Invalidate and refetch the profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create account. Please try again.";

      console.log(errorMessage);
      toast.error(errorMessage || "Failed to create account");
    },
  });
};
