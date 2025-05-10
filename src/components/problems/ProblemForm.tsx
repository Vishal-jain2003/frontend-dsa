
// import React, { useState } from 'react';
// import { useProblems } from '@/contexts/ProblemContext';
// import { 
//   DialogTitle, 
//   DialogDescription, 
//   DialogHeader, 
//   DialogFooter 
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select';
// import { toast } from 'sonner';

// type ProblemFormProps = {
//   problem?: any;
//   onSuccess?: () => void;
// };

// const ProblemForm: React.FC<ProblemFormProps> = ({ problem, onSuccess }) => {
//   const { addProblem, updateProblem } = useProblems();
  
//   // Form state
//   const [title, setTitle] = useState(problem?.title || '');
//   const [link, setLink] = useState(problem?.link || '');
//   const [topic, setTopic] = useState(problem?.topic || '');
//   const [difficulty, setDifficulty] = useState(problem?.difficulty || 'medium');
//   const [status, setStatus] = useState(problem?.status || 'unsolved');
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const isEdit = !!problem;

//   const validateForm = (): boolean => {
//     if (!title.trim()) {
//       toast.error('Please enter a problem title');
//       return false;
//     }

//     if (!link.trim()) {
//       toast.error('Please enter a problem link');
//       return false;
//     }

//     if (!topic.trim()) {
//       toast.error('Please enter a problem topic');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       if (isEdit) {
//         await updateProblem(problem.id, {
//           title,
//           link,
//           topic,
//           difficulty,
//           status,
//         });
//         toast.success('Problem updated successfully!');
//       } else {
//         await addProblem({
//           title,
//           link,
//           topic,
//           difficulty,
//           status,
//         });
//         toast.success('Problem added successfully!');
//       }
      
//       if (onSuccess) {
//         onSuccess();
//       }
//     } catch (error) {
//       console.error('Error submitting problem:', error);
//       toast.error(`Failed to ${isEdit ? 'update' : 'add'} problem`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <DialogHeader>
//         <DialogTitle>{isEdit ? 'Edit Problem' : 'Add New Problem'}</DialogTitle>
//         <DialogDescription>
//           {isEdit 
//             ? 'Update the details of your problem below.' 
//             : 'Add a new DSA problem to track your progress.'
//           }
//         </DialogDescription>
//       </DialogHeader>
      
//       <div className="grid gap-4 py-4">
//         <div className="space-y-2">
//           <Label htmlFor="title">Problem Title</Label>
//           <Input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g., Two Sum, Merge Intervals"
//             disabled={isSubmitting}
//           />
//         </div>
        
//         <div className="space-y-2">
//           <Label htmlFor="link">Problem Link</Label>
//           <Input
//             id="link"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             placeholder="e.g., https://leetcode.com/problems/two-sum"
//             disabled={isSubmitting}
//           />
//         </div>
        
//         <div className="space-y-2">
//           <Label htmlFor="topic">Topic</Label>
//           <Input
//             id="topic"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             placeholder="e.g., Arrays, Linked Lists, Dynamic Programming"
//             disabled={isSubmitting}
//           />
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="difficulty">Difficulty</Label>
//             <Select 
//               value={difficulty} 
//               onValueChange={setDifficulty}
//               disabled={isSubmitting}
//             >
//               <SelectTrigger id="difficulty">
//                 <SelectValue placeholder="Select difficulty" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="easy">Easy</SelectItem>
//                 <SelectItem value="medium">Medium</SelectItem>
//                 <SelectItem value="hard">Hard</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="status">Status</Label>
//             <Select 
//               value={status} 
//               onValueChange={setStatus}
//               disabled={isSubmitting}
//             >
//               <SelectTrigger id="status">
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="unsolved">Unsolved</SelectItem>
//                 <SelectItem value="solved">Solved</SelectItem>
//                 <SelectItem value="revisited">Revisited</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>
      
//       <DialogFooter>
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Problem'}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default ProblemForm;


import React, { useState } from 'react';
import { useProblems } from '@/contexts/ProblemContext';
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type ProblemFormProps = {
  problem?: any;
  onSuccess?: () => void;
};

const ProblemForm: React.FC<ProblemFormProps> = ({ problem, onSuccess }) => {
  const { addProblem, updateProblem } = useProblems();
  const [title, setTitle] = useState(problem?.title || '');
  const [link, setLink] = useState(problem?.link || '');
  const [topic, setTopic] = useState(problem?.topic || '');
  const [difficulty, setDifficulty] = useState(problem?.difficulty || 'medium');
  const [status, setStatus] = useState(problem?.status || 'unsolved');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = !!problem;

  const validateForm = (): boolean => {
    if (!title.trim()) { toast.error('Problem title is required'); return false; }
    if (!link.trim()) { toast.error('Problem link is required'); return false; }
    if (!topic.trim()) { toast.error('Problem topic is required'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = { title, link, topic, difficulty, status };
      isEdit
        ? await updateProblem(problem.id, payload)
        : await addProblem(payload);
      toast.success(`Problem ${isEdit ? 'updated' : 'added'} successfully!`);
      onSuccess?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to ${isEdit ? 'update' : 'add'} problem`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle(problem?.title || '');
    setLink(problem?.link || '');
    setTopic(problem?.topic || '');
    setDifficulty(problem?.difficulty || 'medium');
    setStatus(problem?.status || 'unsolved');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {isEdit ? 'Edit Problem' : 'New Problem'}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEdit ? 'Modify your problem details.' : 'Track a new DSA problem.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Two Sum"
              disabled={isSubmitting}
              className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <Label htmlFor="link" className="text-sm font-medium text-gray-700">Link</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g., https://leetcode.com/..."
              disabled={isSubmitting}
              className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium text-gray-700">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Arrays"
              disabled={isSubmitting}
              className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty} disabled={isSubmitting}>
                <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
              <Select value={status} onValueChange={setStatus} disabled={isSubmitting}>
                <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unsolved">Unsolved</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="revisited">Revisited</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={isSubmitting}
            className="border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogFooter>
      </form>
    </motion.div>
  );
};

export default ProblemForm;