interface Course {
  color: string;
  course_name: string;
  courseid: string;
  creation_date: Date;
  duration: number;
  max_requests: number;
  price: number;
  total_requests: number;
  tutor_id: string;
  tutor_name: string;
}

export interface Contacts {
  avatar_number: number;
  course: Course;
  firstname: string;
  lastname: string;
  request_id: string;
  role: string;
  userid: string;
}

export type GetContactListReturnType = {
  contacts: Contacts[];
};
