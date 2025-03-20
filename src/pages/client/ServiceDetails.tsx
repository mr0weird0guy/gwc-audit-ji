
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Upload, Download } from 'lucide-react';
import FileDropzone from '@/components/document/FileDropzone';
import FileList from '@/components/document/FileList';
import { useState } from 'react';

// Mock service stages
const serviceStages = [
  { id: 1, name: 'Document Collection', status: 'completed' },
  { id: 2, name: 'Initial Review', status: 'completed' },
  { id: 3, name: 'Processing', status: 'in-progress' },
  { id: 4, name: 'Quality Check', status: 'pending' },
  { id: 5, name: 'Final Delivery', status: 'pending' },
];

// Mock documents needed from client
const documentsNeeded = [
  { id: 'doc1', name: 'Bank Statements', status: 'uploaded' },
  { id: 'doc2', name: 'Income Statements', status: 'uploaded' },
  { id: 'doc3', name: 'Receipt Records', status: 'pending' },
  { id: 'doc4', name: 'GST Returns', status: 'pending' },
];

// Mock documents to be received
const documentsToReceive = [
  { id: 'rec1', name: 'Tax Assessment', status: 'pending' },
  { id: 'rec2', name: 'Financial Report', status: 'pending' },
];

const ServiceDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Mock service details - in a real app, this would be fetched from an API
  const serviceDetails = {
    id: serviceId,
    name: 'Tax Filing 2023',
    assignedTo: 'Sarah Johnson',
    deadline: 'May 15, 2023',
    status: 'in-progress',
    progress: 60,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const calculateProgress = () => {
    const completedStages = serviceStages.filter(stage => stage.status === 'completed').length;
    return (completedStages / serviceStages.length) * 100;
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{serviceDetails.name}</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Deadline:</span>
          <span className="font-medium">{serviceDetails.deadline}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-full">
          <CardHeader className="pb-2">
            <CardTitle>Service Progress</CardTitle>
            <CardDescription>
              Current progress: {calculateProgress().toFixed(0)}% complete
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={calculateProgress()} className="h-2 mb-4" />
            
            <div className="flex flex-col gap-2 mt-4">
              {serviceStages.map((stage, index) => (
                <div key={stage.id} className="flex items-center gap-3">
                  <div className={`rounded-full p-1 ${
                    stage.status === 'completed' ? 'bg-green-100 text-green-500' :
                    stage.status === 'in-progress' ? 'bg-blue-100 text-blue-500' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {stage.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : stage.status === 'in-progress' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${
                        stage.status === 'completed' ? 'text-green-500' :
                        stage.status === 'in-progress' ? 'text-blue-500' :
                        'text-gray-500'
                      }`}>
                        {stage.name}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {stage.status.replace('-', ' ')}
                      </span>
                    </div>
                    {index < serviceStages.length - 1 && (
                      <div className="ml-2 mt-1 mb-1 border-l-2 border-gray-200 h-4"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="documents-needed">
        <TabsList className="mb-4">
          <TabsTrigger value="documents-needed">
            <Upload className="h-4 w-4 mr-2" />
            Documents to Upload
          </TabsTrigger>
          <TabsTrigger value="documents-to-receive">
            <Download className="h-4 w-4 mr-2" />
            Documents to Receive
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents-needed">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Documents needed from you to complete this service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentsNeeded.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{doc.name}</span>
                      </div>
                      <div>
                        {doc.status === 'uploaded' ? (
                          <span className="text-xs bg-green-100 text-green-700 py-1 px-2 rounded-full">
                            Uploaded
                          </span>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>
                  Provide the required documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FileDropzone onChange={handleFileChange} />
                  <FileList files={uploadedFiles} onRemove={removeFile} />
                  
                  <Button disabled={uploadedFiles.length === 0} className="w-full">
                    Upload Selected Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents-to-receive">
          <Card>
            <CardHeader>
              <CardTitle>Documents to Receive</CardTitle>
              <CardDescription>
                Documents that will be delivered to you upon completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentsToReceive.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{doc.name}</span>
                    </div>
                    <div>
                      {doc.status === 'ready' ? (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <span className="text-xs bg-amber-100 text-amber-700 py-1 px-2 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ServiceDetails;
