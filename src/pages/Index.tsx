import { useState } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { StudentProfile, StudentProfile as StudentProfileComponent } from "@/components/StudentProfile";
import { StudentDashboard } from "@/components/StudentDashboard";
import { LearningSection } from "@/components/LearningSection";
import { Button } from "@/components/ui/button";
import { Volume2, Settings, Accessibility } from "lucide-react";

type UserRole = 'student' | 'parent' | 'teacher' | null;
type AppState = 'role-selection' | 'student-profile' | 'dashboard' | 'learning' | 'quiz';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [appState, setAppState] = useState<AppState>('role-selection');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === 'student') {
      setAppState('student-profile');
    } else {
      // For parent/teacher, go directly to their respective dashboards
      setAppState('dashboard');
    }
  };

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setAppState('dashboard');
    
    // Apply accessibility settings based on profile
    if (profile.disabilityType === 'visual') {
      setAudioEnabled(true);
    }
  };

  const handleSectionSelect = (section: 'learning' | 'quiz') => {
    setAppState(section);
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  // Landing Page for first-time visitors
  if (appState === 'role-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Accessibility Controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="border-2"
          >
            <Volume2 className={`w-4 h-4 ${audioEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHighContrast(!highContrast)}
            className="border-2"
          >
            <Accessibility className={`w-4 h-4 ${highContrast ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <div className="gradient-rainbow w-32 h-32 rounded-full mx-auto flex items-center justify-center float-animation">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-4xl">🌟</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-success to-accent bg-clip-text text-transparent">
                Learn & Grow
              </h1>
              
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A personalized learning platform designed for children with special needs. 
                Every child learns differently, and that's beautiful! 🌈
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
              <div className="space-y-3 p-6 rounded-xl bg-card border border-primary/20">
                <div className="text-4xl">🎧</div>
                <h3 className="text-xl font-semibold">Audio-First Learning</h3>
                <p className="text-muted-foreground">Perfect for visually impaired children with voice guidance</p>
              </div>
              
              <div className="space-y-3 p-6 rounded-xl bg-card border border-success/20">
                <div className="text-4xl">🎨</div>
                <h3 className="text-xl font-semibold">Visual & Interactive</h3>
                <p className="text-muted-foreground">Colorful animations for cognitive development</p>
              </div>
              
              <div className="space-y-3 p-6 rounded-xl bg-card border border-accent/20">
                <div className="text-4xl">🏆</div>
                <h3 className="text-xl font-semibold">Gamified Progress</h3>
                <p className="text-muted-foreground">Earn stars, badges, and celebrate achievements</p>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <RoleSelector onRoleSelect={handleRoleSelect} />

          {/* Footer */}
          <div className="text-center mt-16 space-y-4">
            <p className="text-lg text-muted-foreground">
              Supporting <span className="font-semibold text-primary">Kannada</span> and <span className="font-semibold text-primary">English</span> • Ages 5-10
            </p>
            
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <span>✓ Screen Reader Compatible</span>
              <span>✓ Voice Commands</span>
              <span>✓ Large Text Options</span>
              <span>✓ High Contrast Mode</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student Profile Setup
  if (appState === 'student-profile' && userRole === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="container mx-auto px-4 py-16">
          <StudentProfileComponent onProfileComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  // Student Dashboard
  if (appState === 'dashboard' && userRole === 'student' && studentProfile) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 ${highContrast ? 'high-contrast' : ''}`}>
        {/* Top Navigation */}
        <nav className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-white font-bold">
                  {studentProfile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="font-semibold">Welcome, {studentProfile.name}!</h2>
                <p className="text-sm text-muted-foreground">Ready to learn today?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                <Volume2 className={`w-4 h-4 ${audioEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <StudentDashboard 
            profile={studentProfile} 
            onSectionSelect={handleSectionSelect}
          />
        </div>
      </div>
    );
  }

  // Learning Section
  if (appState === 'learning' && studentProfile) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 ${highContrast ? 'high-contrast' : ''}`}>
        <div className="container mx-auto px-4 py-8">
          <LearningSection 
            profile={studentProfile} 
            onBack={handleBackToDashboard}
          />
        </div>
      </div>
    );
  }

  // Quiz Section (placeholder for now)
  if (appState === 'quiz' && studentProfile) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 ${highContrast ? 'high-contrast' : ''}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold">🧠 Quiz Section</h1>
            <p className="text-xl text-muted-foreground">Quiz functionality coming soon!</p>
            <Button onClick={handleBackToDashboard} size="lg" className="gradient-primary text-white">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Parent/Teacher dashboards (placeholder)
  if (appState === 'dashboard' && (userRole === 'parent' || userRole === 'teacher')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold">
              {userRole === 'parent' ? '👨‍👩‍👧 Parent Dashboard' : '👩‍🏫 Teacher Dashboard'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {userRole === 'parent' 
                ? 'Monitor your child\'s learning progress and achievements'
                : 'Create lessons, upload content, and track student progress'
              }
            </p>
            <p className="text-lg text-primary">Coming soon in the next update!</p>
            <Button onClick={() => setAppState('role-selection')} size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Learn & Grow</h1>
        <p className="text-xl text-muted-foreground">Something went wrong. Let's start over!</p>
        <Button onClick={() => setAppState('role-selection')} className="mt-4">
          Start Again
        </Button>
      </div>
    </div>
  );
};

export default Index;