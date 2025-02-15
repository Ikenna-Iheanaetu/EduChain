import { transactionsApi } from "@/api/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsApi.getTransactions,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
