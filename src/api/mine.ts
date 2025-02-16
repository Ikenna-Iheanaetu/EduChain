import api from "@/config/axios";

export const mineApi = {
  mineTheBlockchain: async () => {
    const { data } = await api.post("/mine");
    return data;
  },
};
