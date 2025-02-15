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
};
