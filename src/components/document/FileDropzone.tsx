
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">File Upload</Label>
      <div 
        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors" 
        onClick={() => document.getElementById('file-upload')?.click()}
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
