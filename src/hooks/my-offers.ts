import { myOffersApi } from "@/api/my-offers";
import { useQuery } from "@tanstack/react-query";

export const useGetMyOffers = () => {
  return useQuery({
    queryKey: ["my-offers"],
    queryFn: myOffersApi.getOffers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
