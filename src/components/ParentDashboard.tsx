import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  User,
  BookOpen,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Award
} from "lucide-react";

interface ParentDashboardProps {
  onBack: () => void;
}

interface ChildProgress {
  id: string;
  name: string;
  age: number;
  disabilityType: 'visual' | 'cognitive';
  language: 'english' | 'kannada';
  overallProgress: number;
  subjects: {
    english: { completed: number; total: number; avgScore: number };
    kannada: { completed: number; total: number; avgScore: number };
    math: { completed: number; total: number; avgScore: number };
  };
  recentActivity: {
    date: string;
    activity: string;
    score?: number;
  }[];
  achievements: string[];
  weeklyStats: {
    videosWatched: number;
    quizzesCompleted: number;
    timeSpent: string;
    streak: number;
  };
}

export const ParentDashboard = ({ onBack }: ParentDashboardProps) => {
  const [selectedChild, setSelectedChild] = useState<string>("child1");

  const childrenProgress: ChildProgress[] = [
    {
      id: "child1",
      name: "Arjun Kumar",
      age: 7,
      disabilityType: 'visual',
      language: 'english',
      overallProgress: 75,
      subjects: {
        english: { completed: 12, total: 15, avgScore: 85 },
        kannada: { completed: 8, total: 12, avgScore: 78 },
        math: { completed: 10, total: 14, avgScore: 82 }
      },
      recentActivity: [
        { date: "2024-01-20", activity: "Completed 'Alphabet Song' video", score: 90 },
        { date: "2024-01-19", activity: "Finished Basic English Quiz", score: 85 },
        { date: "2024-01-18", activity: "Watched 'Counting Numbers' video" },
        { date: "2024-01-17", activity: "Completed Math Quiz - Numbers 1-10", score: 95 }
      ],
      achievements: ["First Quiz Completed", "5-Day Learning Streak", "Math Beginner"],
      weeklyStats: {
        videosWatched: 8,
        quizzesCompleted: 4,
        timeSpent: "2h 45m",
        streak: 5
      }
    }
  ];

  const currentChild = childrenProgress.find(child => child.id === selectedChild) || childrenProgress[0];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="p-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">Track your child's learning progress</p>
        </div>
      </div>

      {/* Child Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-primary">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{currentChild.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Age {currentChild.age} • {currentChild.disabilityType} support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentChild.overallProgress}%</h3>
                <p className="text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentChild.weeklyStats.streak}</h3>
                <p className="text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentChild.weeklyStats.timeSpent}</h3>
                <p className="text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Subject Progress</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Weekly Stats</TabsTrigger>
        </TabsList>

        {/* Subject Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(currentChild.subjects).map(([subject, data]) => (
              <Card key={subject}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="capitalize">{subject}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round((data.completed / data.total) * 100)}%</span>
                    </div>
                    <Progress value={(data.completed / data.total) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {data.completed} of {data.total} lessons completed
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className={`text-2xl font-bold ${getProgressColor(data.avgScore)}`}>
                      {data.avgScore}%
                    </div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent Learning Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentChild.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{activity.activity}</h4>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <Badge variant="outline" className={getProgressColor(activity.score)}>
                        {activity.score}%
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements & Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentChild.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg">
                    <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{achievement}</h4>
                      <p className="text-sm text-muted-foreground">Earned recently</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Stats Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Videos Watched</span>
                  <Badge variant="outline">{currentChild.weeklyStats.videosWatched}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Quizzes Completed</span>
                  <Badge variant="outline">{currentChild.weeklyStats.quizzesCompleted}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Spent Learning</span>
                  <Badge variant="outline">{currentChild.weeklyStats.timeSpent}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Learning Streak</span>
                  <Badge variant="outline" className="text-green-600">{currentChild.weeklyStats.streak} days</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Progress Chart</p>
                    <p className="text-sm text-muted-foreground">Visual progress tracking would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-blue-600">Focus on Math</h4>
                  <p className="text-sm text-muted-foreground">
                    Your child is showing great progress in English. Consider spending more time on Math to balance their learning.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-green-600">Excellent Consistency</h4>
                  <p className="text-sm text-muted-foreground">
                    5-day learning streak! Keep encouraging daily practice to maintain this momentum.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};