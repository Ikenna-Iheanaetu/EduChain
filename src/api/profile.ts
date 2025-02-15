import api from "@/config/axios";
import { UserReturnType } from "@/types/user.types";

export const profileApi = {
  getProfile: async () => {
    const { data } = await api.get<UserReturnType>("/profile");
    return data.user;
  },
};
