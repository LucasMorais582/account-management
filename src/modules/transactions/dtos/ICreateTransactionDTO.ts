enum TypesTransaction {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw"
}

export default interface ICreateTransactionDTO {
  account_id: string
  type: TypesTransaction
  value: number
}
