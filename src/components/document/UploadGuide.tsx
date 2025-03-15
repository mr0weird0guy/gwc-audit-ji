
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const UploadGuide: React.FC = () => {
  return (
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
  );
};

export default UploadGuide;
