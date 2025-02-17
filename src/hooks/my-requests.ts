import { myRequestsApi } from "@/api/my-requests";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
// import { useMine } from "./mine";

export const useCreateCourseRequest = () => {
  const queryClient = useQueryClient();
  // const mineMutation = useMine();

  return useMutation({
    mutationFn: myRequestsApi.createCourseRequest,

    onSuccess: async (data) => {
      console.log(data);

      try {
        // await mineMutation.mutateAsync();
        //* Invalidate and refetch the profile data
        queryClient.invalidateQueries({ queryKey: ["my-requests"] });
        toast.success("Request was made successfully");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Mining operation failed");
      }
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error || "Failed to make request.";

      toast.error(errorMessage);
    },
  });
};

export const useGetMyRequests = () => {
  return useQuery({
    queryKey: ["my-requests"], // This key is used for caching
    queryFn: myRequestsApi.getMyRequests,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry twice on failure
  });
};
