
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { ArrowLeft, CalendarClock, Users, File, ListChecks, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClientServiceForm } from '@/components/admin/ClientServiceForm';

// Mock service template based on the selected ID
const getServiceTemplate = (id: string) => {
  return {
    id,
    name: 'Annual Financial Audit',
    description: 'Complete review of financial statements and reporting to ensure compliance with accounting standards and regulatory requirements.',
    documents_required: [
      'Financial Statements',
      'Bank Statements',
      'Tax Records',
      'General Ledger',
      'Trial Balance'
    ],
    documents_deliverables: [
      'Audit Report',
      'Financial Analysis',
      'Recommendations',
      'Management Letter',
      'Compliance Certificate'
    ],
    steps: [
      'Initial Review of Financial Documents',
      'Detailed Financial Analysis',
      'Compliance Checking',
      'Draft Report Preparation',
      'Client Review Meeting',
      'Final Report Delivery'
    ],
    created_at: '2023-05-15',
    assigned_services: 3
  };
};

// Mock active services using this template
const getActiveServices = (templateId: string) => {
  return [
    {
      id: '1',
      clientName: 'Acme Corporation',
      assignedTo: 'Sarah Johnson',
      startDate: '2023-01-15',
      dueDate: '2023-05-15',
      status: 'ongoing',
      progress: 75
    },
    {
      id: '2',
      clientName: 'Globex Inc.',
      assignedTo: 'Michael Chen',
      startDate: '2023-02-10',
      dueDate: '2023-06-30',
      status: 'ongoing',
      progress: 45
    },
    {
      id: '3',
      clientName: 'Wayne Enterprises',
      assignedTo: 'Emma Rodriguez',
      startDate: '2023-03-20',
      dueDate: '2023-07-20',
      status: 'pending',
      progress: 10
    }
  ];
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!serviceId) {
    navigate('/admin/service-management');
    return null;
  }
  
  const template = getServiceTemplate(serviceId);
  const activeServices = getActiveServices(serviceId);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'ongoing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1"
          onClick={() => navigate('/admin/service-management')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{template.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Active Services
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeServices.length}</p>
            <p className="text-sm text-muted-foreground">clients using this template</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 text-muted-foreground" />
                Required Documents
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{template.documents_required.length}</p>
            <p className="text-sm text-muted-foreground">documents needed from clients</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-muted-foreground" />
                Service Steps
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{template.steps.length}</p>
            <p className="text-sm text-muted-foreground">steps to complete the service</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Services ({activeServices.length})</TabsTrigger>
          <TabsTrigger value="assign">Assign to Client</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Template Details</CardTitle>
                  <CardDescription>Service template information</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Created</h3>
                    <p className="text-sm text-muted-foreground">{template.created_at}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>Documents needed from clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {template.documents_required.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Required
                        </Badge>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Deliverable Documents</CardTitle>
                  <CardDescription>Documents delivered to clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {template.documents_deliverables.map((doc, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Deliverable
                        </Badge>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Service Steps</CardTitle>
              <CardDescription>Sequential steps for completing the service</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {template.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 border rounded-md">
                    <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
              <CardDescription>Clients currently using this service template</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.clientName}</TableCell>
                      <TableCell>{service.assignedTo}</TableCell>
                      <TableCell>{service.startDate}</TableCell>
                      <TableCell>{service.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell>{service.progress}%</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/admin/client-detail/${service.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assign" className="mt-6">
          <ClientServiceForm 
            serviceTemplateId={serviceId} 
            onSuccess={() => setActiveTab('active')}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ServiceDetail;
