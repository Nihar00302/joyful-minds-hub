import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  ArrowLeft,
  Star,
  CheckCircle
} from "lucide-react";

interface VideoLearningProps {
  subject: string;
  language: 'english' | 'kannada';
  disabilityType: 'visual' | 'cognitive';
  onBack: () => void;
}

interface VideoContent {
  id: string;
  title: string;
  titleKannada?: string;
  difficulty: 'basic' | 'medium' | 'hard';
  duration: string;
  videoUrl: string;
  description: string;
  descriptionKannada?: string;
  completed: boolean;
}

export const VideoLearning = ({ subject, language, disabilityType, onBack }: VideoLearningProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'basic' | 'medium' | 'hard' | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoContent: VideoContent[] = [
    {
      id: 'basic-1',
      title: 'Learning the Alphabet',
      titleKannada: 'ವರ್ಣಮಾಲೆ ಕಲಿಯುವುದು',
      difficulty: 'basic',
      duration: '5:30',
      videoUrl: '/placeholder-video.mp4',
      description: 'Learn letters A to Z with fun animations and sounds',
      descriptionKannada: 'ಮೋಜಿನ ಅನಿಮೇಷನ್‌ಗಳು ಮತ್ತು ಶಬ್ದಗಳೊಂದಿಗೆ A ರಿಂದ Z ವರೆಗಿನ ಅಕ್ಷರಗಳನ್ನು ಕಲಿಯಿರಿ',
      completed: true
    },
    {
      id: 'basic-2',
      title: 'Numbers 1 to 10',
      titleKannada: '೧ ರಿಂದ ೧೦ ಸಂಖ್ಯೆಗಳು',
      difficulty: 'basic',
      duration: '4:15',
      videoUrl: '/placeholder-video.mp4',
      description: 'Count from 1 to 10 with colorful visuals',
      descriptionKannada: 'ವರ್ಣಮಯ ದೃಶ್ಯಗಳೊಂದಿಗೆ ೧ ರಿಂದ ೧೦ ವರೆಗೆ ಎಣಿಕೆ',
      completed: false
    },
    {
      id: 'medium-1',
      title: 'Simple Words',
      titleKannada: 'ಸರಳ ಪದಗಳು',
      difficulty: 'medium',
      duration: '7:20',
      videoUrl: '/placeholder-video.mp4',
      description: 'Form and pronounce simple three-letter words',
      descriptionKannada: 'ಸರಳ ಮೂರಕ್ಷರ ಪದಗಳನ್ನು ರೂಪಿಸಿ ಮತ್ತು ಉಚ್ಚರಿಸಿ',
      completed: false
    },
    {
      id: 'hard-1',
      title: 'Story Time',
      titleKannada: 'ಕಥೆಯ ಸಮಯ',
      difficulty: 'hard',
      duration: '12:45',
      videoUrl: '/placeholder-video.mp4',
      description: 'Listen to engaging stories with moral lessons',
      descriptionKannada: 'ನೈತಿಕ ಪಾಠಗಳೊಂದಿಗೆ ಆಕರ್ಷಕ ಕಥೆಗಳನ್ನು ಕೇಳಿ',
      completed: false
    }
  ];

  const difficultyLevels = [
    { level: 'basic', name: 'Basic', nameKannada: 'ಮೂಲಭೂತ', color: 'bg-green-500', description: 'Letters & Numbers' },
    { level: 'medium', name: 'Medium', nameKannada: 'ಮಧ್ಯಮ', color: 'bg-yellow-500', description: 'Words & Sentences' },
    { level: 'hard', name: 'Hard', nameKannada: 'ಕಠಿಣ', color: 'bg-red-500', description: 'Stories & Comprehension' }
  ];

  const getText = (english: string, kannada?: string) => {
    return language === 'kannada' && kannada ? kannada : english;
  };

  const filteredVideos = selectedDifficulty 
    ? videoContent.filter(video => video.difficulty === selectedDifficulty)
    : videoContent;

  const simulateVideoPlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 200);
    }
  };

  // Difficulty Selection View
  if (!selectedDifficulty) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="p-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {getText('Choose Difficulty Level', 'ಕಷ್ಟದ ಮಟ್ಟವನ್ನು ಆರಿಸಿ')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultyLevels.map((level) => {
            const levelVideos = videoContent.filter(video => video.difficulty === level.level);
            const completedVideos = levelVideos.filter(video => video.completed).length;
            
            return (
              <Card 
                key={level.level}
                className="cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
                onClick={() => setSelectedDifficulty(level.level as 'basic' | 'medium' | 'hard')}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className={`w-20 h-20 mx-auto rounded-full ${level.color} flex items-center justify-center`}>
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">
                      {getText(level.name, level.nameKannada)}
                    </h3>
                    <p className="text-muted-foreground">{level.description}</p>
                    <Progress value={(completedVideos / levelVideos.length) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {completedVideos} of {levelVideos.length} videos completed
                    </p>
                  </div>

                  <Button className="w-full gradient-primary text-white border-0">
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

  // Video Selection View
  if (!selectedVideo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setSelectedDifficulty(null)} className="p-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level Videos
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card 
              key={video.id}
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
              onClick={() => setSelectedVideo(video)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={
                    video.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
                    video.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {video.difficulty.toUpperCase()}
                  </Badge>
                  {video.completed && (
                    <CheckCircle className="w-6 h-6 text-success" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-muted-foreground" />
                </div>
                
                <h3 className="text-xl font-bold">
                  {getText(video.title, video.titleKannada)}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {getText(video.description, video.descriptionKannada)}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{video.duration}</span>
                  <Button size="sm" className="gradient-primary text-white border-0">
                    <Play className="w-4 h-4 mr-2" />
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Video Player View
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => setSelectedVideo(null)} className="p-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">
          {getText(selectedVideo.title, selectedVideo.titleKannada)}
        </h1>
      </div>

      <Card className="border-2">
        <CardContent className="p-8 space-y-6">
          {/* Video Player */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-center space-y-4">
              <div className="text-6xl">📹</div>
              <p className="text-lg font-medium">Video Player Placeholder</p>
              <p className="text-sm text-muted-foreground">
                {getText(selectedVideo.description, selectedVideo.descriptionKannada)}
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-4 left-4 right-4">
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Video Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button onClick={simulateVideoPlay} size="lg" className="gradient-primary text-white border-0">
              {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button variant="outline" size="lg" onClick={() => setProgress(0)}>
              <RotateCcw className="w-6 h-6 mr-2" />
              Restart
            </Button>
            
            <Button variant="outline" size="lg" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="w-6 h-6 mr-2" /> : <Volume2 className="w-6 h-6 mr-2" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
          </div>

          {/* Completion Actions */}
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className="gradient-success text-white border-0"
              onClick={() => {
                selectedVideo.completed = true;
                setSelectedVideo(null);
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