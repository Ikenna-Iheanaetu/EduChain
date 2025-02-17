import { topUpApi } from "@/api/topup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
// import { useMine } from "./mine";

export const useTopUp = () => {
  const queryClient = useQueryClient();
  // const mineMutation = useMine();

  return useMutation({
    mutationFn: topUpApi.topUpAmount,

    onSuccess: async (data) => {
      console.log(data);

      try {
        // await mineMutation.mutateAsync();

        //* Invalidate and refetch the profile data
        queryClient.invalidateQueries({ queryKey: ["profile"] });

        toast.success("Top up was successful");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Mining operation failed");
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to process top-up. Please try again.";

      toast.error(errorMessage);
    },
  });
};
