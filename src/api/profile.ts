import api from "@/config/axios";
import { User } from "@/types/user";

export const profileApi = {
  getProfile: async () => {
    const { data } = await api.get<{ user: User }>("/profile");
    return data.user;
  },
};
