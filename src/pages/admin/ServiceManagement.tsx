
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Search, Plus, Edit, Trash, FileText, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceTemplateDialog } from '@/components/admin/ServiceTemplateDialog';
import { useToast } from '@/hooks/use-toast';

// Mock service templates based on the ER diagram
interface ServiceTemplate {
  id: string;
  name: string;
  description: string;
  documents_required: string[];
  documents_deliverables: string[];
  steps: string[];
  created_at: string;
  assigned_services: number;
}

const mockServiceTemplates: ServiceTemplate[] = [
  {
    id: '1',
    name: 'Annual Financial Audit',
    description: 'Complete review of financial statements and reporting',
    documents_required: ['Financial Statements', 'Bank Statements', 'Tax Records'],
    documents_deliverables: ['Audit Report', 'Financial Analysis', 'Recommendations'],
    steps: ['Initial Review', 'Financial Analysis', 'Draft Report', 'Final Review', 'Delivery'],
    created_at: '2023-05-15',
    assigned_services: 3
  },
  {
    id: '2',
    name: 'Tax Filing',
    description: 'Preparation and submission of tax documents',
    documents_required: ['Income Statements', 'Expense Records', 'Previous Tax Returns'],
    documents_deliverables: ['Completed Tax Forms', 'Tax Summary', 'Payment Instructions'],
    steps: ['Document Collection', 'Preliminary Review', 'Tax Preparation', 'Client Review', 'Submission'],
    created_at: '2023-06-10',
    assigned_services: 5
  },
  {
    id: '3',
    name: 'Compliance Audit',
    description: 'Review of regulatory compliance',
    documents_required: ['Policies and Procedures', 'Internal Controls', 'Regulatory Requirements'],
    documents_deliverables: ['Compliance Report', 'Gap Analysis', 'Action Plan'],
    steps: ['Scope Definition', 'Document Review', 'Compliance Testing', 'Report Drafting', 'Recommendations'],
    created_at: '2023-07-20',
    assigned_services: 2
  },
  {
    id: '4',
    name: 'Financial Planning',
    description: 'Strategic financial planning services',
    documents_required: ['Current Financials', 'Goals and Objectives', 'Current Investments'],
    documents_deliverables: ['Financial Plan', 'Investment Strategy', 'Budget Recommendations'],
    steps: ['Initial Assessment', 'Goal Setting', 'Strategy Development', 'Plan Creation', 'Implementation Guide'],
    created_at: '2023-08-05',
    assigned_services: 0
  }
];

const ServiceManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ServiceTemplate | null>(null);
  const [templates, setTemplates] = useState<ServiceTemplate[]>(mockServiceTemplates);
  
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditTemplate = (template: ServiceTemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleSaveTemplate = (template: ServiceTemplate) => {
    if (selectedTemplate) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === template.id ? template : t
      ));
      toast({
        title: "Template Updated",
        description: `${template.name} has been updated successfully`,
      });
    } else {
      // Add new template
      const newTemplate = {
        ...template,
        id: `template-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        assigned_services: 0
      };
      setTemplates([...templates, newTemplate]);
      toast({
        title: "Template Created",
        description: `${template.name} has been created successfully`,
      });
    }
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleCopyTemplate = (template: ServiceTemplate) => {
    const copiedTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      created_at: new Date().toISOString().split('T')[0],
      assigned_services: 0
    };
    setTemplates([...templates, copiedTemplate]);
    toast({
      title: "Template Copied",
      description: `A copy of ${template.name} has been created`,
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    const templateToDelete = templates.find(t => t.id === templateId);
    if (templateToDelete && templateToDelete.assigned_services > 0) {
      toast({
        title: "Cannot Delete Template",
        description: `This template is being used by ${templateToDelete.assigned_services} active services`,
        variant: "destructive",
      });
      return;
    }
    
    setTemplates(templates.filter(t => t.id !== templateId));
    toast({
      title: "Template Deleted",
      description: "The service template has been deleted",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
        <Button className="flex items-center gap-2" onClick={handleAddTemplate}>
          <Plus className="h-4 w-4" />
          Create New Service Template
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Service Templates</CardTitle>
          <CardDescription>Manage service templates that can be assigned to clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Required Documents</TableHead>
                  <TableHead>Steps</TableHead>
                  <TableHead>Active Services</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{template.description}</TableCell>
                      <TableCell>{template.documents_required.length}</TableCell>
                      <TableCell>{template.steps.length}</TableCell>
                      <TableCell>
                        {template.assigned_services > 0 ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {template.assigned_services} active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            None
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/service-details/${template.id}`)}
                            title="View Details"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditTemplate(template)}
                            title="Edit Template"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleCopyTemplate(template)}
                            title="Duplicate Template"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteTemplate(template.id)}
                            title="Delete Template"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No service templates found. Create a new template to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {isDialogOpen && (
        <ServiceTemplateDialog 
          open={isDialogOpen} 
          onClose={handleCloseDialog} 
          template={selectedTemplate}
          onSave={handleSaveTemplate}
        />
      )}
    </Layout>
  );
};

export default ServiceManagement;
