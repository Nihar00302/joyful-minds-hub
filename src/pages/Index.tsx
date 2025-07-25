import { useState } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { AuthForm } from "@/components/AuthForm";
import { StudentProfile } from "@/components/StudentProfile";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { ParentDashboard } from "@/components/ParentDashboard";

type AppState = 'role-selection' | 'auth' | 'student-profile' | 'student-dashboard' | 'teacher-dashboard' | 'parent-dashboard';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('role-selection');
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | 'teacher' | null>(null);
  const [userData, setUserData] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);

  const handleRoleSelect = (role: 'student' | 'parent' | 'teacher') => {
    setSelectedRole(role);
    setCurrentState('auth');
  };

  const handleAuthComplete = (authData: any) => {
    setUserData(authData);
    if (authData.role === 'student') {
      setCurrentState('student-profile');
    } else if (authData.role === 'teacher') {
      setCurrentState('teacher-dashboard');
    } else if (authData.role === 'parent') {
      setCurrentState('parent-dashboard');
    }
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'role-selection':
        return <RoleSelector onRoleSelect={handleRoleSelect} />;
      
      case 'auth':
        return (
          <AuthForm 
            role={selectedRole!} 
            onAuthComplete={handleAuthComplete}
          />
        );
      
      case 'student-profile':
        return (
          <StudentProfile 
            onProfileComplete={(profile) => {
              setStudentProfile(profile);
              setCurrentState('student-dashboard');
            }} 
          />
        );
      
      case 'student-dashboard':
        return (
          <StudentDashboard 
            profile={studentProfile} 
            onBack={() => setCurrentState('role-selection')} 
          />
        );
      
      case 'teacher-dashboard':
        return (
          <TeacherDashboard 
            onBack={() => setCurrentState('role-selection')} 
          />
        );
      
      case 'parent-dashboard':
        return (
          <ParentDashboard 
            onBack={() => setCurrentState('role-selection')} 
          />
        );
      
      default:
        return <RoleSelector onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {renderCurrentState()}
      </div>
    </div>
  );
};

export default Index;