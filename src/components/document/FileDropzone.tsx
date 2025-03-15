
import React, { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a synthetic event to pass to the onChange handler
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        // Create a new FileList-like object from the dropped files
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          dataTransfer.items.add(e.dataTransfer.files[i]);
        }
        
        fileInput.files = dataTransfer.files;
        
        // Create and dispatch synthetic change event
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
        
        // Call the onChange prop with a synthetic React.ChangeEvent
        onChange({ target: fileInput } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, [onChange]);
  
  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">File Upload</Label>
      <div 
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          isDragging ? 'bg-gray-100 border-primary' : 'hover:bg-gray-50'
        }`}
        onClick={() => document.getElementById('file-upload')?.click()}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, JPG, PNG (Max size: 10MB)</p>
        <Input 
          id="file-upload" 
          type="file" 
          multiple 
          className="hidden" 
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FileDropzone;
