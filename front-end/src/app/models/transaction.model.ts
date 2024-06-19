// transaction.model.ts
export interface Transaction {
  _id: string;
  user_id: string;
  copy_id: string;
  book_id: string;
  branch_id: string;
  checkout_date: Date;
  checkin_date: Date | null;
  late_fee: number;
  // Add other transaction-related fields as needed
}
