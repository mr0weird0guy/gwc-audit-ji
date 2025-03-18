
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { ClientServiceForm } from '@/components/admin/ClientServiceForm';
import { Edit, ArrowLeft, Eye, Trash, Plus } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';

// Mock data - would be replaced with data from API
const mockClient = {
  id: "client-1",
  businessName: "Acme Corporation",
  email: "contact@acmecorp.com",
  gstNumber: "GST1234567890",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave, Enterprise City, EC 12345",
  services: [
    {
      id: "service-1",
      name: "Tax Filing",
      assignedEmployee: "John Doe",
      startDate: "2023-05-15",
      dueDate: "2023-06-15",
      status: "in-progress",
      progress: 65,
    },
    {
      id: "service-2",
      name: "Financial Audit",
      assignedEmployee: "Jane Smith",
      startDate: "2023-06-01",
      dueDate: "2023-07-31",
      status: "pending",
      progress: 10,
    },
    {
      id: "service-3",
      name: "Payroll Management",
      assignedEmployee: "Robert Johnson",
      startDate: "2023-04-01",
      dueDate: "2023-12-31",
      status: "active",
      progress: 42,
    }
  ]
};

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [client, setClient] = useState(mockClient);
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  
  const handleStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const handleDelete = (serviceId: string) => {
    toast({
      title: "Service Removed",
      description: "Service has been removed successfully.",
    });
    
    // Mock deletion from state
    setClient({
      ...client,
      services: client.services.filter(service => service.id !== serviceId)
    });
  };
  
  return (
    <Layout>
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/admin/client-management')}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{client.businessName}</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Client Details</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>View and manage client details</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Business Name</p>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded" 
                      defaultValue={client.businessName} 
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded" 
                      defaultValue={client.email} 
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">GST Number</p>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded" 
                      defaultValue={client.gstNumber} 
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone</p>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded" 
                      defaultValue={client.phone} 
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-sm font-medium">Address</p>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded" 
                      defaultValue={client.address} 
                    />
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Business Name</h3>
                    <p>{client.businessName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{client.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">GST Number</h3>
                    <p>{client.gstNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p>{client.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p>{client.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Client Services</CardTitle>
                  <CardDescription>Manage services for this client</CardDescription>
                </div>
                <Button onClick={() => setActiveTab("add-service")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.assignedEmployee}</TableCell>
                        <TableCell>{service.dueDate}</TableCell>
                        <TableCell>{handleStatusBadge(service.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={service.progress} className="h-2" />
                            <span className="text-xs">{service.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/admin/service-details/${service.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {activeTab === "add-service" && (
              <ClientServiceForm 
                clientId={client.id} 
                onSuccess={() => setActiveTab("services")}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ClientDetail;
