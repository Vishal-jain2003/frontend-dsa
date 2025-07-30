
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { streaksAPI } from '../services/api';
// import { useAuth } from './AuthContext';

// type StreakData = {
//   id: number;
//   userId: number;
//   date: string;
//   count: number;
// };

// type StreakContextType = {
//   currentStreak: number;
//   longestStreak: number;
//   streakData: StreakData[];
//   loading: boolean;
//   error: string | null;
//   refreshStreaks: () => Promise<void>;
// };

// const StreakContext = createContext<StreakContextType>({
//   currentStreak: 0,
//   longestStreak: 0,
//   streakData: [],
//   loading: false,
//   error: null,
//   refreshStreaks: async () => {}
// });

// export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user } = useAuth();
//   const [currentStreak, setCurrentStreak] = useState(0);
//   const [longestStreak, setLongestStreak] = useState(0);
//   const [streakData, setStreakData] = useState<StreakData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const refreshStreaks = async () => {
//     if (!user) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Fetch streak data
//       const response = await streaksAPI.getUserStreaks(user.id);
//       const data = response.data as StreakData[] || [];
//       setStreakData(data);
      
//       // Calculate current streak
//       if (data.length > 0) {
//         // Sort by date descending
//         const sortedData = [...data].sort((a, b) => 
//           new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
        
//         // Get the latest streak count
//         const latestStreakCount = sortedData[0]?.count || 0;
//         setCurrentStreak(latestStreakCount);
        
//         // Find the longest streak
//         const maxStreak = sortedData.reduce((max, streak) => 
//           streak.count > max ? streak.count : max, 0
//         );
//         setLongestStreak(maxStreak);
//       } else {
//         setCurrentStreak(0);
//         setLongestStreak(0);
//       }
//     } catch (err) {
//       console.error('Error fetching streaks:', err);
//       setError('Failed to fetch streak data');
      
//       // In dummy mode, set some placeholder streak data
//       const today = new Date();
//       const dummyStreakCount = user?.streakCount || Math.floor(Math.random() * 10);
      
//       // Generate some dummy streak data for the last few days
//       const dummyData: StreakData[] = [];
//       for (let i = 0; i < dummyStreakCount; i++) {
//         const date = new Date();
//         date.setDate(today.getDate() - i);
//         dummyData.push({
//           id: i + 1,
//           userId: user?.id || 1,
//           date: date.toISOString().split('T')[0],
//           count: dummyStreakCount - i
//         });
//       }
      
//       setStreakData(dummyData);
//       setCurrentStreak(dummyStreakCount);
//       setLongestStreak(dummyStreakCount);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshStreaks();
//   }, [user]);

//   return (
//     <StreakContext.Provider
//       value={{
//         currentStreak,
//         longestStreak,
//         streakData,
//         loading,
//         error,
//         refreshStreaks
//       }}
//     >
//       {children}
//     </StreakContext.Provider>
//   );
// };

// export const useStreaks = () => {
//   const context = useContext(StreakContext);
//   if (!context) {
//     throw new Error('useStreaks must be used within a StreakProvider');
//   }
//   return context;
// };

// export default StreakContext;
