interface MyRequests {
    complete_count: number
    courseid: string
    created_at: string
    requestid: string
    role: string
    status: string
    studentid: string
    tutorid: string
}

export type MyRequestsReturnType = {
    requests: MyRequests[] 
}