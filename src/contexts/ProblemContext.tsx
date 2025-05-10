
import React, { createContext, useContext, useState, useEffect } from 'react';
import { problemsAPI, streaksAPI } from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

type Difficulty = 'easy' | 'medium' | 'hard';
type Status = 'unsolved' | 'solved' | 'revisited';

type Problem = {
  id: number;
  userId: number;
  title: string;
  link: string;
  topic: string;
  difficulty: Difficulty;
  status: Status;
  createdAt: string;
  lastRevisedAt: string;
};

type ProblemContextType = {
  problems: Problem[];
  loading: boolean;
  error: string | null;
  addProblem: (problem: Omit<Problem, 'id' | 'userId' | 'createdAt' | 'lastRevisedAt'>) => Promise<void>;
  updateProblem: (id: number, problem: Partial<Problem>) => Promise<void>;
  deleteProblem: (id: number) => Promise<void>;
  getSimilarProblems: (id: number) => Promise<string[]>;
  refreshProblems: () => Promise<void>;
  stats: {
    total: number;
    solved: number;
    unsolved: number;
    revisited: number;
    byDifficulty: { easy: number; medium: number; hard: number };
    byTopic: Record<string, number>;
  };
};

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export const ProblemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate statistics
  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.status === 'solved').length,
    unsolved: problems.filter(p => p.status === 'unsolved').length,
    revisited: problems.filter(p => p.status === 'revisited').length,
    byDifficulty: {
      easy: problems.filter(p => p.difficulty === 'easy').length,
      medium: problems.filter(p => p.difficulty === 'medium').length,
      hard: problems.filter(p => p.difficulty === 'hard').length,
    },
    byTopic: problems.reduce((acc, problem) => {
      acc[problem.topic] = (acc[problem.topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const refreshProblems = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await problemsAPI.getAll(user.id);
      setProblems(response.data as Problem[]);
    } catch (err) {
      console.error('Error fetching problems:', err);
      setError('Failed to fetch problems');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProblems();
  }, [user]);

  const addProblem = async (problem: Omit<Problem, 'id' | 'userId' | 'createdAt' | 'lastRevisedAt'>) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const problemWithUserId = {
        ...problem,
        userId: user.id
      };
      
      await problemsAPI.create(problemWithUserId);
      toast.success('Problem added successfully!');
      
      // Update streak and refresh problems
      await streaksAPI.updateStreak(user.id);
      await refreshProblems();
    } catch (err) {
      console.error('Error adding problem:', err);
      toast.error('Failed to add problem');
    } finally {
      setLoading(false);
    }
  };

  const updateProblem = async (id: number, problem: Partial<Problem>) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      await problemsAPI.update(id, problem);
      toast.success('Problem updated successfully!');
      
      // Update streak and refresh problems
      await streaksAPI.updateStreak(user.id);
      await refreshProblems();
    } catch (err) {
      console.error('Error updating problem:', err);
      toast.error('Failed to update problem');
    } finally {
      setLoading(false);
    }
  };

  const deleteProblem = async (id: number) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      await problemsAPI.delete(id);
      toast.success('Problem deleted successfully!');
      await refreshProblems();
    } catch (err) {
      console.error('Error deleting problem:', err);
      toast.error('Failed to delete problem');
    } finally {
      setLoading(false);
    }
  };

  const getSimilarProblems = async (id: number): Promise<string[]> => {
    try {
      const response = await problemsAPI.getSimilar(id);
      return response.data as string[];
    } catch (err) {
      console.error('Error fetching similar problems:', err);
      toast.error('Failed to fetch similar problems');
      return [];
    }
  };

  return (
    <ProblemContext.Provider
      value={{
        problems,
        loading,
        error,
        addProblem,
        updateProblem,
        deleteProblem,
        getSimilarProblems,
        refreshProblems,
        stats,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblems = () => {
  const context = useContext(ProblemContext);
  if (context === undefined) {
    throw new Error('useProblems must be used within a ProblemProvider');
  }
  return context;
};
