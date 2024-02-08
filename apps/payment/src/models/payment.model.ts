export interface Payment {
  id?: string;
  user_id: string;
  order_id: string;
  method: string;
  status: string;
  amount: number;
  payment_date: string;
}