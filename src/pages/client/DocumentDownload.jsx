
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import DocumentRepository from '@/components/document/DocumentRepository';
import { Search, Download, Filter, Clock } from 'lucide-react';

// Mock documents data
const mockDocuments = [
  {
    id: 'doc-1',
    title: 'Annual Financial Statement',
    category: 'Financial',
    date: '2023-05-10',
    status: 'approved',
  },
  {
    id: 'doc-2',
    title: 'Tax Return Form',
    category: 'Tax',
    date: '2023-04-15',
    status: 'approved',
  },
  {
    id: 'doc-3',
    title: 'Expense Report Q1',
    category: 'Financial',
    date: '2023-03-31',
    status: 'pending',
  },
  {
    id: 'doc-4',
    title: 'Audit Report 2022',
    category: 'Audit',
    date: '2023-02-22',
    status: 'approved',
  },
  {
    id: 'doc-5',
    title: 'Quarterly Business Review',
    category: 'Business',
    date: '2023-01-15',
    status: 'pending',
  },
];

const DocumentDownload = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeTab === 'all' || 
                         (activeTab === 'approved' && doc.status === 'approved') ||
                         (activeTab === 'pending' && doc.status === 'pending');
    return matchesSearch && matchesStatus;
  });

  const documentsByCategory = {
    all: mockDocuments.length,
    approved: mockDocuments.filter(doc => doc.status === 'approved').length,
    pending: mockDocuments.filter(doc => doc.status === 'pending').length
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Document Downloads</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter Options
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Available Documents</CardTitle>
          <CardDescription>Access and download documents shared with you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All ({documentsByCategory.all})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({documentsByCategory.approved})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({documentsByCategory.pending})</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DocumentRepository 
            documents={filteredDocuments}
            onDownload={(docId) => console.log(`Downloading document ${docId}`)}
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Downloads</CardTitle>
            <CardDescription>Documents you've recently accessed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDocuments.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">Downloaded on {doc.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Documents organized by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Financial', 'Tax', 'Audit', 'Business'].map((category) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category}</Badge>
                  </div>
                  <p className="text-sm">{mockDocuments.filter(doc => doc.category === category).length} documents</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DocumentDownload;
