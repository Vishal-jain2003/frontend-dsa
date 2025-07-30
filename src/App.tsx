


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProblemProvider } from "@/contexts/ProblemContext";
// import { StreakProvider } from "@/contexts/StreakContext";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ProblemsPage from "@/pages/ProblemsPage";
import StatisticsPage from "@/pages/StatisticsPage";
// import SettingsPage from "@/pages/SettingsPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage"; // Import the new page
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import QuizPage from "./pages/QuizPage";
// import SheetDashboard from "./components/SheetDashboard";

const queryClient = new QueryClient();

const App = () => {
  // Check system preference for dark mode and apply it
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ProblemProvider>
            {/* <StreakProvider> */}
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/problems" element={<ProblemsPage />} />
                  <Route path="/mcqs" element={<QuizPage />} /> 
                  {/* <Route path="/sheet" element={<SheetDashboard />} />  */}



                  <Route path="/statistics" element={<StatisticsPage />} />
                  {/* <Route path="/settings" element={<SettingsPage />} /> */}
                  <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Added route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            {/* </StreakProvider> */}
          </ProblemProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

// export default App;