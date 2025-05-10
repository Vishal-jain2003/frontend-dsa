// src/types/User.ts
export interface User {
  id:  number;
  username: string;
  email: string;
  imageUrl?: string;
  streakCount?: number;
  lastActiveDate?: string;
}
