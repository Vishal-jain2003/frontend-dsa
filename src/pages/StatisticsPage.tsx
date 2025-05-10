import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProblems } from '@/contexts/ProblemContext';
import { useStreaks } from '@/contexts/StreakContext';
import { 
  BarChart, 
  PieChart, 
  Pie, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const StatisticsPage: React.FC = () => {
  const { problems, stats } = useProblems();
  const { streakData, currentStreak, longestStreak } = useStreaks();
  const [activeTab, setActiveTab] = useState('summary');
  const isMobile = useIsMobile();

  // Colors for charts
  const colors = {
    primary: 'hsl(221, 83%, 53%)',
    solved: '#4ade80',
    unsolved: '#a1a1aa',
    revisited: '#8b5cf6',
    easy: '#22c55e',
    medium: '#eab308',
    hard: '#ef4444',
  };

  // Prepare data for difficulty pie chart
  const difficultyData = [
    { name: 'Easy', value: stats.byDifficulty.easy, color: colors.easy },
    { name: 'Medium', value: stats.byDifficulty.medium, color: colors.medium },
    { name: 'Hard', value: stats.byDifficulty.hard, color: colors.hard },
  ].filter(item => item.value > 0);

  // Prepare data for status pie chart
  const statusData = [
    { name: 'Solved', value: stats.solved, color: colors.solved },
    { name: 'Unsolved', value: stats.unsolved, color: colors.unsolved },
    { name: 'Revisited', value: stats.revisited, color: colors.revisited },
  ].filter(item => item.value > 0);

  // Prepare data for topics bar chart
  const topicsData = Object.entries(stats.byTopic)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10 topics

  // Prepare streak data for line chart
  const streakChartData = streakData.map(streak => ({
    date: new Date(streak.date).toLocaleDateString(),
    count: streak.count,
  }));

  // Prepare submissions over time chart
  const getMonthlySubmissions = () => {
    const months: Record<string, number> = {};
    
    problems.forEach(problem => {
      const date = new Date(problem.createdAt);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      months[monthYear] = (months[monthYear] || 0) + 1;
    });
    
    return Object.entries(months).map(([name, value]) => ({ name, value }));
  };

  const monthlySubmissions = getMonthlySubmissions();

  // Get top problem topics based on count
  const topProblemTopics = topicsData.slice(0, 3);

  return (
    <Layout requireAuth={true}>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Statistics</h1>
          <p className="text-muted-foreground">
            Visualize your progress and problem-solving patterns
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Total Problems</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Solved</p>
                    <p className="text-3xl font-bold text-green-500">{stats.solved}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.total > 0 ? `${Math.round((stats.solved / stats.total) * 100)}%` : '0%'} of total
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Current Streak</p>
                    <p className="text-3xl font-bold text-primary">{currentStreak}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Top Topic</p>
                    <p className="text-3xl font-bold">
                      {topProblemTopics.length > 0 ? (
                        <Badge variant="outline" className="text-lg font-semibold">
                          {topProblemTopics[0].name}
                        </Badge>
                      ) : (
                        'N/A'
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {topProblemTopics.length > 0 ? `${topProblemTopics[0].value} problems` : ''}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Problem Status Distribution</CardTitle>
                  <CardDescription>Breakdown of your solved, unsolved, and revisited problems</CardDescription>
                </CardHeader>
                <CardContent>
                  {statusData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={isMobile ? 80 : 100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, 'Problems']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Problem Difficulty Distribution</CardTitle>
                  <CardDescription>Breakdown of problem difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  {difficultyData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={difficultyData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={isMobile ? 80 : 100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {difficultyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, 'Problems']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Problems Tab */}
          <TabsContent value="problems" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Top Problem Topics</CardTitle>
                  <CardDescription>Most frequent topics in your problem set</CardDescription>
                </CardHeader>
                <CardContent>
                  {topicsData.length > 0 ? (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={topicsData}
                          layout="vertical"
                          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={100}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip formatter={(value) => [value, 'Problems']} />
                          <Bar dataKey="value" fill={colors.primary} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Monthly Submissions</CardTitle>
                  <CardDescription>Problems added over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {monthlySubmissions.length > 0 ? (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlySubmissions}
                          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45} 
                            textAnchor="end"
                            height={80}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis />
                          <Tooltip formatter={(value) => [value, 'Problems']} />
                          <Bar dataKey="value" fill={colors.primary} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center">
                      <p className="text-muted-foreground">No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Streaks Tab */}
          <TabsContent value="streaks" className="space-y-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Your Streak History</CardTitle>
                <CardDescription>Track your consistency over time</CardDescription>
              </CardHeader>
              <CardContent>
                {streakChartData.length > 0 ? (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={streakChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          angle={-45} 
                          textAnchor="end"
                          height={80}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => [value, 'Day streak']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke={colors.primary} 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">No streak data available yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Streak Statistics</CardTitle>
                <CardDescription>Analysis of your consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-6 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Current Streak</p>
                    <p className="text-3xl font-bold text-primary">{currentStreak}</p>
                    <p className="text-xs text-muted-foreground mt-2">days</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Longest Streak</p>
                    <p className="text-3xl font-bold text-green-500">{longestStreak}</p>
                    <p className="text-xs text-muted-foreground mt-2">days</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Total Streak Days</p>
                    <p className="text-3xl font-bold">{streakData.length}</p>
                    <p className="text-xs text-muted-foreground mt-2">days tracked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StatisticsPage;
