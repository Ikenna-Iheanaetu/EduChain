import api from "@/config/axios";

export const topUpApi = {
  topUpAmount: async (topupCredentials: { amount: number }) => {
    const { data } = await api.post("/topup", topupCredentials);
    return data;
  },
};
