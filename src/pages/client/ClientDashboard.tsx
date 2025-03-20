
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import TaskCard from '@/components/TaskCard';
import StatusBadge from '@/components/StatusBadge';
import { mockTasks, mockDocuments } from '@/services/mockData';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Clock, Loader, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceProgress from '@/components/client/ServiceProgress';
import FileDropzone from '@/components/document/FileDropzone';
import FileList from '@/components/document/FileList';
import { useToast } from '@/hooks/use-toast';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // For client view, we'll filter to display fewer tasks
  const clientTasks = mockTasks.slice(0, 4);
  const pendingDocuments = mockDocuments.filter(doc => doc.status === 'pending');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Mock services for progress tracking
  const mockServices = [
    { 
      id: '1', 
      name: 'Tax Filing 2023', 
      progress: 75, 
      deadline: 'May 15, 2023', 
      status: 'ongoing' as const 
    },
    { 
      id: '2', 
      name: 'Quarterly Financial Audit', 
      progress: 100, 
      deadline: 'Apr 30, 2023', 
      status: 'completed' as const 
    },
    { 
      id: '3', 
      name: 'Compliance Check', 
      progress: 10, 
      deadline: 'Jun 20, 2023', 
      status: 'pending' as const 
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload
    toast({
      title: "Files uploaded",
      description: `${uploadedFiles.length} files have been uploaded successfully.`,
    });
    setUploadedFiles([]);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latest Services</CardTitle>
            <CardDescription>Services in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Loader className="h-4 w-4 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">3</div>
            </div>
            <Button 
              variant="link" 
              className="p-0 mt-2 h-auto" 
              onClick={() => navigate('/client/active-requests')}
            >
              View all services
            </Button>
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
            <Button 
              variant="link" 
              className="p-0 mt-2 h-auto" 
              onClick={() => navigate('/client/active-requests')}
            >
              Upload documents
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
            <CardDescription>Finished services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-2xl font-bold">2</div>
            </div>
            <Button 
              variant="link" 
              className="p-0 mt-2 h-auto" 
              onClick={() => navigate('/client/completed-requests')}
            >
              View completed services
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Latest Services in Progress</CardTitle>
              <CardDescription>Services currently being worked on</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/client/active-requests')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onClick={() => navigate(`/client/service-details/${task.id}`)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <ServiceProgress services={mockServices} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Documents</CardTitle>
            <CardDescription>Documents that need to be uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingDocuments.slice(0, 4).map((doc, index) => (
                <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">For: {doc.type}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/client/service-details/${doc.id}`)}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Upload</CardTitle>
            <CardDescription>Upload files directly from dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FileDropzone onChange={handleFileChange} />
              <FileList files={uploadedFiles} onRemove={removeFile} />
              
              <Button 
                disabled={uploadedFiles.length === 0} 
                className="w-full"
                onClick={handleUpload}
              >
                Upload Selected Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
