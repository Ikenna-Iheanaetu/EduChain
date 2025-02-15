import api from "@/config/axios";
import { TransactionsReturnType } from "@/types/transactions.types";

export const transactionsApi = {
  getTransactions: async () => {
    const { data } = await api.get<TransactionsReturnType>("/transactions");
    return data.transactions;
  },
};
