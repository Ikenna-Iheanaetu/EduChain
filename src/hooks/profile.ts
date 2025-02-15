import { profileApi } from "@/api/profile";
import { User } from "@/types/user.types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useProfile = () => {
  return useQuery<User, AxiosError>({
    queryKey: ["profile"], // This key is used for caching
    queryFn: profileApi.getProfile,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry twice on failure
  });
};

export const useUpdateProfile = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: profileApi.updateProfile,

    onSuccess: (data) => {
      console.log(data);
      toast.success("Profile updated successfully");

      //* Invalidate and refetch the profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error || "Failed to update profile";

      toast.error(errorMessage);
    },
  });
};
