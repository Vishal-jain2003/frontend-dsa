// import React, { useState, useEffect } from 'react';
// import QuizContainer from '../components/QuizContainer';
// import { authAPI } from '../services/api';
// import { Navigate } from 'react-router-dom';

// const QuizPage: React.FC = () => {
//   const user = authAPI.getCurrentUser();
//   const [theme, setTheme] = useState<string>(localStorage.getTheme || 'light');

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setTheme = theme;
//   }, [theme]);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground antialiased" data-theme={theme}>
//       <div className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-semibold tracking-tight text-primary card-hover">DSA Quiz</h1>
//           <div className="space-x-2">
//             <button
//               onClick={() => setTheme('light')}
//               className={`px-3 py-1 rounded btn-glow ${theme === 'light' ? 'bg-primary' : 'bg-secondary'}`}
//             >
//               Light
//             </button>
//             <button
//               onClick={() => setTheme('dark')}
//               className={`px-3 py-1 rounded btn-glow ${theme === 'dark' ? 'bg-primary' : 'bg-secondary'}`}
//             >
//               Dark
//             </button>
//           </div>
//         </div>
//         <div className="max-w-2xl mx-auto">
//           <QuizContainer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizPage;


import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import QuizContainer from '../components/QuizContainer';
import { authAPI } from '../services/api';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const QuizPage: React.FC = () => {
  const user = authAPI.getCurrentUser();
  const [theme, setTheme] = useState<string>(localStorage.getTheme || 'dark'); // Default to dark theme

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setTheme = theme;
  }, [theme]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout requireAuth={true}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">ByteWise AI Quizzes</h1>
          <h3 className="text-muted-foreground text-base font-bold">Crack CS, DSA, WebDev and AI – One quiz at a time.</h3>
          <p className="text-muted-foreground text-base font-bold">AI-powered quizzes crafted by Vishal Jain for future tech leaders.</p>
        </div>

        {/* <div className="flex justify-end mb-6 space-x-2">
          <Button
            variant={theme === 'light' ? 'default' : 'outline'}
            onClick={() => setTheme('light')}
            className="text-base"
          >
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            onClick={() => setTheme('dark')}
            className="text-base"
          >
            Dark
          </Button>
        </div> */}

        <div className="max-w-2xl mx-auto">
          <QuizContainer />
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;