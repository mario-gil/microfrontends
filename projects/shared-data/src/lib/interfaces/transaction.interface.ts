export interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category?: string;
  recipient?: string;
  account?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  accountNumber: string;
}
