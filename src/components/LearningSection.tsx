import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Book, 
  Calculator, 
  Globe, 
  Volume2, 
  Play, 
  Pause,
  RotateCcw,
  ChevronRight,
  Star,
  CheckCircle
} from "lucide-react";
import { StudentProfile } from "./StudentProfile";

interface LearningSectionProps {
  profile: StudentProfile;
  onBack: () => void;
}

interface Subject {
  id: string;
  name: string;
  nameKannada?: string;
  icon: any;
  color: string;
  levels: Level[];
}

interface Level {
  id: string;
  name: string;
  nameKannada?: string;
  difficulty: 'basic' | 'medium' | 'hard';
  completed: boolean;
  content: ContentItem[];
}

interface ContentItem {
  id: string;
  title: string;
  titleKannada?: string;
  type: 'story' | 'lesson' | 'rhyme';
  audioUrl?: string;
  content: string;
  contentKannada?: string;
  completed: boolean;
}

export const LearningSection = ({ profile, onBack }: LearningSectionProps) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const subjects: Subject[] = [
    {
      id: 'english',
      name: 'English',
      nameKannada: 'ಇಂಗ್ಲಿಷ್',
      icon: Globe,
      color: 'gradient-primary',
      levels: [
        {
          id: 'basic',
          name: 'Letters & Sounds',
          nameKannada: 'ಅಕ್ಷರಗಳು ಮತ್ತು ಶಬ್ದಗಳು',
          difficulty: 'basic',
          completed: true,
          content: [
            {
              id: 'alphabet',
              title: 'The ABC Song',
              titleKannada: 'ಎಬಿಸಿ ಹಾಡು',
              type: 'rhyme',
              content: 'A-B-C-D-E-F-G... H-I-J-K-L-M-N-O-P... Q-R-S... T-U-V... W-X-Y and Z! Now I know my ABCs, next time won\'t you sing with me?',
              contentKannada: 'ಎ-ಬಿ-ಸಿ-ಡಿ-ಇ-ಎಫ್-ಜಿ... ಈಗ ನಾನು ನನ್ನ ಎಬಿಸಿಗಳನ್ನು ತಿಳಿದಿದ್ದೇನೆ!',
              completed: true
            }
          ]
        },
        {
          id: 'medium',
          name: 'Simple Words',
          nameKannada: 'ಸರಳ ಪದಗಳು',
          difficulty: 'medium',
          completed: false,
          content: [
            {
              id: 'cat-story',
              title: 'The Little Cat',
              titleKannada: 'ಚಿಕ್ಕ ಬೆಕ್ಕು',
              type: 'story',
              content: 'Once upon a time, there was a little cat named Whiskers. Whiskers loved to play in the garden.',
              contentKannada: 'ಒಂದು ಕಾಲದಲ್ಲಿ, ವಿಸ್ಕರ್ಸ್ ಎಂಬ ಚಿಕ್ಕ ಬೆಕ್ಕು ಇತ್ತು.',
              completed: false
            }
          ]
        }
      ]
    },
    {
      id: 'math',
      name: 'Math',
      nameKannada: 'ಗಣಿತ',
      icon: Calculator,
      color: 'gradient-success',
      levels: [
        {
          id: 'basic',
          name: 'Numbers 1-10',
          nameKannada: '೧ ರಿಂದ ೧೦ ಸಂಖ್ಯೆಗಳು',
          difficulty: 'basic',
          completed: true,
          content: [
            {
              id: 'counting',
              title: 'Counting Song',
              titleKannada: 'ಎಣಿಕೆ ಹಾಡು',
              type: 'rhyme',
              content: 'One, two, buckle my shoe. Three, four, knock at the door. Five, six, pick up sticks!',
              contentKannada: 'ಒಂದು, ಎರಡು, ಮೂರು, ನಾಲ್ಕು, ಐದು!',
              completed: true
            }
          ]
        }
      ]
    },
    {
      id: 'kannada',
      name: 'Kannada',
      nameKannada: 'ಕನ್ನಡ',
      icon: Book,
      color: 'gradient-accent',
      levels: [
        {
          id: 'basic',
          name: 'Kannada Letters',
          nameKannada: 'ಕನ್ನಡ ಅಕ್ಷರಗಳು',
          difficulty: 'basic',
          completed: false,
          content: [
            {
              id: 'vowels',
              title: 'Vowels Song',
              titleKannada: 'ಸ್ವರಗಳ ಹಾಡು',
              type: 'rhyme',
              content: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ',
              completed: false
            }
          ]
        }
      ]
    }
  ];

  const handlePlayAudio = () => {
    // In a real app, this would play the actual audio
    setIsPlaying(!isPlaying);
    if (profile.disabilityType === 'visual') {
      // Simulate text-to-speech for visually impaired users
      console.log('Playing audio for:', selectedContent?.title);
    }
  };

  const getText = (english: string, kannada?: string) => {
    return profile.language === 'kannada' && kannada ? kannada : english;
  };

  // Subject Selection View
  if (!selectedSubject) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="p-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Choose a Subject</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const IconComponent = subject.icon;
            const completedLevels = subject.levels.filter(level => level.completed).length;
            const totalLevels = subject.levels.length;
            
            return (
              <Card 
                key={subject.id}
                className="cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
                onClick={() => setSelectedSubject(subject)}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className={`w-20 h-20 mx-auto rounded-full ${subject.color} flex items-center justify-center`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">
                      {getText(subject.name, subject.nameKannada)}
                    </h3>
                    <Progress value={(completedLevels / totalLevels) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {completedLevels} of {totalLevels} levels completed
                    </p>
                  </div>

                  <Button className={`w-full ${subject.color} text-white border-0`}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Level Selection View
  if (!selectedLevel) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setSelectedSubject(null)} className="p-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {getText(selectedSubject.name, selectedSubject.nameKannada)} Levels
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedSubject.levels.map((level) => {
            const difficultyColors = {
              basic: 'bg-green-100 text-green-800',
              medium: 'bg-yellow-100 text-yellow-800',
              hard: 'bg-red-100 text-red-800'
            };

            return (
              <Card 
                key={level.id}
                className="cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
                onClick={() => setSelectedLevel(level)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={difficultyColors[level.difficulty]}>
                      {level.difficulty.toUpperCase()}
                    </Badge>
                    {level.completed && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-bold">
                    {getText(level.name, level.nameKannada)}
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {level.content.length} lesson{level.content.length !== 1 ? 's' : ''}
                    </p>
                    <Progress 
                      value={(level.content.filter(c => c.completed).length / level.content.length) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <Button className="w-full">
                    <ChevronRight className="w-4 h-4 ml-2" />
                    Enter Level
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Content View
  if (!selectedContent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setSelectedLevel(null)} className="p-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {getText(selectedLevel.name, selectedLevel.nameKannada)}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedLevel.content.map((content) => (
            <Card 
              key={content.id}
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
              onClick={() => setSelectedContent(content)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={content.type === 'story' ? 'default' : 'secondary'}>
                    {content.type.toUpperCase()}
                  </Badge>
                  {content.completed && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold">
                  {getText(content.title, content.titleKannada)}
                </h3>
                
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  {content.type === 'story' ? 'Read Story' : 'Start Lesson'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Content Detail View
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => setSelectedContent(null)} className="p-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">
          {getText(selectedContent.title, selectedContent.titleKannada)}
        </h1>
      </div>

      <Card className="border-2">
        <CardHeader className={`${selectedSubject.color} text-white`}>
          <CardTitle className="text-2xl flex items-center justify-between">
            {getText(selectedContent.title, selectedContent.titleKannada)}
            <Badge variant="outline" className="bg-white/20 text-white border-white/40">
              {selectedContent.type.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Audio Controls for Visual Impairment */}
          {profile.disabilityType === 'visual' && (
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handlePlayAudio}
                size="lg"
                className="gradient-primary text-white border-0"
              >
                {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                {isPlaying ? 'Pause' : 'Listen'}
              </Button>
              
              <Button variant="outline" size="lg">
                <RotateCcw className="w-6 h-6 mr-2" />
                Repeat
              </Button>
              
              <Button variant="outline" size="lg">
                <Volume2 className="w-6 h-6 mr-2" />
                Speed
              </Button>
            </div>
          )}

          {/* Content Display */}
          <div className={`text-center space-y-6 ${profile.disabilityType === 'cognitive' ? 'large-text' : ''}`}>
            <div className="text-2xl leading-relaxed p-8 bg-muted/50 rounded-xl">
              {getText(selectedContent.content, selectedContent.contentKannada)}
            </div>
            
            {profile.disabilityType === 'cognitive' && (
              <div className="text-6xl animate-bounce">
                {selectedContent.type === 'story' ? '📖' : selectedContent.type === 'rhyme' ? '🎵' : '📚'}
              </div>
            )}
          </div>

          {/* Completion Actions */}
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className="gradient-success text-white border-0"
              onClick={() => {
                // Mark as completed and go back
                selectedContent.completed = true;
                setSelectedContent(null);
              }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark Complete
            </Button>
            
            <Button variant="outline" size="lg">
              <Star className="w-5 h-5 mr-2" />
              Favorite
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};