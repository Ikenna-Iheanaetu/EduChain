export interface User {
    avatar_number: number
    created_time: Date
    email: string
    firstname: string
    lastname: string
    password?: string
    recovery_phrase: string
    userid: string
    wallet_address: string
    wallet_balance: number
}