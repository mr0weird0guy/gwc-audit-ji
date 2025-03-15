
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { mockTasks } from '@/services/mockData';
import FileDropzone from './FileDropzone';
import FileList from './FileList';

interface DocumentFormProps {
  documentTypes: string[];
}

const DocumentForm: React.FC<DocumentFormProps> = ({ documentTypes }) => {
  const [selectedTask, setSelectedTask] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
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

  return (
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
      
      <FileDropzone onChange={handleFileChange} />
      
      <FileList files={uploadedFiles} onRemove={removeFile} />
      
      <Button 
        onClick={handleUpload} 
        className="w-full"
        disabled={uploading || uploadedFiles.length === 0}
      >
        {uploading ? 'Uploading...' : 'Upload Documents'}
      </Button>
    </form>
  );
};

export default DocumentForm;
