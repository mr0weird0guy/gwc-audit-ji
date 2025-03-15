
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import DocumentForm from '@/components/document/DocumentForm';
import UploadGuide from '@/components/document/UploadGuide';

const DocumentUpload: React.FC = () => {
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
              <DocumentForm documentTypes={documentTypes} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <UploadGuide />
        </div>
      </div>
    </Layout>
  );
};

export default DocumentUpload;
