import api from "@/config/axios";
import { MyOffersReturnType } from "@/types/my-offers.types";

export const myOffersApi = {
  getOffers: async () => {
    const { data } = await api.get<MyOffersReturnType>("/myoffers");
    return data.offers;
  },
  acceptOffer: async (requestId: string) => {
    const { data } = await api.post(`/requests/accept/${requestId}`);
    return data;
  },
  rejectOffer: async (requestId: string) => {
    const { data } = await api.post(`/requests/reject/${requestId}`);
    return data;
  },
  completeOffer: async (requestId: string) => {
    const { data } = await api.post(`/requests/complete/${requestId}`);
    return data;
  },
};
