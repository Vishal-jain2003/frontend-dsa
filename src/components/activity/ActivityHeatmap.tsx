// “This component displays a 365-day activity heatmap. It fetches problem-solving data from context, computes problem counts per day, assigns levels (0-4) based on how many problems were solved, and groups days into weeks. It uses useMemo for performance and date-fns for date operations. I also calculate total submissions, active days, and max streak to show in the summary. The heatmap is color-coded with a visual legend like GitHub’s contribution chart.”

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProblems } from '@/contexts/ProblemContext';
import { useStreaks } from '@/contexts/StreakContext';
import { format, subDays, eachDayOfInterval, isSameDay, addDays, getDay } from 'date-fns';

// Define types for our data
type DayActivity = {
  date: Date;
  count: number;
  problems: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = no activity, 1-4 = activity levels
  isPlaceholder?: boolean; // Add optional isPlaceholder property
};

const ActivityHeatmap: React.FC = () => {
  const { problems } = useProblems();
  const { streakData } = useStreaks();
  
  // Generate last 365 days for the heatmap (more like GitHub)
  const activityData = useMemo(() => {
    const today = new Date();
    const days = eachDayOfInterval({
      start: subDays(today, 364), // Get full year (365 days)
      end: today,
    });
    
    // Create a map of dates to problem counts
    const problemsByDate = problems.reduce((acc, problem) => {
      const date = problem.createdAt.split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Create the activity data with levels
    return days.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const problemCount = problemsByDate[dateStr] || 0;
      const hasStreak = streakData.some(streak => 
        isSameDay(new Date(streak.date), date)
      );
      
      // Determine level based on problem count - using more levels for better visualization
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (problemCount >= 6) level = 4;
      else if (problemCount >= 4) level = 3;
      else if (problemCount >= 2) level = 2;
      else if (problemCount >= 1 || hasStreak) level = 1;
      
      return {
        date,
        count: problemCount,
        problems: problemCount,
        level,
      };
    });
  }, [problems, streakData]);

  // Calculate total submissions for header
  const totalSubmissions = useMemo(() => {
    return problems.length;
  }, [problems]);
  
  // Calculate total active days
  const activeDays = useMemo(() => {
    const uniqueDays = new Set();
    problems.forEach(problem => {
      const date = problem.createdAt.split('T')[0];
      uniqueDays.add(date);
    });
    return uniqueDays.size;
  }, [problems]);
  
  // Group days by week for display, accounting for starting on Sunday (GitHub style)
  const weeks = useMemo(() => {
    // Fill in with empty cells at the beginning if needed
    const firstDay = activityData[0].date;
    const firstDayOfWeek = getDay(firstDay); // 0 = Sunday, 1 = Monday, etc.
    
    // Create blank cells for the beginning of the first week
    const blanks: DayActivity[] = Array(firstDayOfWeek).fill(null).map((_, i) => ({
      date: subDays(firstDay, firstDayOfWeek - i),
      count: 0,
      problems: 0,
      level: 0 as const,
      isPlaceholder: true
    }));
    
    // Combine with actual data
    const allCells = [...blanks, ...activityData];
    
    // Group into weeks
    const result = [];
    const totalDays = allCells.length;
    
    // Each week has 7 days
    for (let i = 0; i < totalDays; i += 7) {
      const weekDays = allCells.slice(i, i + 7);
      // Pad the last week if needed
      if (weekDays.length < 7) {
        const lastDate = weekDays[weekDays.length - 1].date;
        for (let j = 1; j <= 7 - weekDays.length; j++) {
          weekDays.push({
            date: addDays(lastDate, j),
            count: 0,
            problems: 0,
            level: 0 as const,
            isPlaceholder: true
          } as DayActivity); // Explicitly cast to DayActivity
        }
      }
      result.push(weekDays);
    }
    
    return result;
  }, [activityData]);
  
  // Get month labels for the top of the heatmap
  const monthLabels = useMemo(() => {
    const months: Record<string, { month: string, index: number }> = {};
    activityData.forEach(day => {
      const month = format(day.date, 'MMM');
      const index = Math.floor(activityData.indexOf(day) / 7);
      if (!months[month] || months[month].index > index) {
        months[month] = { month, index };
      }
    });
    return Object.values(months).sort((a, b) => a.index - b.index);
  }, [activityData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>Your problem-solving history</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{totalSubmissions} <span className="text-sm font-normal text-muted-foreground">submissions</span></div>
          <div className="text-sm text-muted-foreground">
            Total active days: <span className="font-medium">{activeDays}</span> &middot; Max streak: <span className="font-medium">{streakData.length > 0 ? Math.max(...streakData.map(s => s.count)) : 0}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-4">
          <div className="flex justify-start gap-1 mb-1 overflow-hidden">
            {monthLabels.map((monthData) => (
              <div 
                key={monthData.month} 
                className="text-xs text-muted-foreground"
                style={{ 
                  marginLeft: monthData.index === 0 ? 0 : (monthData.index * 12) - (monthData.index > 0 ? 3 : 0) 
                }}
              >
                {monthData.month}
              </div>
            ))}
          </div>
          
          <div className="grid grid-flow-col gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-flow-row gap-[3px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`
                      w-3 h-3 rounded-sm
                      ${day.isPlaceholder ? 'opacity-0' :
                        day.level === 0 ? 'bg-muted dark:bg-muted/30' : 
                        day.level === 1 ? 'bg-green-200 dark:bg-green-900' : 
                        day.level === 2 ? 'bg-green-300 dark:bg-green-800' : 
                        day.level === 3 ? 'bg-green-400 dark:bg-green-700' : 
                        'bg-green-500 dark:bg-green-600'}
                    `}
                    title={!day.isPlaceholder ? `${format(day.date, 'MMM d, yyyy')}: ${day.problems} problems solved` : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-end">
            <div className="text-xs text-muted-foreground mr-2">Activity:</div>
            <div className="flex gap-[3px] items-center">
              <div className="w-3 h-3 rounded-sm bg-muted dark:bg-muted/30"></div>
              <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
              <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700"></div>
              <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600"></div>
            </div>
            <div className="flex gap-1 text-xs text-muted-foreground ml-1">
              <span>Less</span>
              <span>More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;

