
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { mockTasks, mockAnalytics } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';
import { BarChart, Layers, CheckCircle, Clock, Users, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock services data (in a real app, this would come from an API)
const mockServices = [
  {
    id: 'service1',
    clientName: 'Acme Corporation',
    serviceName: 'Annual Financial Audit',
    status: 'in-progress',
    progress: 65,
    assignedEmployees: ['John Doe', 'Sarah Wilson'],
    deadline: 'May 15, 2023',
  },
  {
    id: 'service2',
    clientName: 'Globex Inc.',
    serviceName: 'Tax Filing 2023',
    status: 'pending',
    progress: 20,
    assignedEmployees: ['Robert Johnson'],
    deadline: 'April 28, 2023',
  },
  {
    id: 'service3',
    clientName: 'Wayne Enterprises',
    serviceName: 'Compliance Audit',
    status: 'in-progress',
    progress: 40,
    assignedEmployees: ['Michael Brown', 'Jane Smith'],
    deadline: 'June 10, 2023',
  },
  {
    id: 'service4',
    clientName: 'Stark Industries',
    serviceName: 'Financial Planning',
    status: 'in-progress',
    progress: 85,
    assignedEmployees: ['Lisa Chen'],
    deadline: 'May 5, 2023',
  },
  {
    id: 'service5',
    clientName: 'Oscorp',
    serviceName: 'Tax Filing 2023',
    status: 'pending',
    progress: 10,
    assignedEmployees: ['David Wilson'],
    deadline: 'May 20, 2023',
  },
];

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
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ongoing Services</CardTitle>
          <CardDescription>Services currently assigned to clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServices.map(service => (
                  <TableRow
                    key={service.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/admin/service-details/${service.id}`)}
                  >
                    <TableCell className="font-medium">{service.clientName}</TableCell>
                    <TableCell>{service.serviceName}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          service.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          service.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }
                      >
                        {service.status === 'in-progress' ? 'In Progress' : 
                         service.status === 'completed' ? 'Completed' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 dark:bg-slate-200">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${service.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 mt-1">
                        {service.progress}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-slate-400" />
                        <span className="text-sm">
                          {service.assignedEmployees.length > 1 
                            ? `${service.assignedEmployees[0]} +${service.assignedEmployees.length - 1}`
                            : service.assignedEmployees[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{service.deadline}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/service-details/${service.id}`);
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        
        <Card>
          <CardHeader>
            <CardTitle>Client Activity</CardTitle>
            <CardDescription>Recent client interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAnalytics.clientActivity.slice(0, 4).map((client, index) => (
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
