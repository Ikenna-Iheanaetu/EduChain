interface Course {
  color: string;
  course_name: string;
  courseid: string;
  creation_date: string;
  duration: number;
  max_requests: number;
  total_requests: number;
  tutor_id: string;
  tutor_name: string;
}

interface Student {
  avatar_number: number;
  firstname: string;
  lastname: string;
}

export interface Offers {
  complete_count: number;
  course: Course;
  courseid: string;
  created_at: string;
  requestid: string;
  status: "pending" | "accepted" | "completed";
  student: Student;
  studentid: string;
  tutorid: string;
}

export type MyOffersReturnType = {
  offers: Offers[];
};
