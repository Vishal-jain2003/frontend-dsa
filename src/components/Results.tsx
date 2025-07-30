




import React from 'react';
import { McqResponse } from '../services/api';
import { motion } from 'framer-motion';

interface ResultsProps {
  mcqs: McqResponse[];
  selectedAnswers: string[];
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ mcqs, selectedAnswers, onReset }) => {
  const calculateScore = () =>
    mcqs.reduce((score, mcq, index) => {
      return score + (selectedAnswers[index] === mcq.correctAnswer ? 1 : 0);
    }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 bg-black rounded-2xl border-4 border-red-800 shadow-xl overflow-hidden relative"
    >
      {/* Glowing Ring Border */}
      <div className="absolute -inset-1 z-0 bg-gradient-to-r from-red-700 via-black to-red-700 animate-border-spin opacity-20 rounded-2xl" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text mb-6 text-center">
          Quiz Results
        </h2>

        <p className="text-xl text-center text-white mb-10">
          Your Score: <span className="font-extrabold text-green-400">{calculateScore()}</span> /{' '}
          {mcqs.length}
        </p>

        <ul className="space-y-8">
          {mcqs.map((mcq, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === mcq.correctAnswer;

            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 bg-gray-900 border border-gray-800 rounded-xl shadow-lg"
              >
                <p className="text-lg text-gray-200 mb-3 font-semibold">
                  Q{index + 1}: {mcq.question}
                </p>

                <div className="space-y-2">
                  {Object.entries(mcq.options).map(([key, value]) => {
                    const isCorrectAns = key === mcq.correctAnswer;
                    const isSelected = key === userAnswer;

                    let bgColor = 'bg-gray-800';
                    let border = 'border-gray-700';

                    if (isCorrectAns) {
                      bgColor = 'bg-green-900';
                      border = 'border-green-500';
                    }

                    if (isSelected && !isCorrectAns) {
                      bgColor = 'bg-red-900';
                      border = 'border-red-500';
                    }

                    return (
                      <div
                        key={key}
                        className={`px-4 py-2 rounded-lg border ${border} ${bgColor} text-white text-sm sm:text-base`}
                      >
                        <strong className="text-yellow-400">{key}</strong>: {value}
                        {isSelected && (
                          <span className="ml-3 text-xs px-2 py-1 rounded bg-white/10 text-white">
                            Your Choice
                          </span>
                        )}
                        {isCorrectAns && (
                          <span className="ml-2 text-xs px-2 py-1 rounded bg-green-700 text-white">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p
                  className={`mt-4 font-bold ${
                    isCorrect ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  Status: {isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
                </p>
              </motion.li>
            );
          })}
        </ul>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="mt-10 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-400 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-yellow-300 transition-all duration-300 shadow-lg"
        >
          🔁 Start New Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

// Add rotating ring animation
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

export default Results;
