

import React, { useState, useEffect } from 'react';
import { 
  DialogTitle, 
  DialogDescription, 
  DialogHeader, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Pencil, Trash2, Calendar, Clock, FileText, ArrowUpRight } from 'lucide-react';
import { useProblems } from '@/contexts/ProblemContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProblemDetailProps {
  problem: any;
  onEdit: () => void;
  onDelete: () => void;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, onEdit, onDelete }) => {
  const { getSimilarProblems } = useProblems();
  const [similarProblems, setSimilarProblems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // State to track active tab

  useEffect(() => {
    const fetchSimilarProblems = async () => {
      try {
        setLoading(true);
        const problems = await getSimilarProblems(problem.id);
        setSimilarProblems(problems);
      } catch (error) {
        console.error('Error fetching similar problems:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSimilarProblems();
  }, [problem.id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const parseSimilarProblems = (problems: string[]) => {
    if (!problems || problems.length === 0) return [];

    const lines = problems[0].split('\n');

    return lines.map((problem, index) => {
      const markdownRegex = /\[(.*?)\]\((.*?)\)/;
      const match = problem.match(markdownRegex);

      if (match) {
        const title = match[1];
        const url = match[2];

        return (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-2 flex items-center justify-between border border-gray-700 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
          >
            <span className="font-medium text-gray-200">{title}</span>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Problem
              </Button>
            </a>
          </motion.li>
        );
      }

      return <li key={index} className="mb-2 text-gray-400">{problem}</li>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 90, scale: 0.9 }}
      animate={{ opacity: 1, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-900 rounded-xl p-6 shadow-2xl transform perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between text-2xl font-bold text-white">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {problem.title}
          </motion.span>
          <div className="flex space-x-2">
            <Badge 
              className={cn(
                problem.difficulty === 'easy' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : problem.difficulty === 'medium' 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                'px-3 py-1 rounded-full shadow-md'
              )}
            >
              {problem.difficulty}
            </Badge>
            <Badge 
              className={cn(
                problem.status === 'solved' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : problem.status === 'unsolved' 
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                'px-3 py-1 rounded-full shadow-md'
              )}
            >
              {problem.status}
            </Badge>
          </div>
        </DialogTitle>
        <DialogDescription className="text-gray-400 mt-2">
          Topic: {problem.topic}
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-6">
        <Tabs defaultValue="details" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-xl p-1">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 rounded-lg transition-all duration-300"
            >
              Details
            </TabsTrigger>
            <TabsTrigger 
              value="similar" 
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 rounded-lg transition-all duration-300"
            >
              Similar Problems
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <TabsContent 
              key={activeTab} 
              value="details" 
              className="py-4 space-y-4 text-gray-300"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  <p className="text-sm flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    Added on
                  </p>
                  <p className="font-medium">
                    {formatDate(problem.createdAt)}
                    <span className="ml-2 text-sm text-gray-500">
                      {formatTime(problem.createdAt)}
                    </span>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    Last revised
                  </p>
                  <p className="font-medium">
                    {problem.lastRevisedAt ? (
                      <>
                        {formatDate(problem.lastRevisedAt)}
                        <span className="ml-2 text-sm text-gray-500">
                          {formatTime(problem.lastRevisedAt)}
                        </span>
                      </>
                    ) : (
                      'Not revised yet'
                    )}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-2"
              >
                <p className="text-sm flex items-center text-gray-400">
                  <FileText className="h-4 w-4 mr-2" />
                  Problem Link
                </p>
                <a 
                  href={problem.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{problem.link}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            </TabsContent>

            <TabsContent 
              key={activeTab} 
              value="similar" 
              className="py-4 text-gray-300"
            >
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-40 flex items-center justify-center"
                >
                  <p className="text-gray-400 animate-pulse">Loading similar problems...</p>
                </motion.div>
              ) : similarProblems.length > 0 ? (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2 pl-4"
                >
                  {parseSimilarProblems(similarProblems)}
                </motion.ul>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-40 flex items-center justify-center"
                >
                  <p className="text-gray-400">No similar problems found</p>
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
      
      <DialogFooter className="flex items-center justify-between mt-6">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </motion.div>
        
        <div className="flex space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button
              variant="outline"
              asChild
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <a href={problem.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Problem
              </a>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button
              onClick={onEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </motion.div>
        </div>
      </DialogFooter>
    </motion.div>
  );
};

export default ProblemDetail;