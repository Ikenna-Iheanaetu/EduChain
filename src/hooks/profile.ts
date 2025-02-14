import { profileApi } from "@/api/profile";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useProfile = () => {
  return useQuery<User, AxiosError>({
    queryKey: ["profile"], // This key is used for caching
    queryFn: profileApi.getProfile,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry twice on failure
  });
};
