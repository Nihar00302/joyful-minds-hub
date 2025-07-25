import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  ArrowLeft,
  CheckCircle,
  X,
  Star,
  Trophy
} from "lucide-react";

interface QuizSectionProps {
  language: 'english' | 'kannada';
  disabilityType: 'visual' | 'cognitive';
  onBack: () => void;
}

interface Question {
  id: string;
  question: string;
  questionKannada?: string;
  options: string[];
  optionsKannada?: string[];
  correctAnswer: number;
  audioQuestion?: string;
}

export const QuizSection = ({ language, disabilityType, onBack }: QuizSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceAnswer, setVoiceAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | string | null)[]>([]);

  const questions: Question[] = [
    {
      id: '1',
      question: 'What letter comes after A?',
      questionKannada: 'A ನಂತರ ಯಾವ ಅಕ್ಷರ ಬರುತ್ತದೆ?',
      options: ['B', 'C', 'D', 'E'],
      optionsKannada: ['ಬಿ', 'ಸಿ', 'ಡಿ', 'ಇ'],
      correctAnswer: 0
    },
    {
      id: '2',
      question: 'How many fingers do you have on one hand?',
      questionKannada: 'ಒಂದು ಕೈಯಲ್ಲಿ ಎಷ್ಟು ಬೆರಳುಗಳಿವೆ?',
      options: ['3', '4', '5', '6'],
      optionsKannada: ['೩', '೪', '೫', '೬'],
      correctAnswer: 2
    },
    {
      id: '3',
      question: 'What sound does a cat make?',
      questionKannada: 'ಬೆಕ್ಕು ಯಾವ ಶಬ್ದ ಮಾಡುತ್ತದೆ?',
      options: ['Woof', 'Meow', 'Moo', 'Quack'],
      optionsKannada: ['ವೂಫ್', 'ಮಿಯಾವ್', 'ಮೂ', 'ಕ್ವ್ಯಾಕ್'],
      correctAnswer: 1
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const getText = (english: string, kannada?: string) => {
    return language === 'kannada' && kannada ? kannada : english;
  };

  const handleVoiceRecording = () => {
    if (disabilityType === 'visual') {
      setIsRecording(!isRecording);
      
      // Simulate voice recognition
      if (!isRecording) {
        setTimeout(() => {
          const mockAnswer = "B"; // Simulated voice answer
          setVoiceAnswer(mockAnswer);
          setIsRecording(false);
        }, 2000);
      }
    }
  };

  const playQuestionAudio = () => {
    // Text-to-speech simulation for visually impaired users
    if (disabilityType === 'visual') {
      console.log('Playing audio:', getText(currentQuestion.question, currentQuestion.questionKannada));
    }
  };

  const handleAnswerSubmit = () => {
    const userAnswer = disabilityType === 'visual' ? voiceAnswer : selectedAnswer;
    const isCorrect = disabilityType === 'visual' 
      ? voiceAnswer.toLowerCase() === currentQuestion.options[currentQuestion.correctAnswer].toLowerCase()
      : selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = userAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setVoiceAnswer('');
    } else {
      setIsQuizComplete(true);
    }
  };

  // Quiz Results View
  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto rounded-full gradient-success flex items-center justify-center">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold">
            {getText('Quiz Complete!', 'ಕ್ವಿಜ್ ಮುಗಿದಿದೆ!')}
          </h1>
          
          <div className="text-6xl">{percentage >= 70 ? '🎉' : '📚'}</div>
          
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Your Score</h3>
                <div className="text-4xl font-bold text-primary">{score}/{questions.length}</div>
                <div className="text-xl text-muted-foreground">{percentage}%</div>
              </div>
              
              <Progress value={percentage} className="h-4" />
              
              <div className="flex justify-center space-x-4">
                <Button onClick={onBack} variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </Button>
                
                <Button 
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setScore(0);
                    setIsQuizComplete(false);
                    setAnswers([]);
                  }}
                  className="gradient-primary text-white border-0"
                  size="lg"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz Question View
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="p-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {getText('Quiz Time!', 'ಕ್ವಿಜ್ ಸಮಯ!')}
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Score: {score}/{questions.length}
        </Badge>
      </div>

      <Progress value={progress} className="h-3" />

      <Card className="border-2">
        <CardHeader className="gradient-primary text-white">
          <CardTitle className="text-2xl text-center">
            {getText('Question', 'ಪ್ರಶ್ನೆ')} {currentQuestionIndex + 1}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Question */}
          <div className="text-center space-y-4">
            <h3 className={`text-2xl font-bold ${disabilityType === 'cognitive' ? 'text-3xl' : ''}`}>
              {getText(currentQuestion.question, currentQuestion.questionKannada)}
            </h3>
            
            {disabilityType === 'visual' && (
              <Button onClick={playQuestionAudio} className="gradient-accent text-white border-0">
                <Volume2 className="w-5 h-5 mr-2" />
                {getText('Listen to Question', 'ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ')}
              </Button>
            )}
          </div>

          {/* Answer Options for Cognitive Users */}
          {disabilityType === 'cognitive' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`text-xl py-8 ${selectedAnswer === index ? 'gradient-primary text-white border-0' : ''}`}
                  onClick={() => setSelectedAnswer(index)}
                >
                  {language === 'kannada' && currentQuestion.optionsKannada 
                    ? currentQuestion.optionsKannada[index] 
                    : option}
                </Button>
              ))}
            </div>
          )}

          {/* Voice Input for Visual Users */}
          {disabilityType === 'visual' && (
            <div className="text-center space-y-6">
              <div className="text-lg">
                {getText('Speak your answer or use the microphone', 'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಹೇಳಿ ಅಥವಾ ಮೈಕ್ರೊಫೋನ್ ಬಳಸಿ')}
              </div>
              
              <Button
                onClick={handleVoiceRecording}
                className={`text-xl py-8 px-12 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'gradient-primary'} text-white border-0`}
                size="lg"
              >
                {isRecording ? <MicOff className="w-8 h-8 mr-3" /> : <Mic className="w-8 h-8 mr-3" />}
                {isRecording 
                  ? getText('Recording...', 'ರೆಕಾರ್ಡಿಂಗ್...') 
                  : getText('Start Recording', 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ')}
              </Button>
              
              {voiceAnswer && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg">
                    {getText('Your answer:', 'ನಿಮ್ಮ ಉತ್ತರ:')} <strong>{voiceAnswer}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnswerSubmit}
              disabled={(disabilityType === 'cognitive' && selectedAnswer === null) || 
                       (disabilityType === 'visual' && !voiceAnswer)}
              className="gradient-success text-white border-0 text-xl py-6 px-12"
              size="lg"
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              {currentQuestionIndex === questions.length - 1 
                ? getText('Finish Quiz', 'ಕ್ವಿಜ್ ಮುಗಿಸಿ')
                : getText('Next Question', 'ಮುಂದಿನ ಪ್ರಶ್ನೆ')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};