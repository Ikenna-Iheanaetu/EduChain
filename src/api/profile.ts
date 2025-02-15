import api from "@/config/axios";
import { UserReturnType } from "@/types/user.types";

interface newProfileData {
  avatar_number?: number;
  firstname?: string;
  lastname?: string;
}

export const profileApi = {
  getProfile: async () => {
    const { data } = await api.get<UserReturnType>("/profile");
    return data.user;
  },
  updateProfile: async (newProfileData: newProfileData) => {
    const { data } = await api.put("/profile", newProfileData);
    return data;
  },
};
