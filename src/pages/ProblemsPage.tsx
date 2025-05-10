
// import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
// import { useProblems } from '@/contexts/ProblemContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { 
//   PlusCircle, 
//   Search, 
//   Filter, 
//   Calendar, 
//   ArrowUpDown, 
//   ArrowUp, 
//   ArrowDown,
//   ExternalLink,
//   Pencil,
//   Trash2,
//   X
// } from 'lucide-react';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import ProblemForm from '@/components/problems/ProblemForm';
// import ProblemDetail from '@/components/problems/ProblemDetail';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuGroup, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu';
// import { toast } from 'sonner';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// const ProblemsPage: React.FC = () => {
//   const { problems, loading, deleteProblem } = useProblems();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
//   const [filterStatus, setFilterStatus] = useState<string | null>(null);
//   const [filterTopic, setFilterTopic] = useState<string | null>(null);
//   const [sortBy, setSortBy] = useState<string>('createdAt');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [selectedProblem, setSelectedProblem] = useState<any>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [problemToDelete, setProblemToDelete] = useState<number | null>(null);

//   // Get unique topics for filter
//   const uniqueTopics = Array.from(new Set(problems.map(p => p.topic))).filter(Boolean);

//   // Filter and sort problems
//   const filteredProblems = problems.filter(problem => {
//     const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDifficulty = !filterDifficulty || problem.difficulty === filterDifficulty;
//     const matchesStatus = !filterStatus || problem.status === filterStatus;
//     const matchesTopic = !filterTopic || problem.topic === filterTopic;
    
//     return matchesSearch && matchesDifficulty && matchesStatus && matchesTopic;
//   });

//   const sortedProblems = [...filteredProblems].sort((a, b) => {
//     let valueA = a[sortBy as keyof typeof a];
//     let valueB = b[sortBy as keyof typeof b];
    
//     // Handle date strings
//     if (typeof valueA === 'string' && (valueA.includes('-') || valueA.includes('T'))) {
//       valueA = new Date(valueA).getTime();
//     }
    
//     if (typeof valueB === 'string' && (valueB.includes('-') || valueB.includes('T'))) {
//       valueB = new Date(valueB).getTime();
//     }
    
//     if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
//     if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (column: string) => {
//     if (sortBy === column) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(column);
//       setSortOrder('asc');
//     }
//   };

//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterDifficulty(null);
//     setFilterStatus(null);
//     setFilterTopic(null);
//   };

//   const handleDeleteClick = (id: number) => {
//     setProblemToDelete(id);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (problemToDelete) {
//       try {
//         await deleteProblem(problemToDelete);
//         setDeleteDialogOpen(false);
//         setProblemToDelete(null);
//         toast.success('Problem deleted successfully');
//         setSelectedProblem(null);
//       } catch (error) {
//         console.error('Error deleting problem:', error);
//         toast.error('Failed to delete problem');
//       }
//     }
//   };

//   return (
//     <Layout requireAuth={true}>
//       <div className="container mx-auto px-6 py-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Your Problems</h1>
          
//           <div className="flex items-center space-x-3">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button>
//                   <PlusCircle className="mr-2 h-4 w-4" />
//                   Add Problem
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <ProblemForm />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="mb-6 space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search problems by title or topic..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
            
//             <div className="flex space-x-3">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="w-full md:w-auto">
//                     <Filter className="mr-2 h-4 w-4" />
//                     Filter
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-60">
//                   <DropdownMenuGroup>
//                     <div className="p-2">
//                       <h4 className="mb-2 text-sm font-semibold">Difficulty</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {['easy', 'medium', 'hard'].map(difficulty => (
//                           <Button
//                             key={difficulty}
//                             variant={filterDifficulty === difficulty ? "default" : "outline"}
//                             size="sm"
//                             onClick={() => setFilterDifficulty(
//                               filterDifficulty === difficulty ? null : difficulty
//                             )}
//                             className="text-xs h-7"
//                           >
//                             {difficulty}
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
                    
//                     <div className="p-2 border-t">
//                       <h4 className="mb-2 text-sm font-semibold">Status</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {['unsolved', 'solved', 'revisited'].map(status => (
//                           <Button
//                             key={status}
//                             variant={filterStatus === status ? "default" : "outline"}
//                             size="sm"
//                             onClick={() => setFilterStatus(
//                               filterStatus === status ? null : status
//                             )}
//                             className="text-xs h-7"
//                           >
//                             {status}
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
                    
//                     {uniqueTopics.length > 0 && (
//                       <div className="p-2 border-t">
//                         <h4 className="mb-2 text-sm font-semibold">Topic</h4>
//                         <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
//                           {uniqueTopics.map(topic => (
//                             <Button
//                               key={topic}
//                               variant={filterTopic === topic ? "default" : "outline"}
//                               size="sm"
//                               onClick={() => setFilterTopic(
//                                 filterTopic === topic ? null : topic
//                               )}
//                               className="text-xs h-7"
//                             >
//                               {topic}
//                             </Button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="p-2 border-t pt-3">
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         className="w-full"
//                         onClick={resetFilters}
//                       >
//                         Clear Filters
//                       </Button>
//                     </div>
//                   </DropdownMenuGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
              
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="w-full md:w-auto">
//                     <ArrowUpDown className="mr-2 h-4 w-4" />
//                     Sort
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => handleSort('title')}>
//                     Title {sortBy === 'title' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('difficulty')}>
//                     Difficulty {sortBy === 'difficulty' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('topic')}>
//                     Topic {sortBy === 'topic' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('createdAt')}>
//                     Date Added {sortBy === 'createdAt' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('status')}>
//                     Status {sortBy === 'status' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
          
//           {/* Filter indicators */}
//           {(filterDifficulty || filterStatus || filterTopic || searchTerm) && (
//             <div className="flex flex-wrap gap-2">
//               {filterDifficulty && (
//                 <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
//                   Difficulty: {filterDifficulty}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1"
//                     onClick={() => setFilterDifficulty(null)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               {filterStatus && (
//                 <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
//                   Status: {filterStatus}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1"
//                     onClick={() => setFilterStatus(null)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               {filterTopic && (
//                 <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
//                   Topic: {filterTopic}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1"
//                     onClick={() => setFilterTopic(null)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               {searchTerm && (
//                 <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
//                   Search: {searchTerm}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1"
//                     onClick={() => setSearchTerm('')}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-xs h-6"
//                 onClick={resetFilters}
//               >
//                 Clear All
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Problem list */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <div className="animate-pulse">Loading problems...</div>
//           </div>
//         ) : sortedProblems.length > 0 ? (
//           <div className="rounded-lg border overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-muted/50">
//                   <tr>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-primary transition-colors"
//                         onClick={() => handleSort('title')}
//                       >
//                         Title
//                         {sortBy === 'title' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-primary transition-colors"
//                         onClick={() => handleSort('topic')}
//                       >
//                         Topic
//                         {sortBy === 'topic' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-primary transition-colors"
//                         onClick={() => handleSort('difficulty')}
//                       >
//                         Difficulty
//                         {sortBy === 'difficulty' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-primary transition-colors"
//                         onClick={() => handleSort('status')}
//                       >
//                         Status
//                         {sortBy === 'status' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-primary transition-colors"
//                         onClick={() => handleSort('createdAt')}
//                       >
//                         <span className="hidden md:inline">Date Added</span>
//                         <span className="md:hidden">Date</span>
//                         {sortBy === 'createdAt' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-right p-4 text-sm font-medium">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {sortedProblems.map((problem) => (
//                     <tr 
//                       key={problem.id} 
//                       className="hover:bg-muted/30 cursor-pointer transition-colors"
//                       onClick={() => {
//                         setSelectedProblem(problem);
//                         setEditMode(false);
//                       }}
//                     >
//                       <td className="p-4">
//                         <div className="font-medium truncate max-w-[200px]">{problem.title}</div>
//                       </td>
//                       <td className="p-4">
//                         <div className="text-muted-foreground truncate max-w-[150px]">{problem.topic}</div>
//                       </td>
//                       <td className="p-4">
//                         <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium 
//                           ${problem.difficulty === 'easy' 
//                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
//                             : problem.difficulty === 'medium' 
//                             ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
//                             : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
//                         >
//                           {problem.difficulty}
//                         </span>
//                       </td>
//                       <td className="p-4">
//                         <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium 
//                           ${problem.status === 'solved' 
//                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
//                             : problem.status === 'unsolved' 
//                             ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
//                             : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}
//                         >
//                           {problem.status}
//                         </span>
//                       </td>
//                       <td className="p-4">
//                         <div className="text-muted-foreground">
//                           <Calendar className="inline-block h-3 w-3 mr-1" />
//                           {new Date(problem.createdAt).toLocaleDateString()}
//                         </div>
//                       </td>
//                       <td className="p-4 text-right">
//                         <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
//                           <Button 
//                             variant="ghost" 
//                             size="icon" 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               window.open(problem.link, '_blank');
//                             }}
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                           </Button>
//                           <Button 
//                             variant="ghost" 
//                             size="icon"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedProblem(problem);
//                               setEditMode(true);
//                             }}
//                           >
//                             <Pencil className="h-4 w-4" />
//                           </Button>
//                           <Button 
//                             variant="ghost" 
//                             size="icon"
//                             className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteClick(problem.id);
//                             }}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12 border rounded-lg">
//             <h3 className="text-lg font-medium mb-2">No problems found</h3>
//             <p className="text-muted-foreground mb-6">
//               {problems.length === 0 
//                 ? "You haven't added any problems yet." 
//                 : "No problems match your search or filters."
//               }
//             </p>
//             {problems.length === 0 ? (
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     Add Your First Problem
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <ProblemForm />
//                 </DialogContent>
//               </Dialog>
//             ) : (
//               <Button variant="outline" onClick={resetFilters}>
//                 Clear Filters
//               </Button>
//             )}
//           </div>
//         )}

//         {/* Problem Detail Dialog */}
//         {selectedProblem && (
//           <Dialog open={!!selectedProblem} onOpenChange={(open) => !open && setSelectedProblem(null)}>
//             <DialogContent className="sm:max-w-[600px]">
//               {editMode ? (
//                 <ProblemForm 
//                   problem={selectedProblem} 
//                   onSuccess={() => {
//                     setSelectedProblem(null);
//                     setEditMode(false);
//                   }}
//                 />
//               ) : (
//                 <ProblemDetail 
//                   problem={selectedProblem} 
//                   onEdit={() => setEditMode(true)}
//                   onDelete={() => handleDeleteClick(selectedProblem.id)}
//                 />
//               )}
//             </DialogContent>
//           </Dialog>
//         )}

//         {/* Delete Confirmation Dialog */}
//         <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete this problem from your account.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction 
//                 onClick={confirmDelete}
//                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </Layout>
//   );
// };

// export default ProblemsPage;

// import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
// import { useProblems } from '@/contexts/ProblemContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { 
//   PlusCircle, 
//   Search, 
//   Filter, 
//   ArrowUpDown, 
//   ArrowUp, 
//   ArrowDown,
//   ExternalLink,
//   Pencil,
//   Trash2,
//   X,
//   Check,
// } from 'lucide-react';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import ProblemForm from '@/components/problems/ProblemForm';
// import ProblemDetail from '@/components/problems/ProblemDetail';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuGroup, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { motion } from 'framer-motion';

// const parseSimilarProblems = (problems: string[]) => {
//   if (!problems || problems.length === 0) return [];

//   const lines = problems[0].split('\n');

//   return lines.map((problem, index) => {
//     const markdownRegex = /\[(.*?)\]\((.*?)\)/;
//     const match = problem.match(markdownRegex);

//     if (match) {
//       const title = match[1];
//       const url = match[2];

//       return (
//         <motion.li
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.1 }}
//           className="mb-2 flex items-center justify-between border border-gray-700 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
//         >
//           <span className="font-medium text-gray-200">{title}</span>
//           <a href={url} target="_blank" rel="noopener noreferrer">
//             <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
//               <ExternalLink className="h-3 w-3 mr-1" />
//               View Problem
//             </Button>
//           </a>
//         </motion.li>
//       );
//     }

//     return <li key={index} className="mb-2 text-gray-400">{problem}</li>;
//   });
// };

// const ProblemsPage: React.FC = () => {
//   const { problems, loading, updateProblem, deleteProblem, getSimilarProblems } = useProblems();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
//   const [filterStatus, setFilterStatus] = useState<string | null>(null);
//   const [filterTopic, setFilterTopic] = useState<string | null>(null);
//   const [sortBy, setSortBy] = useState<string>('title');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [selectedProblem, setSelectedProblem] = useState<any>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [problemToDelete, setProblemToDelete] = useState<number | null>(null);
//   const [similarDialogOpen, setSimilarDialogOpen] = useState<number | null>(null);
//   const [similarProblems, setSimilarProblems] = useState<string[]>([]);

//   // Get unique topics for filter
//   const uniqueTopics = Array.from(new Set(problems.map(p => p.topic))).filter(Boolean);

//   // Filter and sort problems
//   const filteredProblems = problems.filter(problem => {
//     const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDifficulty = !filterDifficulty || problem.difficulty === filterDifficulty;
//     const matchesStatus = !filterStatus || problem.status === filterStatus;
//     const matchesTopic = !filterTopic || problem.topic === filterTopic;
    
//     return matchesSearch && matchesDifficulty && matchesStatus && matchesTopic;
//   });

//   const sortedProblems = [...filteredProblems].sort((a, b) => {
//     let valueA = a[sortBy as keyof typeof a];
//     let valueB = b[sortBy as keyof typeof b];
    
//     if (typeof valueA === 'string') valueA = valueA.toLowerCase();
//     if (typeof valueB === 'string') valueB = valueB.toLowerCase();
    
//     if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
//     if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (column: string) => {
//     if (sortBy === column) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(column);
//       setSortOrder('asc');
//     }
//   };

//   const resetFilters = () => {
//     setSearchTerm('');
//     setFilterDifficulty(null);
//     setFilterStatus(null);
//     setFilterTopic(null);
//   };

//   const handleDeleteClick = (id: number) => {
//     setProblemToDelete(id);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (problemToDelete) {
//       try {
//         await deleteProblem(problemToDelete);
//         setDeleteDialogOpen(false);
//         setProblemToDelete(null);
//         setSelectedProblem(null);
//       } catch (error) {
//         console.error('Error deleting problem:', error);
//       }
//     }
//   };

//   const handleStatusChange = async (problemId: number, newStatus: string) => {
//     const problem = problems.find(p => p.id === problemId);
//     if (problem) {
//       try {
//         await updateProblem(problemId, { ...problem, status: newStatus });
//       } catch (error) {
//         console.error('Error updating status:', error);
//       }
//     }
//   };

//   const handleSimilarClick = async (problemId: number) => {
//     try {
//       const similar = await getSimilarProblems(problemId);
//       setSimilarProblems(similar);
//       setSimilarDialogOpen(problemId);
//     } catch (error) {
//       console.error('Error fetching similar problems:', error);
//     }
//   };

//   return (
//     <Layout requireAuth={true}>
//       <motion.div
//         initial={{ opacity: 0, rotateX: 90, scale: 0.9 }}
//         animate={{ opacity: 1, rotateX: 0, scale: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="container mx-auto px-6 py-8 bg-black text-gray-200 rounded-xl shadow-2xl"
//         style={{ transformStyle: 'preserve-3d' }}
//       >
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <motion.h1
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-2xl md:text-3xl font-bold mb-4 md:mb-0"
//           >
//             Your Problems
//           </motion.h1>
          
//           <div className="flex items-center space-x-3">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//                   <Button className="bg-blue-600 hover:bg-blue-700">
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     Add Problem
//                   </Button>
//                 </motion.div>
//               </DialogTrigger>
//               <DialogContent className="bg-black border-gray-800">
//                 <ProblemForm />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="mb-6 space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//               <Input
//                 placeholder="Search problems by title or topic..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 bg-gray-900 border-gray-800 text-gray-200"
//               />
//             </div>
            
//             <div className="flex space-x-3">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//                     <Button variant="outline" className="bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800">
//                       <Filter className="mr-2 h-4 w-4" />
//                       Filter
//                     </Button>
//                   </motion.div>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-60 bg-gray-900 border-gray-800">
//                   <DropdownMenuGroup>
//                     <div className="p-2">
//                       <h4 className="mb-2 text-sm font-semibold text-gray-200">Difficulty</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {['easy', 'medium', 'hard'].map(difficulty => (
//                           <Button
//                             key={difficulty}
//                             variant={filterDifficulty === difficulty ? "default" : "outline"}
//                             size="sm"
//                             onClick={() => setFilterDifficulty(filterDifficulty === difficulty ? null : difficulty)}
//                             className="text-xs h-7 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
//                           >
//                             {difficulty}
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
                    
//                     <div className="p-2 border-t border-gray-800">
//                       <h4 className="mb-2 text-sm font-semibold text-gray-200">Status</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {['unsolved', 'solved', 'revisited'].map(status => (
//                           <Button
//                             key={status}
//                             variant={filterStatus === status ? "default" : "outline"}
//                             size="sm"
//                             onClick={() => setFilterStatus(filterStatus === status ? null : status)}
//                             className="text-xs h-7 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
//                           >
//                             {status}
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
                    
//                     {uniqueTopics.length > 0 && (
//                       <div className="p-2 border-t border-gray-800">
//                         <h4 className="mb-2 text-sm font-semibold text-gray-200">Topic</h4>
//                         <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
//                           {uniqueTopics.map(topic => (
//                             <Button
//                               key={topic}
//                               variant={filterTopic === topic ? "default" : "outline"}
//                               size="sm"
//                               onClick={() => setFilterTopic(filterTopic === topic ? null : topic)}
//                               className="text-xs h-7 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
//                             >
//                               {topic}
//                             </Button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="p-2 border-t border-gray-800 pt-3">
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         className="w-full text-gray-200 hover:bg-gray-800"
//                         onClick={resetFilters}
//                       >
//                         Clear Filters
//                       </Button>
//                     </div>
//                   </DropdownMenuGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
              
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//                     <Button variant="outline" className="bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800">
//                       <ArrowUpDown className="mr-2 h-4 w-4" />
//                       Sort
//                     </Button>
//                   </motion.div>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
//                   <DropdownMenuItem onClick={() => handleSort('title')}>
//                     Title {sortBy === 'title' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('difficulty')}>
//                     Difficulty {sortBy === 'difficulty' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('topic')}>
//                     Topic {sortBy === 'topic' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => handleSort('status')}>
//                     Status {sortBy === 'status' && (
//                       sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                     )}
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
          
//           {(filterDifficulty || filterStatus || filterTopic || searchTerm) && (
//             <div className="flex flex-wrap gap-2">
//               {filterDifficulty && (
//                 <div className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full flex items-center">
//                   Difficulty: {filterDifficulty}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1 text-blue-400"
//                     onClick={() => setFilterDifficulty(null)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               {filterStatus && (
//                 <div className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full flex items-center">
//                   Status: {filterStatus}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1 text-blue-400"
//                     onClick={() => setFilterStatus(null)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               {filterTopic && (
//                 <div className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full flex items-center">
//                   Topic: {filterTopic}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1 text-blue-400"
//                     onClick={() => setFilterTopic(null)}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               {searchTerm && (
//                 <div className="bg-gray-800 text-blue-400 text-xs px-3 py-1 rounded-full flex items-center">
//                   Search: {searchTerm}
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     className="h-4 w-4 ml-1 text-blue-400"
//                     onClick={() => setSearchTerm('')}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               )}
              
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="text-blue-400 text-xs h-6 hover:bg-gray-800"
//                 onClick={resetFilters}
//               >
//                 Clear All
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Problem list */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <div className="animate-pulse text-gray-400">Loading problems...</div>
//           </div>
//         ) : sortedProblems.length > 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="rounded-lg border border-gray-800 overflow-hidden"
//           >
//             <div className="overflow-x-auto">
//               <table className="w-full text-gray-200">
//                 <thead className="bg-gray-900">
//                   <tr>
//                     <th className="text-left p-4 text-sm font-medium">Status</th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-blue-400 transition-colors"
//                         onClick={() => handleSort('title')}
//                       >
//                         Title
//                         {sortBy === 'title' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-blue-400 transition-colors"
//                         onClick={() => handleSort('topic')}
//                       >
//                         Topic
//                         {sortBy === 'topic' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-blue-400 transition-colors"
//                         onClick={() => handleSort('difficulty')}
//                       >
//                         Difficulty
//                         {sortBy === 'difficulty' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-left p-4 text-sm font-medium">
//                       <button 
//                         className="flex items-center hover:text-blue-400 transition-colors"
//                         onClick={() => handleSort('status')}
//                       >
//                         Status
//                         {sortBy === 'status' && (
//                           sortOrder === 'asc' ? <ArrowUp className="ml-2 h-3 w-3" /> : <ArrowDown className="ml-2 h-3 w-3" />
//                         )}
//                       </button>
//                     </th>
//                     <th className="text-right p-4 text-sm font-medium">Similar</th>
//                     <th className="text-right p-4 text-sm font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-800">
//                   {sortedProblems.map((problem) => (
//                     <motion.tr
//                       key={problem.id}
//                       initial={{ opacity: 0, rotateX: 90 }}
//                       animate={{ opacity: 1, rotateX: 0 }}
//                       transition={{ duration: 0.5 }}
//                       className="hover:bg-gray-800 transition-colors cursor-pointer"
//                       onClick={() => {
//                         setSelectedProblem(problem);
//                         setEditMode(false);
//                       }}
//                     >
//                       <td className="p-4">
//                         <label className="flex items-center space-x-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={problem.status === 'solved'}
//                             onChange={(e) => handleStatusChange(problem.id, e.target.checked ? 'solved' : 'unsolved')}
//                             className="hidden"
//                           />
//                           <div className={`w-5 h-5 rounded border ${problem.status === 'solved' ? 'bg-green-100 border-green-800 dark:bg-green-900 dark:border-green-300' : 'bg-gray-700 border-gray-700'}`}>
//                             {problem.status === 'solved' && <Check className="h-4 w-4 text-green-800 dark:text-green-300 ml-0.5" />}
//                           </div>
//                         </label>
//                       </td>
//                       <td className="p-4">
//                         <div className="font-medium truncate max-w-[200px]">{problem.title}</div>
//                       </td>
//                       <td className="p-4">
//                         <div className="text-gray-400 truncate max-w-[150px]">{problem.topic}</div>
//                       </td>
//                       <td className="p-4">
//                         <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium 
//                           ${problem.difficulty === 'easy' 
//                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
//                             : problem.difficulty === 'medium' 
//                             ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
//                             : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
//                         >
//                           {problem.difficulty}
//                         </span>
//                       </td>
//                       <td className="p-4">
//                         <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium 
//                           ${problem.status === 'solved' 
//                             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
//                             : problem.status === 'unsolved' 
//                             ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
//                             : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}
//                         >
//                           {problem.status}
//                         </span>
//                       </td>
//                       <td className="p-4 text-right">
//                         <Button 
//                           variant="ghost" 
//                           size="icon"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleSimilarClick(problem.id);
//                           }}
//                           className="text-gray-400 hover:text-blue-400"
//                         >
//                           <span className="sr-only">View Similar Problems</span>
//                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <line x1="12" y1="8" x2="12" y2="12"></line>
//                             <line x1="12" y1="16" x2="12" y2="16"></line>
//                           </svg>
//                         </Button>
//                       </td>
//                       <td className="p-4 text-right">
//                         <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
//                           <Button 
//                             variant="ghost" 
//                             size="icon" 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               window.open(problem.link, '_blank');
//                             }}
//                             className="text-gray-400 hover:text-blue-400"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                           </Button>
//                           <Button 
//                             variant="ghost" 
//                             size="icon"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedProblem(problem);
//                               setEditMode(true);
//                             }}
//                             className="text-gray-400 hover:text-blue-400"
//                           >
//                             <Pencil className="h-4 w-4" />
//                           </Button>
//                           <Button 
//                             variant="ghost" 
//                             size="icon"
//                             className="text-red-400 hover:text-red-600 hover:bg-red-900/30"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteClick(problem.id);
//                             }}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))
//                 }
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         ) : (
//           <div className="text-center py-12 border rounded-lg bg-gray-900">
//             <h3 className="text-lg font-medium mb-2 text-gray-200">No problems found</h3>
//             <p className="text-gray-400 mb-6">
//               {problems.length === 0 
//                 ? "You haven't added any problems yet." 
//                 : "No problems match your search or filters."
//               }
//             </p>
//             {problems.length === 0 ? (
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
//                     <Button className="bg-blue-600 hover:bg-blue-700">
//                       <PlusCircle className="mr-2 h-4 w-4" />
//                       Add Your First Problem
//                     </Button>
//                   </motion.div>
//                 </DialogTrigger>
//                 <DialogContent className="bg-black border-gray-800">
//                   <ProblemForm />
//                 </DialogContent>
//               </Dialog>
//             ) : (
//               <Button variant="outline" onClick={resetFilters} className="text-blue-400 hover:bg-gray-800">
//                 Clear Filters
//               </Button>
//             )}
//           </div>
//         )}

//         {/* Similar Problems Dialog */}
//         <Dialog open={similarDialogOpen !== null} onOpenChange={() => setSimilarDialogOpen(null)}>
//           <DialogContent className="bg-black border-gray-800 max-w-[500px]">
//             <h3 className="text-lg font-bold text-gray-200 mb-4">Similar Problems</h3>
//             <ul className="space-y-2">
//               {parseSimilarProblems(similarProblems)}
//             </ul>
//           </DialogContent>
//         </Dialog>

//         {/* Problem Detail Dialog */}
//         {selectedProblem && (
//           <Dialog open={!!selectedProblem} onOpenChange={(open) => !open && setSelectedProblem(null)}>
//             <DialogContent className="sm:max-w-[600px] bg-black border-gray-800">
//               {editMode ? (
//                 <ProblemForm 
//                   problem={selectedProblem} 
//                   onSuccess={() => {
//                     setSelectedProblem(null);
//                     setEditMode(false);
//                   }}
//                 />
//               ) : (
//                 <ProblemDetail 
//                   problem={selectedProblem} 
//                   onEdit={() => setEditMode(true)}
//                   onDelete={() => handleDeleteClick(selectedProblem.id)}
//                 />
//               )}
//             </DialogContent>
//           </Dialog>
//         )}

//         {/* Delete Confirmation Dialog */}
//         <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//           <AlertDialogContent className="bg-black border-gray-800">
//             <AlertDialogHeader>
//               <AlertDialogTitle className="text-gray-200">Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription className="text-gray-400">
//                 This action cannot be undone. This will permanently delete this problem from your account.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel className="bg-gray-800 text-gray-200 hover:bg-gray-700">Cancel</AlertDialogCancel>
//               <AlertDialogAction 
//                 onClick={confirmDelete}
//                 className="bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </motion.div>
//     </Layout>
//   );
// };

// export default ProblemsPage;


import React, { useState, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import { useProblems } from '@/contexts/ProblemContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  ExternalLink,
  Pencil,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ProblemForm from '@/components/problems/ProblemForm';
import ProblemDetail from '@/components/problems/ProblemDetail';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';

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
          <span className="font-medium text-gray-200 text-base">{title}</span>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white text-base">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Problem
            </Button>
          </a>
        </motion.li>
      );
    }

    return <li key={index} className="mb-2 text-gray-400 text-base">{problem}</li>;
  });
};

const ProblemsPage: React.FC = () => {
  const { problems, loading, updateProblem, deleteProblem, getSimilarProblems } = useProblems();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterTopic, setFilterTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<number | null>(null);
  const [similarDialogOpen, setSimilarDialogOpen] = useState<number | null>(null);
  const [similarProblems, setSimilarProblems] = useState<string[]>([]);

  // Get unique topics for filter
  const uniqueTopics = Array.from(new Set(problems.map(p => p.topic))).filter(Boolean);

  // Filter and sort problems
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !filterDifficulty || problem.difficulty === filterDifficulty;
    const matchesStatus = !filterStatus || problem.status === filterStatus;
    const matchesTopic = !filterTopic || problem.topic === filterTopic;
    
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTopic;
  });

  const sortedProblems = [...filteredProblems].sort((a, b) => {
    let valueA = a[sortBy as keyof typeof a];
    let valueB = b[sortBy as keyof typeof b];
    
    if (typeof valueA === 'string') valueA = valueA.toLowerCase();
    if (typeof valueB === 'string') valueB = valueB.toLowerCase();
    
    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterDifficulty(null);
    setFilterStatus(null);
    setFilterTopic(null);
  };

  const handleDeleteClick = (id: number) => {
    setProblemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (problemToDelete) {
      try {
        await deleteProblem(problemToDelete);
        setDeleteDialogOpen(false);
        setProblemToDelete(null);
        setSelectedProblem(null);
      } catch (error) {
        console.error('Error deleting problem:', error);
      }
    }
  };

  const handleStatusChange = useCallback(async (problemId: number, newStatus: string) => {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      try {
        await updateProblem(problemId, { ...problem, status: newStatus });
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  }, [problems, updateProblem]);

  const handleSimilarClick = async (problemId: number) => {
    try {
      const similar = await getSimilarProblems(problemId);
      setSimilarProblems(similar);
      setSimilarDialogOpen(problemId);
    } catch (error) {
      console.error('Error fetching similar problems:', error);
    }
  };

  return (
    <Layout requireAuth={true}>
      <motion.div
        initial={{ opacity: 0, rotateX: 90, scale: 0.9 }}
        animate={{ opacity: 1, rotateX: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container mx-auto px-6 py-8 bg-black text-gray-200 rounded-xl shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 md:mb-0"
          >
            Your Problems
          </motion.h1>
          
          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg">
                    <PlusCircle className="mr-2 h-6 w-6" />
                    Add Problem
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-black border-gray-800">
                <ProblemForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Search problems by title or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-gray-200 text-lg"
              />
            </div>
            
            <div className="flex space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Button variant="outline" className="bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800 text-lg">
                      <Filter className="mr-2 h-6 w-6" />
                      Filter
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 bg-gray-900 border-gray-800">
                  <DropdownMenuGroup>
                    <div className="p-2">
                      <h4 className="mb-2 text-base font-semibold text-gray-200">Difficulty</h4>
                      <div className="flex flex-wrap gap-2">
                        {['easy', 'medium', 'hard'].map(difficulty => (
                          <Button
                            key={difficulty}
                            variant={filterDifficulty === difficulty ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterDifficulty(filterDifficulty === difficulty ? null : difficulty)}
                            className="text-base h-9 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                          >
                            {difficulty}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-2 border-t border-gray-800">
                      <h4 className="mb-2 text-base font-semibold text-gray-200">Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {['unsolved', 'solved', 'revisited'].map(status => (
                          <Button
                            key={status}
                            variant={filterStatus === status ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilterStatus(filterStatus === status ? null : status)}
                            className="text-base h-9 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                          >
                            {status}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {uniqueTopics.length > 0 && (
                      <div className="p-2 border-t border-gray-800">
                        <h4 className="mb-2 text-base font-semibold text-gray-200">Topic</h4>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                          {uniqueTopics.map(topic => (
                            <Button
                              key={topic}
                              variant={filterTopic === topic ? "default" : "outline"}
                              size="sm"
                              onClick={() => setFilterTopic(filterTopic === topic ? null : topic)}
                              className="text-base h-9 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                            >
                              {topic}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-2 border-t border-gray-800 pt-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-gray-200 hover:bg-gray-800 text-base"
                        onClick={resetFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Button variant="outline" className="bg-gray-900 border-gray-800 text-gray-200 hover:bg-gray-800 text-lg">
                      <ArrowUpDown className="mr-2 h-6 w-6" />
                      Sort
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                  <DropdownMenuItem onClick={() => handleSort('title')} className="text-base">
                    Title {sortBy === 'title' && (
                      sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('difficulty')} className="text-base">
                    Difficulty {sortBy === 'difficulty' && (
                      sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('topic')} className="text-base">
                    Topic {sortBy === 'topic' && (
                      sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('status')} className="text-base">
                    Status {sortBy === 'status' && (
                      sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {(filterDifficulty || filterStatus || filterTopic || searchTerm) && (
            <div className="flex flex-wrap gap-2">
              {filterDifficulty && (
                <div className="bg-gray-800 text-blue-400 text-base px-3 py-1 rounded-full flex items-center">
                  Difficulty: {filterDifficulty}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 text-blue-400"
                    onClick={() => setFilterDifficulty(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {filterStatus && (
                <div className="bg-gray-800 text-blue-400 text-base px-3 py-1 rounded-full flex items-center">
                  Status: {filterStatus}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 text-blue-400"
                    onClick={() => setFilterStatus(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {filterTopic && (
                <div className="bg-gray-800 text-blue-400 text-base px-3 py-1 rounded-full flex items-center">
                  Topic: {filterTopic}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 text-blue-400"
                    onClick={() => setFilterTopic(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {searchTerm && (
                <div className="bg-gray-800 text-blue-400 text-base px-3 py-1 rounded-full flex items-center">
                  Search: {searchTerm}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 text-blue-400"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-400 text-base h-8 hover:bg-gray-800"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Problem list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-gray-400 text-lg">Loading problems...</div>
          </div>
        ) : sortedProblems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-gray-800 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-gray-200">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-4 text-base font-medium">Status</th>
                    <th className="text-left p-4 text-base font-medium">
                      <button 
                        className="flex items-center hover:text-blue-400 transition-colors"
                        onClick={() => handleSort('title')}
                      >
                        Title
                        {sortBy === 'title' && (
                          sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-base font-medium">
                      <button 
                        className="flex items-center hover:text-blue-400 transition-colors"
                        onClick={() => handleSort('topic')}
                      >
                        Topic
                        {sortBy === 'topic' && (
                          sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-base font-medium">
                      <button 
                        className="flex items-center hover:text-blue-400 transition-colors"
                        onClick={() => handleSort('difficulty')}
                      >
                        Difficulty
                        {sortBy === 'difficulty' && (
                          sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                        )}
                      </button>
                    </th>
                    <th className="text-left p-4 text-base font-medium">
                      <button 
                        className="flex items-center hover:text-blue-400 transition-colors"
                        onClick={() => handleSort('status')}
                      >
                        Status
                        {sortBy === 'status' && (
                          sortOrder === 'asc' ? <ArrowUp className="ml-2 h-5 w-5" /> : <ArrowDown className="ml-2 h-5 w-5" />
                        )}
                      </button>
                    </th>
                    <th className="text-right p-4 text-base font-medium">Similar Questions</th>
                    <th className="text-right p-4 text-base font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {sortedProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-gray-800 transition-colors"
                    >
                      <td className="p-4">
                        <label className="flex items-center space-x-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={problem.status === 'solved'}
                            onChange={(e) => handleStatusChange(problem.id, e.target.checked ? 'solved' : 'unsolved')}
                            className="hidden"
                          />
                          <div className={`w-6 h-6 rounded border ${problem.status === 'solved' ? 'bg-green-100 border-green-800 dark:bg-green-900 dark:border-green-300' : 'bg-gray-700 border-gray-700'}`}>
                            {problem.status === 'solved' && <Check className="h-5 w-5 text-green-800 dark:text-green-300 ml-0.5" />}
                          </div>
                        </label>
                      </td>
                      <td className="p-4" onClick={() => {
                        setSelectedProblem(problem);
                        setEditMode(false);
                      }}>
                        <div className="font-medium truncate max-w-[200px] text-base">{problem.title}</div>
                      </td>
                      <td className="p-4" onClick={() => {
                        setSelectedProblem(problem);
                        setEditMode(false);
                      }}>
                        <div className="text-gray-400 truncate max-w-[150px] text-base">{problem.topic}</div>
                      </td>
                      <td className="p-4" onClick={() => {
                        setSelectedProblem(problem);
                        setEditMode(false);
                      }}>
                        <span className={`inline-block rounded-full px-2 py-1 text-base font-medium 
                          ${problem.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : problem.difficulty === 'medium' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="p-4" onClick={() => {
                        setSelectedProblem(problem);
                        setEditMode(false);
                      }}>
                        <span className={`inline-block rounded-full px-2 py-1 text-base font-medium 
                          ${problem.status === 'solved' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : problem.status === 'unsolved' 
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}
                        >
                          {problem.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSimilarClick(problem.id);
                          }}
                          className="text-gray-400 hover:text-blue-400 text-base"
                        >
                          AISimilar
                        </Button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(problem.link, '_blank');
                            }}
                            className="text-gray-400 hover:text-blue-400"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProblem(problem);
                              setEditMode(true);
                            }}
                            className="text-gray-400 hover:text-blue-400"
                          >
                            <Pencil className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-400 hover:text-red-600 hover:bg-red-900/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(problem.id);
                            }}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-900">
            <h3 className="text-xl font-medium mb-2 text-gray-200">No problems found</h3>
            <p className="text-gray-400 mb-6 text-base">
              {problems.length === 0 
                ? "You haven't added any problems yet." 
                : "No problems match your search or filters."
              }
            </p>
            {problems.length === 0 ? (
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-lg">
                      <PlusCircle className="mr-2 h-6 w-6" />
                      Add Your First Problem
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="bg-black border-gray-800">
                  <ProblemForm />
                </DialogContent>
              </Dialog>
            ) : (
              <Button variant="outline" onClick={resetFilters} className="text-blue-400 hover:bg-gray-800 text-base">
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Similar Problems Dialog */}
        <Dialog open={similarDialogOpen !== null} onOpenChange={() => setSimilarDialogOpen(null)}>
          <DialogContent className="bg-black border-gray-800 max-w-[500px]">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Similar Problems</h3>
            <ul className="space-y-2">
              {parseSimilarProblems(similarProblems)}
            </ul>
          </DialogContent>
        </Dialog>

        {/* Problem Detail Dialog */}
        {selectedProblem && (
          <Dialog open={!!selectedProblem} onOpenChange={(open) => !open && setSelectedProblem(null)}>
            <DialogContent className="sm:max-w-[600px] bg-black border-gray-800">
              {editMode ? (
                <ProblemForm 
                  problem={selectedProblem} 
                  onSuccess={() => {
                    setSelectedProblem(null);
                    setEditMode(false);
                  }}
                />
              ) : (
                <ProblemDetail 
                  problem={selectedProblem} 
                  onEdit={() => setEditMode(true)}
                  onDelete={() => handleDeleteClick(selectedProblem.id)}
                />
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="bg-black border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-gray-200">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-400">
                This action cannot be undone. This will permanently delete this problem from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-800 text-gray-200 hover:bg-gray-700 text-base">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 text-white hover:bg-red-700 text-base"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </Layout>
  );
};

export default ProblemsPage;