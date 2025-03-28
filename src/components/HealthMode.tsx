
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Heart, Activity, Moon, Brain, AppleIcon, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Sample data for charts
const sleepData = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 6.8 },
  { day: 'Wed', hours: 8.2 },
  { day: 'Thu', hours: 7.1 },
  { day: 'Fri', hours: 6.5 },
  { day: 'Sat', hours: 9.0 },
  { day: 'Sun', hours: 8.5 },
];

const heartRateData = [
  { time: '8AM', rate: 72 },
  { time: '10AM', rate: 76 },
  { time: '12PM', rate: 80 },
  { time: '2PM', rate: 75 },
  { time: '4PM', rate: 73 },
  { time: '6PM', rate: 77 },
  { time: '8PM', rate: 71 },
];

const stressData = [
  { day: 'Mon', level: 45 },
  { day: 'Tue', level: 60 },
  { day: 'Wed', level: 30 },
  { day: 'Thu', level: 25 },
  { day: 'Fri', level: 40 },
  { day: 'Sat', level: 20 },
  { day: 'Sun', level: 15 },
];

const activityData = [
  { day: 'Mon', steps: 5400, calories: 320 },
  { day: 'Tue', steps: 7800, calories: 450 },
  { day: 'Wed', steps: 9200, calories: 520 },
  { day: 'Thu', steps: 6500, calories: 380 },
  { day: 'Fri', steps: 8100, calories: 470 },
  { day: 'Sat', steps: 10500, calories: 580 },
  { day: 'Sun', steps: 4300, calories: 290 },
];

const HealthMode: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Health Monitor</h2>
        <p className="text-muted-foreground">
          Track your wellbeing and health metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-red-50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
              <h3 className="text-2xl font-bold">74 BPM</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Moon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sleep</p>
              <h3 className="text-2xl font-bold">7.8 hrs</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Steps</p>
              <h3 className="text-2xl font-bold">8,234</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <AppleIcon className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nutrition</p>
              <h3 className="text-2xl font-bold">Good</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heart">Heart</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="stress">Stress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart size={18} className="mr-2 text-mode-health" />
                  Heart Rate
                </CardTitle>
                <CardDescription>
                  Last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heartRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[60, 90]} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Moon size={18} className="mr-2 text-mode-health" />
                  Sleep Pattern
                </CardTitle>
                <CardDescription>
                  Last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity size={18} className="mr-2 text-mode-health" />
                Activity Summary
              </CardTitle>
              <CardDescription>
                Steps and calories burned this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="steps" fill="#8884d8" name="Steps" />
                    <Bar yAxisId="right" dataKey="calories" fill="#82ca9d" name="Calories" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="heart">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Analysis</CardTitle>
              <CardDescription>
                Detailed information about your heart health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">In the full version, A.I.S.H.A. would provide detailed heart rate analysis including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Resting heart rate tracking</li>
                <li>Exercise heart rate zones</li>
                <li>Heart rate variability analysis</li>
                <li>Abnormality detection and alerts</li>
                <li>Long-term trends and improvements</li>
              </ul>
              <Button className="mt-6 bg-mode-health hover:bg-mode-health/90">
                <PlusCircle size={16} className="mr-2" />
                Connect Heart Monitor
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Analysis</CardTitle>
              <CardDescription>
                Detailed information about your sleep patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">In the full version, A.I.S.H.A. would provide detailed sleep analysis including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Sleep stages (REM, deep sleep, light sleep)</li>
                <li>Sleep quality score</li>
                <li>Recommendations for improving sleep</li>
                <li>Sleep schedule optimization</li>
                <li>Environmental factors affecting sleep</li>
              </ul>
              <Button className="mt-6 bg-mode-health hover:bg-mode-health/90">
                <PlusCircle size={16} className="mr-2" />
                Connect Sleep Tracker
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Tracking</CardTitle>
              <CardDescription>
                Detailed information about your physical activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">In the full version, A.I.S.H.A. would provide detailed activity tracking including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Step count and distance traveled</li>
                <li>Calories burned throughout the day</li>
                <li>Activity type detection (walking, running, etc.)</li>
                <li>Activity goals and achievements</li>
                <li>Personalized activity recommendations</li>
              </ul>
              <Button className="mt-6 bg-mode-health hover:bg-mode-health/90">
                <PlusCircle size={16} className="mr-2" />
                Connect Fitness Device
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stress">
          <Card>
            <CardHeader>
              <CardTitle>Stress Management</CardTitle>
              <CardDescription>
                Monitoring and managing stress levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="level" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <p className="mb-4">In the full version, A.I.S.H.A. would provide stress management features including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Stress level detection through biometric data</li>
                <li>Guided breathing and meditation exercises</li>
                <li>Stress triggers identification</li>
                <li>Personalized relaxation techniques</li>
                <li>Mental wellness tracking and recommendations</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMode;
