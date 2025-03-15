
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import { mockTasks } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertTriangle, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const assignedTasks = mockTasks.filter(task => task.assignedTo === 'Jane Smith');
  const pendingTasks = assignedTasks.filter(task => task.status === 'pending');
  const ongoingTasks = assignedTasks.filter(task => task.status === 'ongoing');
  const completedTasks = assignedTasks.filter(task => task.status === 'completed');
  
  // Calculate overall progress
  const totalProgress = assignedTasks.reduce((acc, task) => acc + task.progress, 0);
  const averageProgress = assignedTasks.length > 0 ? totalProgress / assignedTasks.length : 0;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
            <CardDescription>Total tasks assigned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">{assignedTasks.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CardDescription>Tasks not started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{pendingTasks.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <CardDescription>Tasks being worked on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{ongoingTasks.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CardDescription>Finished tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{completedTasks.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>Tasks assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onClick={() => navigate('/employee/task-details')}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your task completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{averageProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={averageProgress} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Tasks by Status</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-amber-100 p-2 rounded-md">
                        <p className="text-amber-800 text-lg font-bold">{pendingTasks.length}</p>
                        <p className="text-xs text-amber-800">Pending</p>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-md">
                        <p className="text-blue-800 text-lg font-bold">{ongoingTasks.length}</p>
                        <p className="text-xs text-blue-800">Ongoing</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-md">
                        <p className="text-green-800 text-lg font-bold">{completedTasks.length}</p>
                        <p className="text-xs text-green-800">Completed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Upcoming Deadlines</p>
                    {assignedTasks
                      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                      .slice(0, 3)
                      .map(task => (
                        <div key={task.id} className="flex justify-between items-center text-sm mb-2">
                          <span className="truncate mr-2">{task.title}</span>
                          <span className="text-red-500">{task.deadline}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest changes to your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 border-b pb-4">
                <div className={`rounded-full p-2 ${
                  i === 0 ? "bg-green-100" : 
                  i === 1 ? "bg-blue-100" : 
                  i === 2 ? "bg-amber-100" : 
                  "bg-red-100"
                }`}>
                  {i === 0 ? <CheckCircle className="h-4 w-4 text-green-600" /> : 
                   i === 1 ? <BarChart className="h-4 w-4 text-blue-600" /> :
                   i === 2 ? <Clock className="h-4 w-4 text-amber-600" /> : 
                   <AlertTriangle className="h-4 w-4 text-red-600" />}
                </div>
                <div>
                  <p className="font-medium">
                    {i === 0 ? "Task completed" : 
                     i === 1 ? "Progress update" :
                     i === 2 ? "Deadline approaching" : 
                     "New task assigned"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {i === 0 ? "Quarterly Review for Wayne Enterprises marked as completed" : 
                     i === 1 ? "Updated progress on Annual Financial Audit to 45%" :
                     i === 2 ? "Tax Preparation for Globex Inc. is due in 3 days" : 
                     "New task assigned: Compliance Audit for Oscorp"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {i === 0 ? "1 hour ago" : 
                     i === 1 ? "3 hours ago" :
                     i === 2 ? "Yesterday" : 
                     "2 days ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default EmployeeDashboard;
