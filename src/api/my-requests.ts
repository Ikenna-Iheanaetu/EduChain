import api from "@/config/axios";
import { MyRequestsReturnType } from "@/types/my-requests.types";

export const myRequestsApi = {
  createCourseRequest: async (courseId: string) => {
    const { data } = await api.post(`/requests/course/${courseId}`);
    return data;
  },
  getMyRequests: async () => {
    const { data } = await api.get<MyRequestsReturnType>("/myrequests");
    return data.requests;
  },
  acceptRequest: async (requestId: string) => {
    const { data } = await api.post(`/requests/accept/${requestId}`);
    return data;
  },
  rejectRequest: async (requestId: string) => {
    const { data } = await api.post(`/requests/reject/${requestId}`);
    return data;
  },
  completeRequest: async (requestId: string) => {
    const { data } = await api.post(`/requests/complete/${requestId}`);
    return data;
  },
};
