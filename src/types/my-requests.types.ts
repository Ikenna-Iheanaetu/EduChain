interface MyRequests {
    course_name: string
    created_at: Date
    price: number
    requestid: string
    status: "pending" | "accepted" | "completed"
    tutor_name: string
}

export type MyRequestsReturnType = {
    requests: MyRequests[] 
}