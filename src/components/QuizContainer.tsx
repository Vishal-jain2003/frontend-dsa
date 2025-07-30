
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
      toast.success(`Quiz started with ${data.length} questions.`);
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
