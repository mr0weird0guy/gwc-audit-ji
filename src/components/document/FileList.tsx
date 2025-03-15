
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { File, X } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <Label>Selected Files</Label>
      <div className="border rounded-md overflow-hidden">
        {files.map((file, index) => (
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
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
