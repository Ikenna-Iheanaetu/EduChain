import api from "@/config/axios";
import { MyOffersReturnType } from "@/types/my-offers.types";

export const myOffersApi = {
  getOffers: async () => {
    const { data } = await api.get<MyOffersReturnType>("/myoffers");
    return data.offers;
  },
};
