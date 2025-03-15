
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import StatusBadge from '@/components/StatusBadge';
import { mockTasks, mockDocuments } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // For client view, we'll filter to display fewer tasks
  const clientTasks = mockTasks.slice(0, 4);
  const pendingDocuments = mockDocuments.filter(doc => doc.status === 'pending');

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <CardDescription>Your current services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-primary mr-2" />
              <div className="text-2xl font-bold">3</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents Pending</CardTitle>
            <CardDescription>Required document uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Upload className="h-4 w-4 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{pendingDocuments.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <CardDescription>Services due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-red-500 mr-2" />
              <div className="text-2xl font-bold">2</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Services</CardTitle>
              <CardDescription>Services currently in progress</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/client/document-upload')}>
              Upload Documents
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onClick={() => navigate('/client/document-upload')}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Documents Required</CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingDocuments.map(doc => (
                <div key={doc.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/client/document-upload')}>
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 border-b pb-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {["Document review completed", "New document uploaded", "Tax preparation update", "Quarterly review scheduled"][i]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {i === 0 ? "Your financial statements have been reviewed" : 
                     i === 1 ? "A new document has been uploaded by your accountant" :
                     i === 2 ? "Tax preparation is 75% complete" : 
                     "Your quarterly review has been scheduled for next week"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {i === 0 ? "2 hours ago" : 
                     i === 1 ? "Yesterday" :
                     i === 2 ? "2 days ago" : 
                     "3 days ago"}
                  </p>
                </div>
                <StatusBadge 
                  status={i === 0 ? "completed" : i === 1 ? "pending" : "ongoing"} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ClientDashboard;
