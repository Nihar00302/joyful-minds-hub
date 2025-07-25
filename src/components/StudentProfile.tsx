import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Brain, Globe, Volume2 } from "lucide-react";

interface StudentProfileProps {
  onProfileComplete: (profile: StudentProfile) => void;
}

export interface StudentProfile {
  name: string;
  age: number;
  disabilityType: 'visual' | 'cognitive';
  language: 'english' | 'kannada';
  accessibilityNeeds: {
    largeText: boolean;
    highContrast: boolean;
    audioFirst: boolean;
  };
}

export const StudentProfile = ({ onProfileComplete }: StudentProfileProps) => {
  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    age: 5,
    disabilityType: 'visual',
    language: 'english',
    accessibilityNeeds: {
      largeText: false,
      highContrast: false,
      audioFirst: false
    }
  });

  const handleSubmit = () => {
    if (profile.name.trim()) {
      onProfileComplete(profile);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Let's set up your profile!</h2>
        <p className="text-lg text-muted-foreground">Tell us about yourself so we can make learning perfect for you</p>
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader className="gradient-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">Student Information</CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Name Input */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-semibold">What's your name?</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="text-lg py-3 rounded-xl border-2"
            />
          </div>

          {/* Age Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">How old are you?</Label>
            <Select onValueChange={(value) => setProfile({ ...profile, age: parseInt(value) })}>
              <SelectTrigger className="text-lg py-3 rounded-xl border-2">
                <SelectValue placeholder="Select your age" />
              </SelectTrigger>
              <SelectContent>
                {[5, 6, 7, 8, 9, 10].map((age) => (
                  <SelectItem key={age} value={age.toString()} className="text-lg">
                    {age} years old
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Disability Type */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">How can we help you learn best?</Label>
            <RadioGroup
              value={profile.disabilityType}
              onValueChange={(value) => setProfile({ ...profile, disabilityType: value as 'visual' | 'cognitive' })}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-primary transition-colors">
                <RadioGroupItem value="visual" id="visual" className="w-5 h-5" />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="visual" className="text-lg font-medium cursor-pointer">
                      I have trouble seeing (Visual Support)
                    </Label>
                    <p className="text-sm text-muted-foreground">Audio-first learning with voice guidance</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-xl border-2 hover:border-primary transition-colors">
                <RadioGroupItem value="cognitive" id="cognitive" className="w-5 h-5" />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="cognitive" className="text-lg font-medium cursor-pointer">
                      I learn better with pictures (Cognitive Support)
                    </Label>
                    <p className="text-sm text-muted-foreground">Visual learning with animations and colors</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Language Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Which language do you prefer?</Label>
            <RadioGroup
              value={profile.language}
              onValueChange={(value) => setProfile({ ...profile, language: value as 'english' | 'kannada' })}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 hover:border-primary transition-colors">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english" className="text-lg font-medium cursor-pointer flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>English</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 hover:border-primary transition-colors">
                <RadioGroupItem value="kannada" id="kannada" />
                <Label htmlFor="kannada" className="text-lg font-medium cursor-pointer flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>ಕನ್ನಡ</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!profile.name.trim()}
            className="w-full text-xl py-6 rounded-xl font-semibold gradient-primary text-white border-0 hover:scale-105 transition-transform duration-200"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            Start Learning Journey! 🚀
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};