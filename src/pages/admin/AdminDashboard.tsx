
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import { mockTasks, mockAnalytics } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';
import { BarChart, Layers, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const pendingTasks = mockTasks.filter(task => task.status === 'pending');
  const ongoingTasks = mockTasks.filter(task => task.status === 'ongoing');
  const completedTasks = mockTasks.filter(task => task.status === 'completed');

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CardDescription>All assigned tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Layers className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{mockTasks.length}</div>
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
              <div className="text-2xl font-bold">{mockAnalytics.tasksByStatus.pending}</div>
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
              <BarChart className="h-4 w-4 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{mockAnalytics.tasksByStatus.ongoing}</div>
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
              <div className="text-2xl font-bold">{mockAnalytics.tasksByStatus.completed}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Newest tasks in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTasks.slice(0, 3).map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onClick={() => navigate('/admin/service-management')}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Employee Performance</CardTitle>
            <CardDescription>Top performing employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.employeePerformance.slice(0, 3).map((emp, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-muted-foreground">Tasks completed: {emp.tasksCompleted}</p>
                  </div>
                  <div className="text-sm">Avg: {emp.averageCompletionTime}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Activity</CardTitle>
            <CardDescription>Recent client interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAnalytics.clientActivity.map((client, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{client.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Documents:</span>
                        <span>{client.documentsUploaded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Services:</span>
                        <span>{client.activeServices}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
