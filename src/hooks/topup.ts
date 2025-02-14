import { topUpApi } from "@/api/topup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useTopUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: topUpApi.topUpAmount,

    onSuccess: (data) => {
      console.log(data);
      toast.success("Top up was successful and is pending");

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
