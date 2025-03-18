
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { ArrowLeft, Edit, Save, Calendar, FileText, Users, CheckCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

// Mock data - would be replaced with data from API
const mockService = {
  id: "service-1",
  name: "Tax Filing",
  clientName: "Acme Corporation",
  clientId: "client-1",
  assignedEmployee: "John Doe",
  startDate: "2023-05-15",
  dueDate: "2023-06-15",
  status: "in-progress",
  progress: 65,
  description: "Comprehensive tax filing service including preparation of quarterly tax reports, annual returns, and tax planning.",
  milestones: [
    {
      id: "m1",
      name: "Initial consultation",
      status: "completed",
      dueDate: "2023-05-20",
      completedDate: "2023-05-18"
    },
    {
      id: "m2",
      name: "Document collection",
      status: "completed",
      dueDate: "2023-05-30",
      completedDate: "2023-05-29"
    },
    {
      id: "m3",
      name: "Preliminary tax assessment",
      status: "in-progress",
      dueDate: "2023-06-05",
      completedDate: null
    },
    {
      id: "m4",
      name: "Final filing",
      status: "pending",
      dueDate: "2023-06-15",
      completedDate: null
    }
  ],
  notes: [
    {
      id: "n1",
      date: "2023-05-18",
      author: "John Doe",
      content: "Initial consultation completed. Client provided basic financial statements."
    },
    {
      id: "n2",
      date: "2023-05-29",
      author: "John Doe",
      content: "All documents received. Missing some details on investment income, have requested additional information."
    }
  ]
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(mockService);
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  
  const handleStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const newNoteObj = {
      id: `n${service.notes.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      author: "John Doe", // Would be from auth context in real app
      content: newNote
    };
    
    setService({
      ...service,
      notes: [...service.notes, newNoteObj]
    });
    
    setNewNote("");
  };
  
  return (
    <Layout>
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(`/admin/client-detail/${service.clientId}`)}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{service.name}</h1>
          <p className="text-muted-foreground">Client: {service.clientName}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Due Date</span>
              </div>
              <span>{service.dueDate}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Assigned To</span>
              </div>
              <span>{service.assignedEmployee}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Status</span>
              </div>
              {handleStatusBadge(service.status)}
            </div>
            <div className="flex items-center gap-2">
              <Progress value={service.progress} className="h-2 flex-1" />
              <span className="text-xs">{service.progress}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="notes">Notes & Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milestones">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Service Milestones</CardTitle>
                <CardDescription>Track progress of important milestones</CardDescription>
              </div>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Milestones
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.milestones.map((milestone) => (
                    <TableRow key={milestone.id}>
                      <TableCell className="font-medium">{milestone.name}</TableCell>
                      <TableCell>{milestone.dueDate}</TableCell>
                      <TableCell>{handleStatusBadge(milestone.status)}</TableCell>
                      <TableCell>{milestone.completedDate || "-"}</TableCell>
                      <TableCell className="text-right">
                        {milestone.status !== "completed" && (
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes & Updates</CardTitle>
              <CardDescription>Record important information and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.notes.map((note) => (
                <div key={note.id} className="border rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{note.author}</span>
                    <span className="text-sm text-muted-foreground">{note.date}</span>
                  </div>
                  <p>{note.content}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-stretch">
              <Textarea 
                placeholder="Add a new note..." 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleAddNote}>
                  <Save className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ServiceDetail;
