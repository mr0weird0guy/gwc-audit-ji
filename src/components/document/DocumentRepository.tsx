
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, File, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  category: 'uploaded' | 'received';
}

const DocumentRepository: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('uploaded');
  
  // Mock documents data
  const uploadedDocuments: Document[] = [
    { id: '1', name: 'Financial Statement Q1.pdf', type: 'Financial Statement', size: '2.3 MB', uploadDate: '2023-04-15', status: 'approved', category: 'uploaded' },
    { id: '2', name: 'Tax Document 2023.pdf', type: 'Tax Document', size: '1.5 MB', uploadDate: '2023-03-20', status: 'pending', category: 'uploaded' },
    { id: '3', name: 'Invoice April.pdf', type: 'Invoice', size: '0.8 MB', uploadDate: '2023-04-05', status: 'approved', category: 'uploaded' },
  ];
  
  const receivedDocuments: Document[] = [
    { id: '4', name: 'Audit Report Q1.pdf', type: 'Report', size: '3.1 MB', uploadDate: '2023-04-18', status: 'approved', category: 'received' },
    { id: '5', name: 'Tax Filing Instructions.docx', type: 'Instructions', size: '1.2 MB', uploadDate: '2023-03-25', status: 'approved', category: 'received' },
    { id: '6', name: 'Compliance Checklist.xlsx', type: 'Checklist', size: '0.9 MB', uploadDate: '2023-04-10', status: 'approved', category: 'received' },
  ];

  const handleDownload = (document: Document) => {
    toast({
      title: 'Download started',
      description: `Downloading ${document.name}`,
    });
    // In a real implementation, this would trigger a download from S3
  };

  const handleView = (document: Document) => {
    toast({
      title: 'Viewing document',
      description: `Opening ${document.name} for preview`,
    });
    // In a real implementation, this would open a document preview
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Repository</CardTitle>
        <CardDescription>Access and manage all your documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="uploaded" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="uploaded">Uploaded Documents</TabsTrigger>
            <TabsTrigger value="received">Received Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="uploaded">
            <div className="space-y-4">
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-start justify-between border-b pb-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(doc)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="received">
            <div className="space-y-4">
              {receivedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-start justify-between border-b pb-3">
                  <div className="flex items-center">
                    <File className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(doc)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentRepository;
