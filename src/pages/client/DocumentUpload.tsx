
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTasks } from '@/services/mockData';
import { Upload, X, Check, File } from 'lucide-react';

const DocumentUpload: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const documentTypes = [
    'Financial Statement',
    'Tax Document',
    'Bank Statement',
    'Receipts',
    'Invoices',
    'Payroll Documents',
    'Compliance Documents',
    'Contract',
    'Other'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (!selectedTask) {
      toast({
        title: 'Error',
        description: 'Please select a task',
        variant: 'destructive',
      });
      return;
    }

    if (!documentType) {
      toast({
        title: 'Error',
        description: 'Please select a document type',
        variant: 'destructive',
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select files to upload',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast({
        title: 'Success',
        description: `${uploadedFiles.length} files uploaded successfully`,
        variant: 'default',
      });
      
      // Reset form
      setUploadedFiles([]);
      setSelectedTask('');
      setDocumentType('');
      
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }, 2000);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Documents</CardTitle>
              <CardDescription>Provide documents needed for your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="task">Related Task</Label>
                  <Select value={selectedTask} onValueChange={setSelectedTask}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a task" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTasks.slice(0, 4).map(task => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file-upload">File Upload</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, JPG, PNG (Max size: 10MB)</p>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files</Label>
                    <div className="border rounded-md overflow-hidden">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border-b last:border-0">
                          <div className="flex items-center space-x-3">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleUpload} 
                  className="w-full"
                  disabled={uploading || uploadedFiles.length === 0}
                >
                  {uploading ? 'Uploading...' : 'Upload Documents'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
              <CardDescription>Ensure your documents meet these requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <p className="text-sm">Files must be clear and readable</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <p className="text-sm">Make sure all pages are included and in the correct order</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <p className="text-sm">Financial documents should include all required signatures</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <p className="text-sm">Maximum file size is 10MB per file</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <p className="text-sm">Supported formats: PDF, DOC, XLS, JPG, PNG</p>
                </div>
              </div>
              
              <div className="rounded-md bg-amber-50 p-3 text-amber-800 text-sm">
                <p className="font-medium">Important Note</p>
                <p className="text-xs mt-1">Uploaded documents are securely stored and will only be accessible to authorized personnel working on your tasks.</p>
              </div>
              
              <div className="rounded-md bg-blue-50 p-3 text-blue-800 text-sm">
                <p className="font-medium">Need Help?</p>
                <p className="text-xs mt-1">If you're unsure which documents to upload or have questions about the formats, please contact your account manager.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentUpload;
