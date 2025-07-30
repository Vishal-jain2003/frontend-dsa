// import React, { useState, useEffect, useRef } from 'react';
// import { problemsAPI, McqResponse } from '../services/api';
// import { authAPI } from '../services/api';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import TopicInput from './TopicInput';
// import QuestionCard from './QuestionCard';
// import Results from './Results';

// const QuizContainer: React.FC = () => {
//   const [mcqs, setMcqs] = useState<McqResponse[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
//   const [showResults, setShowResults] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState<number>(15);
//   const navigate = useNavigate();
//   const audioContextRef = useRef<AudioContext | null>(null);

//   useEffect(() => {
//     if (mcqs.length > 0 && !showResults && currentQuestionIndex < mcqs.length) {
//       setTimeLeft(15);
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             handleNextQuestion();
//             return 15;
//           }
//           playSound(200, 0.05); // Tick sound
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [mcqs, currentQuestionIndex, showResults]);

//   const playSound = (frequency: number, duration: number) => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new AudioContext();
//     }
//     const audioCtx = audioContextRef.current;
//     const oscillator = audioCtx.createOscillator();
//     const gainNode = audioCtx.createGain();
//     oscillator.type = 'sine';
//     oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
//     gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Lower volume
//     oscillator.connect(gainNode);
//     gainNode.connect(audioCtx.destination);
//     oscillator.start();
//     oscillator.stop(audioCtx.currentTime + duration);
//   };

//   const handleFetchMcqs = async (topic: string) => {
//     const user = authAPI.getCurrentUser();
//     if (!user || !user.username || !user.password) {
//       toast.error('Please log in to take a quiz');
//       navigate('/login');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await problemsAPI.generateMcqs(topic);
//       console.log('API Response:', JSON.stringify(response.data, null, 2));
//       const mcqData = response.data;
//       if (!Array.isArray(mcqData) || mcqData.length === 0) {
//         toast.error('No questions returned for the topic');
//         setMcqs([]);
//       } else if (mcqData.length === 1 && mcqData[0].question.startsWith('Error')) {
//         toast.error(mcqData[0].question);
//         setMcqs([]);
//       } else {
//         setMcqs(mcqData);
//         setCurrentQuestionIndex(0);
//         setSelectedAnswers(new Array(mcqData.length).fill(''));
//         setShowResults(false);
//       }
//     } catch (error: any) {
//       console.error('Error fetching MCQs:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || 'Failed to fetch MCQs. Check console for details.');
//       setMcqs([]);
//     }
//     setIsLoading(false);
//   };

//   const handleAnswerSelect = (answer: string) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[currentQuestionIndex] = answer;
//     setSelectedAnswers(updatedAnswers);
//     const isCorrect = answer === mcqs[currentQuestionIndex].correctAnswer;
//     playSound(isCorrect ? 440 : 150, 0.2); // Chime (440 Hz) for correct, beep (150 Hz) for wrong
//     if (timeLeft > 0) handleNextQuestion();
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < mcqs.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const resetQuiz = () => {
//     setMcqs([]);
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers([]);
//     setShowResults(false);
//   };

//   return (
//     <div className="w-full">
//       {!mcqs.length && !isLoading && <TopicInput onSubmit={handleFetchMcqs} />}
//       {isLoading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//         </div>
//       )}
//       {mcqs.length > 0 && !showResults && (
//         <QuestionCard
//           question={mcqs[currentQuestionIndex]}
//           index={currentQuestionIndex}
//           total={mcqs.length}
//           selectedAnswer={selectedAnswers[currentQuestionIndex]}
//           onAnswerSelect={handleAnswerSelect}
//           onNext={handleNextQuestion}
//           isLast={currentQuestionIndex === mcqs.length - 1}
//           timeLeft={timeLeft}
//         />
//       )}
//       {showResults && <Results mcqs={mcqs} selectedAnswers={selectedAnswers} onReset={resetQuiz} />}
//     </div>
//   );
// };

// export default QuizContainer;



// import React, { useState, useEffect, useRef } from 'react';
// import { problemsAPI, McqResponse } from '../services/api';
// import { authAPI } from '../services/api';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import TopicInput from './TopicInput';
// import QuestionCard from './QuestionCard';
// import Results from './Results';
// import { Progress } from '@/components/ui/progress';
// import { motion } from 'framer-motion';

// const QuizContainer: React.FC = () => {
//   const [mcqs, setMcqs] = useState<McqResponse[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
//   const [showResults, setShowResults] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState<number>(15);
//   const navigate = useNavigate();
//   const audioContextRef = useRef<AudioContext | null>(null);

//   useEffect(() => {
//     if (mcqs.length > 0 && !showResults && currentQuestionIndex < mcqs.length) {
//       setTimeLeft(15);
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             handleNextQuestion();
//             playSound(200, 0.05); // Tick sound
//             return 15;
//           }
//           playSound(200, 0.05); // Tick sound
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [mcqs, currentQuestionIndex, showResults]);

//   const playSound = (frequency: number, duration: number) => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new AudioContext();
//     }
//     const audioCtx = audioContextRef.current;
//     const oscillator = audioCtx.createOscillator();
//     const gainNode = audioCtx.createGain();
//     oscillator.type = 'sine';
//     oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
//     gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Adjusted volume
//     oscillator.connect(gainNode);
//     gainNode.connect(audioCtx.destination);
//     oscillator.start();
//     oscillator.stop(audioCtx.currentTime + duration);
//   };

//   const handleFetchMcqs = async (topic: string) => {
//     const user = authAPI.getCurrentUser();
//     if (!user || !user.username || !user.password) {
//       toast.error('Please log in to take a quiz');
//       navigate('/login');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await problemsAPI.generateMcqs(topic);
//       const mcqData = response.data;
//       if (!Array.isArray(mcqData) || mcqData.length === 0) {
//         toast.error('No questions returned for the topic');
//         setMcqs([]);
//       } else if (mcqData.length === 1 && mcqData[0].question.startsWith('Error')) {
//         toast.error(mcqData[0].question);
//         setMcqs([]);
//       } else {
//         setMcqs(mcqData);
//         setSelectedAnswers(new Array(mcqData.length).fill(''));
//         setCurrentQuestionIndex(0);
//         setShowResults(false);
//         toast.success(`Quiz started with ${mcqData.length} questions!`);
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to fetch MCQs. Check console for details.');
//       setMcqs([]);
//       console.error('Error fetching MCQs:', error);
//     }
//     setIsLoading(false);
//   };

//   const handleAnswerSelect = (answer: string) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[currentQuestionIndex] = answer;
//     setSelectedAnswers(updatedAnswers);
//     const isCorrect = answer === mcqs[currentQuestionIndex].correctAnswer;
//     playSound(isCorrect ? 440 : 150, 0.2); // Chime for correct, beep for wrong
//     if (timeLeft > 0) handleNextQuestion();
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < mcqs.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const resetQuiz = () => {
//     setMcqs([]);
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers([]);
//     setShowResults(false);
//     toast.info('Quiz reset successfully!');
//   };

//   const progress = mcqs.length > 0 ? ((currentQuestionIndex + 1) / mcqs.length) * 100 : 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-2xl mx-auto"
//     >
//       {!mcqs.length && !isLoading && <TopicInput onSubmit={handleFetchMcqs} />}
//       {isLoading && (
//         <div className="flex justify-center items-center h-64">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//             className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
//           />
//         </div>
//       )}
//       {mcqs.length > 0 && !showResults && (
//         <div className="space-y-4">
//           <Progress value={progress} className="h-2 bg-gray-800" />
//           <QuestionCard
//             question={mcqs[currentQuestionIndex]}
//             index={currentQuestionIndex}
//             total={mcqs.length}
//             selectedAnswer={selectedAnswers[currentQuestionIndex]}
//             onAnswerSelect={handleAnswerSelect}
//             onNext={handleNextQuestion}
//             isLast={currentQuestionIndex === mcqs.length - 1}
//             timeLeft={timeLeft}
//           />
//         </div>
//       )}
//       {showResults && <Results mcqs={mcqs} selectedAnswers={selectedAnswers} onReset={resetQuiz} />}
//     </motion.div>
//   );
// };

// export default QuizContainer;  


import React, { useState, useEffect, useRef } from 'react';
import { problemsAPI, McqResponse, authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TopicInput from './TopicInput';
import QuestionCard from './QuestionCard';
import Results from './Results';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const QuizContainer: React.FC = () => {
  const [mcqs, setMcqs] = useState<McqResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const navigate = useNavigate();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Timer logic
  useEffect(() => {
    if (!mcqs.length || showResults || currentQuestionIndex >= mcqs.length) return;

    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion(); // Auto move
          playSound(100, 0.2);  // Low beep for timeout
          return 15;
        }
        playSound(250, 0.02); // Tick sound
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mcqs, currentQuestionIndex, showResults]);

  const playSound = (frequency: number, duration: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.08;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  };

  // Fetch MCQs from API
  const handleFetchMcqs = async (topic: string) => {
    const user = authAPI.getCurrentUser();
    if (!user?.username || !user?.password) {
      toast.error('Please log in to start the quiz.');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await problemsAPI.generateMcqs(topic);
      const data = response.data;

      if (!Array.isArray(data) || data.length === 0 || data[0].question.startsWith('Error')) {
        toast.error(data[0]?.question || 'Failed to load quiz');
        setMcqs([]);
        return;
      }

      setMcqs(data);
      setSelectedAnswers(new Array(data.length).fill(''));
      setCurrentQuestionIndex(0);
      setShowResults(false);
      toast.success(`✅ Quiz started with ${data.length} questions.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to fetch quiz. Please try again.');
      console.error('Quiz fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = answer;
    setSelectedAnswers(updated);

    const correct = answer === mcqs[currentQuestionIndex].correctAnswer;
    playSound(correct ? 440 : 160, 0.2); // Chime/beep
    setTimeout(handleNextQuestion, 300); // Slight delay for animation
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setMcqs([]);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    toast.info('Quiz reset. Start a new one!');
  };

  const progress = mcqs.length > 0
    ? ((currentQuestionIndex + (showResults ? 1 : 0)) / mcqs.length) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto py-8"
    >
      {/* Topic Input */}
      {!mcqs.length && !isLoading && <TopicInput onSubmit={handleFetchMcqs} />}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Quiz in Progress */}
      {mcqs.length > 0 && !showResults && (
        <div className="space-y-6">
          <Progress value={progress} className="h-2 bg-gray-800" />
          <QuestionCard
            question={mcqs[currentQuestionIndex]}
            index={currentQuestionIndex}
            total={mcqs.length}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            isLast={currentQuestionIndex === mcqs.length - 1}
            timeLeft={timeLeft}
          />
        </div>
      )}

      {/* Final Results */}
      {showResults && (
        <Results
          mcqs={mcqs}
          selectedAnswers={selectedAnswers}
          onReset={resetQuiz}
        />
      )}
    </motion.div>
  );
};

export default QuizContainer;
