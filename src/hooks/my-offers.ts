import { myOffersApi } from "@/api/my-offers";
import { Offers } from "@/types/my-offers.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetMyOffers = () => {
  return useQuery<Offers[], AxiosError>({
    queryKey: ["my-offers"],
    queryFn: myOffersApi.getOffers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
