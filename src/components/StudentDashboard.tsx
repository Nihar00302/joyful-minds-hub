import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  Star, 
  Trophy, 
  Volume2, 
  Settings,
  Play,
  Award,
  Target,
  Zap
} from "lucide-react";
import { StudentProfile } from "./StudentProfile";

interface StudentDashboardProps {
  profile: StudentProfile;
  onBack: () => void;
}

export const StudentDashboard = ({ profile, onBack }: StudentDashboardProps) => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Mock progress data
  const progress = {
    totalLessons: 45,
    completedLessons: 12,
    totalQuizzes: 20,
    completedQuizzes: 8,
    stars: 24,
    level: 3
  };

  const calculateProgress = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const greetingMessage = profile.disabilityType === 'visual' 
    ? `Welcome back, ${profile.name}! Ready to listen and learn?`
    : `Hey ${profile.name}! Let's have fun learning today!`;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="gradient-rainbow w-24 h-24 rounded-full mx-auto flex items-center justify-center float-animation">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🌟</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {greetingMessage}
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Level {progress.level}
            </Badge>
            <Badge className="text-lg px-4 py-2 gradient-accent text-accent-foreground">
              ⭐ {progress.stars} Stars
            </Badge>
          </div>
        </div>

        {/* Audio Toggle */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="border-2 hover:scale-105 transition-transform"
        >
          <Volume2 className={`w-5 h-5 mr-2 ${audioEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
          Audio {audioEnabled ? 'On' : 'Off'}
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Learning Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {progress.completedLessons} of {progress.totalLessons} lessons
                </p>
              </div>
            </div>
            <Progress 
              value={calculateProgress(progress.completedLessons, progress.totalLessons)} 
              className="h-3"
            />
          </CardContent>
        </Card>

        <Card className="border-2 border-success/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Quiz Mastery</h3>
                <p className="text-sm text-muted-foreground">
                  {progress.completedQuizzes} of {progress.totalQuizzes} quizzes
                </p>
              </div>
            </div>
            <Progress 
              value={calculateProgress(progress.completedQuizzes, progress.totalQuizzes)} 
              className="h-3"
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Learning Section */}
        <Card 
          className="overflow-hidden border-2 hover:border-primary transition-all duration-300 cursor-pointer hover:scale-105 group"
          onClick={() => onSectionSelect('learning')}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative">
              <div className="gradient-primary w-24 h-24 mx-auto rounded-full flex items-center justify-center pulse-glow">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold">
                !
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-foreground">📚 Learning</h3>
              <p className="text-lg text-muted-foreground">
                {profile.disabilityType === 'visual' 
                  ? 'Listen to stories and lessons' 
                  : 'Watch colorful lessons and animations'
                }
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-center space-x-2">
                <Badge variant="outline">English</Badge>
                <Badge variant="outline">Math</Badge>
                <Badge variant="outline">Kannada</Badge>
              </div>
            </div>
            
            <Button 
              className="w-full text-xl py-6 rounded-xl font-semibold gradient-primary text-white border-0 group-hover:scale-105 transition-transform duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onSectionSelect('learning');
              }}
            >
              <Play className="w-6 h-6 mr-2" />
              Start Learning
            </Button>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card 
          className="overflow-hidden border-2 hover:border-success transition-all duration-300 cursor-pointer hover:scale-105 group"
          onClick={() => onSectionSelect('quiz')}
        >
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative">
              <div className="gradient-success w-24 h-24 mx-auto rounded-full flex items-center justify-center pulse-glow">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-warning text-white flex items-center justify-center text-xs font-bold">
                {progress.totalQuizzes - progress.completedQuizzes}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-foreground">🧠 Quiz Time</h3>
              <p className="text-lg text-muted-foreground">
                {profile.disabilityType === 'visual' 
                  ? 'Answer questions by voice' 
                  : 'Fun quizzes with pictures'
                }
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-center space-x-2">
                <Badge variant="outline" className="bg-yellow-100">
                  <Star className="w-3 h-3 mr-1" />
                  Earn Stars
                </Badge>
                <Badge variant="outline" className="bg-purple-100">
                  <Trophy className="w-3 h-3 mr-1" />
                  Win Badges
                </Badge>
              </div>
            </div>
            
            <Button 
              className="w-full text-xl py-6 rounded-xl font-semibold gradient-success text-white border-0 group-hover:scale-105 transition-transform duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onSectionSelect('quiz');
              }}
            >
              <Target className="w-6 h-6 mr-2" />
              Take Quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Highlights */}
      <Card className="border-2 border-accent/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-accent" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎯', title: 'Quiz Master', desc: '5 quizzes completed' },
              { icon: '📖', title: 'Story Reader', desc: '10 stories read' },
              { icon: '⭐', title: 'Star Collector', desc: '20+ stars earned' },
              { icon: '🚀', title: 'Fast Learner', desc: 'Level 3 reached' }
            ].map((achievement, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-muted/50 hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};