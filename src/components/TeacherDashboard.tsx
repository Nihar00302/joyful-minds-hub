import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Users, 
  BookOpen, 
  TrendingUp,
  FileVideo,
  FileText,
  Mic,
  BarChart3,
  Eye,
  ArrowLeft
} from "lucide-react";

interface TeacherDashboardProps {
  onBack: () => void;
}

interface Student {
  id: string;
  name: string;
  age: number;
  disabilityType: 'visual' | 'cognitive';
  progress: {
    videosWatched: number;
    quizzesCompleted: number;
    averageScore: number;
  };
}

interface Content {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text';
  subject: string;
  difficulty: 'basic' | 'medium' | 'hard';
  uploadDate: string;
}

export const TeacherDashboard = ({ onBack }: TeacherDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState("upload");
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    difficulty: '',
    type: '',
    description: '',
    file: null as File | null
  });

  const students: Student[] = [
    {
      id: '1',
      name: 'Arjun Kumar',
      age: 7,
      disabilityType: 'visual',
      progress: {
        videosWatched: 12,
        quizzesCompleted: 8,
        averageScore: 85
      }
    },
    {
      id: '2',
      name: 'Priya Sharma',
      age: 6,
      disabilityType: 'cognitive',
      progress: {
        videosWatched: 15,
        quizzesCompleted: 10,
        averageScore: 92
      }
    },
    {
      id: '3',
      name: 'Rahul Patel',
      age: 8,
      disabilityType: 'visual',
      progress: {
        videosWatched: 9,
        quizzesCompleted: 6,
        averageScore: 78
      }
    }
  ];

  const uploadedContent: Content[] = [
    {
      id: '1',
      title: 'Alphabet Song',
      type: 'video',
      subject: 'English',
      difficulty: 'basic',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Counting Numbers',
      type: 'audio',
      subject: 'Math',
      difficulty: 'basic',
      uploadDate: '2024-01-16'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUploadSubmit = () => {
    if (uploadForm.title && uploadForm.subject && uploadForm.difficulty && uploadForm.file) {
      // Simulate upload
      console.log('Uploading content:', uploadForm);
      alert('Content uploaded successfully!');
      setUploadForm({
        title: '',
        subject: '',
        difficulty: '',
        type: '',
        description: '',
        file: null
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="p-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage content and track student progress</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{students.length}</h3>
                <p className="text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{uploadedContent.length}</h3>
                <p className="text-muted-foreground">Content Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {Math.round(students.reduce((acc, s) => acc + s.progress.averageScore, 0) / students.length)}%
                </h3>
                <p className="text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {students.reduce((acc, s) => acc + s.progress.videosWatched, 0)}
                </h3>
                <p className="text-muted-foreground">Videos Watched</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Content</TabsTrigger>
          <TabsTrigger value="students">Student Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Upload Content Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-6 h-6" />
                <span>Upload Learning Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Content Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter content title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={(value) => setUploadForm({ ...uploadForm, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="math">Math</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select onValueChange={(value) => setUploadForm({ ...uploadForm, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the content..."
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="video/*,audio/*,.pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                />
                {uploadForm.file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {uploadForm.file.name}
                  </p>
                )}
              </div>

              <Button 
                onClick={handleUploadSubmit}
                className="w-full gradient-primary text-white border-0"
                disabled={!uploadForm.title || !uploadForm.subject || !uploadForm.difficulty || !uploadForm.file}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
            </CardContent>
          </Card>

          {/* Uploaded Content List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        {content.type === 'video' ? <FileVideo className="w-5 h-5 text-white" /> :
                         content.type === 'audio' ? <Mic className="w-5 h-5 text-white" /> :
                         <FileText className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-semibold">{content.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {content.subject} • {content.difficulty} • {content.uploadDate}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Progress Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <Card key={student.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold">{student.name}</h4>
                            <p className="text-muted-foreground">
                              Age {student.age} • {student.disabilityType} support
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {student.progress.averageScore}%
                          </div>
                          <p className="text-sm text-muted-foreground">Average Score</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-xl font-bold">{student.progress.videosWatched}</div>
                          <p className="text-sm text-muted-foreground">Videos Watched</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-xl font-bold">{student.progress.quizzesCompleted}</div>
                          <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>Learning Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Content Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Video Content</span>
                          <span className="font-semibold">85% completion</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Audio Content</span>
                          <span className="font-semibold">92% completion</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Text Content</span>
                          <span className="font-semibold">78% completion</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Quiz Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Basic Level</span>
                          <span className="font-semibold text-green-600">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Medium Level</span>
                          <span className="font-semibold text-yellow-600">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hard Level</span>
                          <span className="font-semibold text-red-600">65%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Student Engagement Trends</h4>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Analytics Chart Placeholder</p>
                        <p className="text-sm text-muted-foreground">Engagement data visualization would appear here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};