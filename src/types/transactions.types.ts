interface TransactionDetails {
    amount: number
    gas_fee: number
    receiver_address: string
    sender_address: string
    status: string
    timestamp: number
    transaction_id: string
    type: string
}

interface Transaction {
    hash: string
    nonce: string
    previous_hash: string
    status: "pending" | "Completed"
    timestamp: number
    transaction: TransactionDetails
}

export type TransactionsReturnType = {
    transactions: Transaction[]
} 