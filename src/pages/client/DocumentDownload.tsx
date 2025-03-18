
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  service: string;
}

const DocumentDownload: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  // Mock document data
  const documents: Document[] = [
    { id: '1', name: 'Financial Statement Q1.pdf', type: 'Financial Statement', size: '2.3 MB', uploadDate: '2023-04-15', category: 'Reports', service: 'Quarterly Audit' },
    { id: '2', name: 'Tax Document 2023.pdf', type: 'Tax Document', size: '1.5 MB', uploadDate: '2023-03-20', category: 'Tax', service: 'Tax Filing' },
    { id: '3', name: 'Invoice April.pdf', type: 'Invoice', size: '0.8 MB', uploadDate: '2023-04-05', category: 'Invoices', service: 'Bookkeeping' },
    { id: '4', name: 'Audit Report Q1.pdf', type: 'Report', size: '3.1 MB', uploadDate: '2023-04-18', category: 'Reports', service: 'Quarterly Audit' },
    { id: '5', name: 'Tax Filing Instructions.docx', type: 'Instructions', size: '1.2 MB', uploadDate: '2023-03-25', category: 'Instructions', service: 'Tax Filing' },
    { id: '6', name: 'Compliance Checklist.xlsx', type: 'Checklist', size: '0.9 MB', uploadDate: '2023-04-10', category: 'Compliance', service: 'Compliance Check' },
    { id: '7', name: 'Bank Statement Analysis.pdf', type: 'Analysis', size: '1.7 MB', uploadDate: '2023-04-12', category: 'Reports', service: 'Bookkeeping' },
    { id: '8', name: 'Payroll Summary Q1.xlsx', type: 'Payroll', size: '1.3 MB', uploadDate: '2023-04-02', category: 'Reports', service: 'Payroll Service' },
  ];

  // Derive document categories, types and services for filters
  const documentTypes = ['all', ...new Set(documents.map(doc => doc.type))];
  const documentServices = ['all', ...new Set(documents.map(doc => doc.service))];
  
  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesService = selectedService === 'all' || doc.service === selectedService;
    
    return matchesSearch && matchesType && matchesService;
  });

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
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Download Documents</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Document Search</CardTitle>
          <CardDescription>Find and download documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  {documentServices.map(service => (
                    <SelectItem key={service} value={service}>
                      {service === 'all' ? 'All Services' : service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-start justify-between border-b pb-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                        <span>•</span>
                        <span>{doc.service}</span>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DocumentDownload;
