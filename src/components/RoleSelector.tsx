import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, GraduationCap } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: 'student' | 'parent' | 'teacher') => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'I want to learn and play!',
      icon: User,
      gradient: 'gradient-primary',
      delay: 0
    },
    {
      id: 'parent' as const,
      title: 'Parent',
      description: 'Track my child\'s progress',
      icon: Users,
      gradient: 'gradient-success',
      delay: 200
    },
    {
      id: 'teacher' as const,
      title: 'Teacher',
      description: 'Create lessons and quizzes',
      icon: GraduationCap,
      gradient: 'gradient-accent',
      delay: 400
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Who are you?</h2>
        <p className="text-lg text-muted-foreground">Choose your role to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <Card 
              key={role.id}
              className="overflow-hidden border-2 hover:border-primary transition-all duration-300 animate-fade-in hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${role.delay}ms` }}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className={`w-20 h-20 mx-auto rounded-full ${role.gradient} flex items-center justify-center float-animation`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">{role.title}</h3>
                  <p className="text-muted-foreground text-lg">{role.description}</p>
                </div>
                
                <Button 
                  className="w-full text-lg py-6 rounded-xl font-semibold gradient-primary text-white border-0 hover:scale-105 transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRoleSelect(role.id);
                  }}
                >
                  Select {role.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};