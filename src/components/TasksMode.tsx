
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CalendarIcon, 
  PlusCircle, 
  Clock, 
  Bell, 
  Trash2,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  hasReminder: boolean;
}

const TasksMode: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Complete A.I.S.H.A. project design', 
      completed: false, 
      dueDate: '2023-12-25',
      priority: 'high',
      hasReminder: true
    },
    { 
      id: '2', 
      title: 'Research machine learning models', 
      completed: false, 
      dueDate: '2023-12-30',
      priority: 'medium',
      hasReminder: false
    },
    { 
      id: '3', 
      title: 'Set up development environment', 
      completed: true, 
      dueDate: '2023-12-15',
      priority: 'low',
      hasReminder: false
    },
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium',
      hasReminder: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const setPriority = (id: string, priority: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, priority } : task
    ));
  };
  
  const toggleReminder = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, hasReminder: !task.hasReminder } : task
    ));
  };
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Task Manager</h2>
        <p className="text-muted-foreground">
          Organize your tasks and set reminders
        </p>
      </div>
      
      <div className="flex gap-3 mb-8">
        <Input 
          placeholder="Add a new task..." 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
          <PlusCircle size={18} className="mr-2" />
          Add
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CheckCircle2 size={18} className="mr-2 text-mode-tasks" />
              Tasks Overview
            </CardTitle>
            <CardDescription>
              Track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Tasks</span>
                <span className="font-medium">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="font-medium">{tasks.filter(t => t.completed).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-medium">{tasks.filter(t => !t.completed).length}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-2 bg-mode-tasks rounded-full"
                  style={{ 
                    width: `${tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2 text-mode-tasks" />
              Upcoming
            </CardTitle>
            <CardDescription>
              Tasks due soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks
                .filter(task => !task.completed && task.dueDate)
                .sort((a, b) => {
                  if (!a.dueDate || !b.dueDate) return 0;
                  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                })
                .slice(0, 3)
                .map(task => (
                  <div key={task.id} className="flex justify-between items-center">
                    <span className="truncate">{task.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              
              {tasks.filter(task => !task.completed && task.dueDate).length === 0 && (
                <p className="text-sm text-muted-foreground italic">No upcoming tasks</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="space-y-2">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={`p-3 border rounded-lg flex items-start gap-3 group transition-colors
                ${task.completed ? 'bg-muted/50' : 'bg-background hover:bg-secondary/40'}`}
            >
              <Checkbox 
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <p className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </p>
                
                {task.dueDate && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <Select 
                  value={task.priority} 
                  onValueChange={(val: any) => setPriority(task.id, val)}
                >
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => toggleReminder(task.id)}
                  className={task.hasReminder ? 'text-primary' : ''}
                >
                  <Bell size={16} />
                </Button>
                
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => deleteTask(task.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <p className="text-center text-muted-foreground py-8 italic">
              No tasks yet. Add some to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksMode;
