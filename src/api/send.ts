import api from "@/config/axios";

interface sendFundsProps {
  receiver_address: string;
  amount: number;
}

export const sendApi = {
  sendFunds: async (sendData: sendFundsProps) => {
    const { data } = await api.post("/send", sendData);
    return data;
  },
};
