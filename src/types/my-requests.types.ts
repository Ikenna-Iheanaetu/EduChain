interface MyRequests {
    course_name: string
    created_at: Date
    price: number
    requestid: string
    status: "pending" | "rejected" | "completed" | "accepted"
    tutor_name: string
}

export type MyRequestsReturnType = {
    requests: MyRequests[] 
}