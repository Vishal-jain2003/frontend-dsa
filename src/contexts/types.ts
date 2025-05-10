
export type User = {
  id: number;
  username: string;
  email: string;
  streakCount?: number;
  lastActiveDate?: string;
};

export type Problem = {
  id: number;
  userId: number;
  title: string;
  link: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'unsolved' | 'solved' | 'revisited';
  createdAt: string;
  lastRevisedAt: string;
};

export type Streak = {
  id: number;
  userId: number;
  date: string;
  count: number;
};
