
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import StatusBadge from '@/components/StatusBadge';
import { mockTasks, mockDocuments } from '@/services/mockData';
import { useToast } from '@/components/ui/use-toast';
import { FileDown, FileText, Clock, User, Building, BarChart, MessageSquare, Check } from 'lucide-react';

const TaskDetails: React.FC = () => {
  const task = mockTasks[0]; // Using the first task as an example
  const [progress, setProgress] = useState(task.progress);
  const [comment, setComment] = useState('');
  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Review financial statements', completed: true },
    { id: '2', text: 'Verify balance sheet calculations', completed: true },
    { id: '3', text: 'Check income statement accuracy', completed: false },
    { id: '4', text: 'Confirm cash flow figures', completed: false },
    { id: '5', text: 'Validate asset valuations', completed: false },
  ]);
  const { toast } = useToast();

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
    toast({
      title: 'Progress Updated',
      description: `Task progress set to ${newProgress}%`,
    });
  };

  const handleChecklistItem = (id: string, checked: boolean) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: checked } : item
      )
    );
    
    // Recalculate progress based on checklist completion
    const totalItems = checklist.length;
    const completedItems = checklist.filter(item => 
      item.id === id ? checked : item.completed
    ).length;
    
    const newProgress = Math.round((completedItems / totalItems) * 100);
    setProgress(newProgress);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: 'Comment Added',
      description: 'Your comment has been saved to the task',
    });
    
    setComment('');
  };

  const uploadedDocuments = mockDocuments.slice(0, 2);
  const deliverableDocuments = mockDocuments.slice(2, 4);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <StatusBadge status={task.status} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-medium">{task.deadline}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{task.assignedTo}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{task.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={progress} className="h-2 w-20" />
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Task Checklist</CardTitle>
              <CardDescription>Complete these items to finish the task</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklist.map(item => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox 
                      id={`checklist-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={(checked) => 
                        handleChecklistItem(item.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`checklist-${item.id}`}
                      className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">
                  {checklist.filter(item => item.completed).length} of {checklist.length} completed
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Update Progress:</span>
                  <div className="flex space-x-1">
                    {[25, 50, 75, 100].map(p => (
                      <Button 
                        key={p}
                        variant={progress >= p ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleProgressUpdate(p)}
                      >
                        {p}%
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notes & Comments</CardTitle>
              <CardDescription>Add observations or questions about this task</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a comment about this task..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleAddComment}>Add Comment</Button>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-3 border-b pb-4">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                      <p className="text-sm mt-1">
                        I've reviewed the initial financial statements and found some discrepancies in the asset valuations. Need to follow up with the client.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                      <p className="text-sm mt-1">
                        Initial review completed. The client has provided most documentation, but we're still waiting on Q3 bank statements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Documents</CardTitle>
              <CardDescription>Files uploaded by the client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedDocuments.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadDate}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Task Deliverables</CardTitle>
              <CardDescription>Documents to be delivered to client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deliverableDocuments.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.status === 'pending' ? 'Not yet uploaded' : 
                           doc.status === 'approved' ? 'Approved' : 'Needs revision'}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Upload
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Completion Requirements</CardTitle>
              <CardDescription>Steps to finalize this task</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md bg-green-50 p-3 text-green-800 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4" />
                    <p className="font-medium">Complete all checklist items</p>
                  </div>
                </div>
                
                <div className="rounded-md bg-amber-50 p-3 text-amber-800 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4" />
                    <p className="font-medium">Upload all required deliverables</p>
                  </div>
                </div>
                
                <div className="rounded-md bg-blue-50 p-3 text-blue-800 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4" />
                    <p className="font-medium">Generate final report</p>
                  </div>
                </div>
                
                <div className="rounded-md bg-purple-50 p-3 text-purple-800 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4" />
                    <p className="font-medium">Submit for review by manager</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Mark Task as Complete</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetails;
