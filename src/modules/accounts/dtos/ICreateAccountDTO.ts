export default interface ICreateAccountDTO {
  user_id: string
  account_type: string
  balance: number
  withdraw_limit: number
  flag_active: boolean
}
