import { courseApi } from "@/api/course";
import { CoursesProps } from "@/types/course.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: courseApi.createCourse,

    onSuccess: (data) => {
      console.log(data);
      toast.success("Course created successfully");
    },
    onError: (error: AxiosError<{ error?: string }>) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create account. Please try again.";

      console.log(errorMessage);
      toast.error(errorMessage || "Failed to create account");
    },
  });
};

export const useGetLatestCourses = () => {
  return useQuery<{ courses: CoursesProps[] }, AxiosError>({
    queryKey: ["latestCourses"],
    queryFn: courseApi.getLatestCourses,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useGetPoplarCourses = () => {
  return useQuery<{ courses: CoursesProps[] }, AxiosError>({
    queryKey: ["popluarCourses"],
    queryFn: courseApi.getPopularCourses,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
