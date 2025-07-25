import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface AuthFormProps {
  role: 'student' | 'parent' | 'teacher';
  onAuthComplete: (userData: any) => void;
}

export const AuthForm = ({ role, onAuthComplete }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (isLogin: boolean) => {
    if (authData.email && authData.password && (isLogin || authData.name)) {
      onAuthComplete({
        ...authData,
        role,
        id: Math.random().toString(36).substr(2, 9)
      });
    }
  };

  const roleConfig = {
    student: {
      title: "Student Portal",
      subtitle: "Ready to learn and explore?",
      gradient: "gradient-primary"
    },
    parent: {
      title: "Parent Portal", 
      subtitle: "Track your child's learning journey",
      gradient: "gradient-success"
    },
    teacher: {
      title: "Teacher Portal",
      subtitle: "Create and manage learning content",
      gradient: "gradient-accent"
    }
  };

  const config = roleConfig[role];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className={`w-20 h-20 mx-auto rounded-full ${config.gradient} flex items-center justify-center`}>
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold">{config.title}</h2>
        <p className="text-muted-foreground">{config.subtitle}</p>
      </div>

      <Card className="border-2">
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={authData.email}
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={authData.password}
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => handleSubmit(true)}
                className={`w-full ${config.gradient} text-white border-0`}
                disabled={!authData.email || !authData.password}
              >
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={authData.name}
                    onChange={(e) => setAuthData({...authData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={authData.email}
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    value={authData.password}
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => handleSubmit(false)}
                className={`w-full ${config.gradient} text-white border-0`}
                disabled={!authData.email || !authData.password || !authData.name}
              >
                Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};