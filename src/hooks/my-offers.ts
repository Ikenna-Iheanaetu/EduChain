import { myOffersApi } from "@/api/my-offers";
import { Offers } from "@/types/my-offers.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMine } from "./mine";
import { toast } from "sonner";

export const useGetMyOffers = () => {
  return useQuery<Offers[], AxiosError>({
    queryKey: ["my-offers"],
    queryFn: myOffersApi.getOffers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useAcceptOffers = () => {
  const queryClient = useQueryClient();
  const mineMutation = useMine();

  return useMutation({
    mutationFn: myOffersApi.acceptRequest,

    onSuccess: async (data) => {
      console.log(data);

      try {
        await mineMutation.mutateAsync();
        //* Invalidate and refetch the profile data
        queryClient.invalidateQueries({ queryKey: ["my-requests"] });
        toast.success("Request was accepted");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Mining operation failed");
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error || "Failed to accept request";

      toast.error(errorMessage);
    },
  });
};

export const useRejectOffers = () => {
  const queryClient = useQueryClient();
  const mineMutation = useMine();

  return useMutation({
    mutationFn: myOffersApi.rejectRequest,

    onSuccess: async (data) => {
      console.log(data);

      try {
        await mineMutation.mutateAsync();
        //* Invalidate and refetch the profile data
        queryClient.invalidateQueries({ queryKey: ["my-requests"] });
        toast.success("Request was rejected");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Mining operation failed");
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error || "Failed to reject request";

      toast.error(errorMessage);
    },
  });
};

export const useCompleteOffers = () => {
  const queryClient = useQueryClient();
  const mineMutation = useMine();

  return useMutation({
    mutationFn: myOffersApi.completeRequest,

    onSuccess: async (data) => {
      console.log(data);

      try {
        await mineMutation.mutateAsync();
        //* Invalidate and refetch the profile data
        queryClient.invalidateQueries({ queryKey: ["my-requests"] });
        toast.success("Request has been completed");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Mining operation failed");
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error || "Failed to complete request";

      toast.error(errorMessage);
    },
  });
};
