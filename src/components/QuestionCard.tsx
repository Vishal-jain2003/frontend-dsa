



import React, { useEffect, useRef } from 'react';
import { McqResponse } from '../services/api';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: McqResponse;
  index: number;
  total: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  isLast: boolean;
  timeLeft: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  isLast,
  timeLeft,
}) => {
  const answerRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (selectedAnswer) {
      const selectedRef = answerRefs.current.find(
        (ref, i) => Object.keys(question.options)[i] === selectedAnswer
      );
      if (selectedRef) {
        selectedRef.classList.add(
          'ring-2',
          'transition-all',
          'duration-300',
          selectedAnswer === question.correctAnswer ? 'ring-green-500' : 'ring-red-500'
        );
        setTimeout(() => {
          selectedRef.classList.remove('ring-2', 'ring-green-500', 'ring-red-500');
        }, 1000);
      }
    }
  }, [selectedAnswer, question.correctAnswer]);

  const getTimeColor = (time: number) => {
    if (time <= 5) return 'text-red-500';
    if (time <= 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative p-6 bg-black rounded-2xl border-4 border-red-900 shadow-xl overflow-hidden"
    >
      {/* Glowing Border Ring */}
      <div className="absolute -inset-1 z-0 bg-gradient-to-r from-red-700 via-black to-red-700 animate-border-spin opacity-20 rounded-2xl" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text mb-4">
          Question {index + 1} of {total}
        </h3>

        <p className="mb-6 text-gray-300 text-lg">{question.question}</p>

        <div className="space-y-4">
          {Object.entries(question.options).map(([key, value], i) => (
            <motion.label
              key={key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-4 p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-200 shadow-md cursor-pointer ${
                selectedAnswer === key
                  ? selectedAnswer === question.correctAnswer
                    ? 'ring-2 ring-green-600'
                    : 'ring-2 ring-red-600'
                  : ''
              }`}
            >
              <input
                ref={(el) => (answerRefs.current[i] = el)}
                type="radio"
                name={`question-${index}`}
                value={key}
                checked={selectedAnswer === key}
                onChange={() => onAnswerSelect(key)}
                className="h-5 w-5 accent-red-600 focus:ring-2 focus:ring-red-500"
                aria-label={`${key}: ${value}`}
              />
              <span className="text-sm sm:text-base">
                <strong className="text-yellow-300">{key}</strong>: {value}
              </span>
            </motion.label>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className={`text-md font-semibold ${getTimeColor(timeLeft)}`}>
            ⏳ Time Left: {timeLeft}s
          </span>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(239, 68, 68, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={!selectedAnswer}
            className={`px-5 py-2 rounded-xl text-white text-md font-medium transition-all duration-300 ${
              selectedAnswer
                ? 'bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-400'
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            {isLast ? 'Finish' : 'Next'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Add glowing border-spin animation globally
const styles = `
@keyframes border-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-border-spin {
  animation: border-spin 6s linear infinite;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default QuestionCard;
