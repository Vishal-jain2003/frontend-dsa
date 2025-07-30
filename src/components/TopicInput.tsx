

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import { trackEvent } from "../analytics";

// interface TopicInputProps {
//   onSubmit: (topic: string) => void;
// }

// const TopicInput: React.FC<TopicInputProps> = ({ onSubmit }) => {
//   const [topic, setTopic] = useState<string>('');
//   const suggestedTopics = [
//     'OSI Model', 'Binary Search', 'Graph Traversal', 'Sorting Algorithms', 'OOPS',
//     'Dynamic Programming', 'Data Structures', 'Recursion', 'Hashing', 'Trees',
//     'Linked Lists', 'Stacks and Queues', 'Greedy Algorithms', 'Backtracking',
//     'Bit Manipulation', 'DBMS', 'Operating Systems', 'Computer Networks',
//     'Software Engineering', 'Web Development', 'Machine Learning', 'Artificial Intelligence',
//   ];

//   const handleSubmit = () => {
//     if (topic.trim()) {
//       onSubmit(topic);
//     } else {
//       toast.error('Please enter a topic');
//       setTopic('');
//       const input = document.querySelector('input');
//       if (input) {
//         input.classList.add('shake');
//         setTimeout(() => input.classList.remove('shake'), 500);
//       }
//     }
//   };

//   const handleClear = () => {
//     setTopic('');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="relative max-w-2xl mx-auto p-8 bg-black rounded-2xl overflow-hidden shadow-lg border-4 border-red-800"
//     >
//       {/* Glowing Ring Effect */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-red-700 via-black to-red-700 animate-border-spin opacity-30 rounded-2xl z-0" />

//       {/* Foreground Content */}
//       <div className="relative z-10">
//         <motion.h2
//           initial={{ y: -15, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="text-4xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text tracking-wide"
//         >
         
//         </motion.h2>

//         <div className="relative mb-6">
//           <input
//             type="text"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             placeholder="Enter a topic (e.g., Graph Traversal)"
//             className="w-full p-5 bg-black border border-red-600 rounded-xl focus:ring-2 focus:ring-red-400 text-white placeholder-red-300 text-lg transition-all duration-300 shake"
//             style={{ paddingRight: '100px' }}
//           />
//           {topic && (
//             <motion.button
//               whileHover={{ scale: 1.1, backgroundColor: '#7f1d1d' }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleClear}
//               className="absolute right-3 top-3 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
//             >
//               Clear
//             </motion.button>
//           )}
//         </div>

//         {/* Suggested Topics */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
//           {suggestedTopics.map((suggestion) => (
//             <motion.button
//               key={suggestion}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: '0 0 10px rgba(239, 68, 68, 0.7)',
//               }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setTopic(suggestion)}
//               className="px-4 py-2 bg-red-950 text-white rounded-lg text-sm hover:bg-red-800 transition-all duration-300 shadow-md"
//             >
//               {suggestion}
//             </motion.button>
//           ))}
//         </div>

//         <motion.button
//           whileHover={{
//             scale: 1.05,
//             boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
//           }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleSubmit}
//           className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-yellow-400 transition-all duration-300 shadow-lg"
//         >
//           Start Quiz
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// // CSS for shake animation and border-spin effect
// const styles = `
//   .shake {
//     animation: shake 0.5s;
//   }
//   @keyframes shake {
//     0% { transform: translateX(0); }
//     25% { transform: translateX(-5px); }
//     50% { transform: translateX(5px); }
//     75% { transform: translateX(-5px); }
//     100% { transform: translateX(0); }
//   }

//   @keyframes border-spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }

//   .animate-border-spin {
//     animation: border-spin 6s linear infinite;
//     background-size: 200% 200%;
//   }
// `;

// const styleSheet = document.createElement('style');
// styleSheet.textContent = styles;
// document.head.appendChild(styleSheet);

// export default TopicInput;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { trackEvent } from "../analytics";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState<string>('');
  const suggestedTopics = [
    'OSI Model', 'Binary Search', 'Graph Traversal', 'Sorting Algorithms', 'OOPS',
    'Dynamic Programming', 'Data Structures', 'Recursion', 'Hashing', 'Trees',
    'Linked Lists', 'Stacks and Queues', 'Greedy Algorithms', 'Backtracking',
    'Bit Manipulation', 'DBMS', 'Operating Systems', 'Computer Networks',
    'Software Engineering', 'Web Development', 'Machine Learning', 'Artificial Intelligence',
  ];

  const handleSubmit = () => {
    if (topic.trim()) {
      // ✅ Google Analytics tracking
      trackEvent("Start Quiz", "Quiz Button", topic);

      onSubmit(topic);
    } else {
      toast.error('Please enter a topic');
      setTopic('');
      const input = document.querySelector('input');
      if (input) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
      }
    }
  };

  const handleClear = () => {
    setTopic('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative max-w-2xl mx-auto p-8 bg-black rounded-2xl overflow-hidden shadow-lg border-4 border-red-800"
    >
      {/* Glowing Ring Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-700 via-black to-red-700 animate-border-spin opacity-30 rounded-2xl z-0" />

      {/* Foreground Content */}
      <div className="relative z-10">
        <motion.h2
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-red-400 to-yellow-300 bg-clip-text tracking-wide"
        >
          {/* You can put heading here if needed */}
        </motion.h2>

        <div className="relative mb-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., Graph Traversal)"
            className="w-full p-5 bg-black border border-red-600 rounded-xl focus:ring-2 focus:ring-red-400 text-white placeholder-red-300 text-lg transition-all duration-300 shake"
            style={{ paddingRight: '100px' }}
          />
          {topic && (
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#7f1d1d' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="absolute right-3 top-3 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
            >
              Clear
            </motion.button>
          )}
        </div>

        {/* Suggested Topics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {suggestedTopics.map((suggestion) => (
            <motion.button
              key={suggestion}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.7)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTopic(suggestion)}
              className="px-4 py-2 bg-red-950 text-white rounded-lg text-sm hover:bg-red-800 transition-all duration-300 shadow-md"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-yellow-400 transition-all duration-300 shadow-lg"
        >
          Start Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

// CSS for shake and spinning border
const styles = `
  .shake {
    animation: shake 0.5s;
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  @keyframes border-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .animate-border-spin {
    animation: border-spin 6s linear infinite;
    background-size: 200% 200%;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TopicInput;


