
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowUpRight, BookOpen, CheckCircle, Clock, Calendar, Trophy } from 'lucide-react';
import { useProblems } from '@/contexts/ProblemContext';
// import { useStreaks } from '@/contexts/StreakContext';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import ProblemForm from '@/components/problems/ProblemForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import ProfileSection from '@/components/profile/ProfileSection';
// import ActivityHeatmap from '@/components/activity/ActivityHeatmap';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { problems, stats } = useProblems();
  // const { currentStreak, longestStreak } = useStreaks();
  const isMobile = useIsMobile();
  
  // Stats cards
  const statsCards = [
    {
      title: 'Total Problems',
      value: stats.total,
      icon: BookOpen,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Problems Solved',
      value: stats.solved,
      icon: CheckCircle,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Problems Revisited',
      value: stats.revisited,
      icon: Clock,
      color: 'bg-purple-500/10 text-purple-500',
    },
    // {
    //   title: 'Current Streak',
    //   // value: currentStreak,
    //   icon: Calendar,
    //   color: 'bg-orange-500/10 text-orange-500',
    // },
    // {
    //   title: 'Longest Streak',
    //   // value: longestStreak,
    //   icon: Trophy,
    //   color: 'bg-red-500/10 text-red-500',
    // },
  ];

  // Get last 5 problems
  const recentProblems = [...problems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Calculate progress
  const progressPercentage = stats.total > 0 
    ? Math.round((stats.solved / stats.total) * 100) 
    : 0;

  return (
    <Layout requireAuth={true}>
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.username}</h1>
                  {/* <p className="text-muted-foreground mt-2">
                    You've solved {stats.solved} problems and have a {currentStreak} day streak.
                  </p> */}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 md:mt-0">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Problem
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ProblemForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Profile and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <ProfileSection />
          </div>
          
          {/* Stats Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>Track your problem-solving progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 lg:grid-cols-3 gap-5">
                  {statsCards.map((stat, index) => (
                    <div key={index} className="card-hover p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted-foreground text-xl">{stat.title}</p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", stat.color)}>
                          <stat.icon className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Heatmap */}
        {/* <section className="mb-8">
          <ActivityHeatmap />
        </section> */}

        {/* Progress and Recent Problems Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your problem-solving journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Solved vs Total</span>
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Easy</p>
                  <p className="text-xl font-bold">{stats.byDifficulty.easy}</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Medium</p>
                  <p className="text-xl font-bold">{stats.byDifficulty.medium}</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Hard</p>
                  <p className="text-xl font-bold">{stats.byDifficulty.hard}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Recent Problems</CardTitle>
              <CardDescription>Your recently added problems</CardDescription>
            </CardHeader>
            <CardContent>
              {recentProblems.length > 0 ? (
                <div className="space-y-3">
                  {recentProblems.map((problem) => (
                    <div 
                      key={problem.id} 
                      className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <div>
                        <p className="font-medium">{problem.title}</p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium 
                            ${problem.difficulty === 'easy' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : problem.difficulty === 'medium' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                          >
                            {problem.difficulty}
                          </span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{problem.topic}</span>
                        </div>
                      </div>
                      <a 
                        href={problem.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No problems added yet</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Your First Problem
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <ProblemForm />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              
              {recentProblems.length > 0 && (
                <div className="mt-4 text-center">
                  <Link to="/problems">
                    <Button variant="outline">
                      View All Problems
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default DashboardPage;
