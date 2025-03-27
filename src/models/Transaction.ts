import { Reward } from "./Reward";

export interface Transaction {
  id: string;
  userId: string;
  merchantId: string;
  amount: number;
  timestamp: Date;
  reward: Reward | null
}
