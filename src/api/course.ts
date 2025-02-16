import api from "@/config/axios";

interface CreateCourseProps {
  course_name: string;
  price: number;
  duration: number;
  max_requests: number;
  color: string;
}

export const courseApi = {
  createCourse: async (createData: CreateCourseProps) => {
    const { data } = await api.post("/create/course", createData);
    return data;
  },
  getLatestCourses: async () => {
    const { data } = await api.get("/course/latest");
    return data;
  },
  getPopularCourses: async () => {
    const { data } = await api.get("/course/latest");
    return data;
  },
  deleteCourse: async (courseId: string) => {
    const { data } = await api.delete(`/course/${courseId}`)
    return data
  }
};
