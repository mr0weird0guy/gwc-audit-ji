
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Step {
  id: string;
  title: string;
}

interface Document {
  id: string;
  name: string;
}

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

interface ServiceTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: ServiceTemplate | null;
  onSave: (template: ServiceTemplate) => void;
}

export function ServiceTemplateDialog({ open, onClose, template, onSave }: ServiceTemplateDialogProps) {
  const { toast } = useToast();
  const isEditing = !!template;
  
  const [name, setName] = useState(template?.name || '');
  const [description, setDescription] = useState(template?.description || '');
  const [requiredDocs, setRequiredDocs] = useState<Document[]>(
    template?.documents_required.map((doc, index) => ({ id: `req-${index}`, name: doc })) || []
  );
  const [deliverableDocs, setDeliverableDocs] = useState<Document[]>(
    template?.documents_deliverables.map((doc, index) => ({ id: `del-${index}`, name: doc })) || []
  );
  const [steps, setSteps] = useState<Step[]>(
    template?.steps.map((step, index) => ({ id: `step-${index}`, title: step })) || []
  );
  
  const [newReqDoc, setNewReqDoc] = useState('');
  const [newDelDoc, setNewDelDoc] = useState('');
  const [newStep, setNewStep] = useState('');

  const addRequiredDoc = () => {
    if (newReqDoc.trim()) {
      setRequiredDocs([...requiredDocs, { id: `req-${Date.now()}`, name: newReqDoc }]);
      setNewReqDoc('');
    }
  };

  const addDeliverableDoc = () => {
    if (newDelDoc.trim()) {
      setDeliverableDocs([...deliverableDocs, { id: `del-${Date.now()}`, name: newDelDoc }]);
      setNewDelDoc('');
    }
  };

  const addStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, { id: `step-${Date.now()}`, title: newStep }]);
      setNewStep('');
    }
  };

  const removeRequiredDoc = (id: string) => {
    setRequiredDocs(requiredDocs.filter(doc => doc.id !== id));
  };

  const removeDeliverableDoc = (id: string) => {
    setDeliverableDocs(deliverableDocs.filter(doc => doc.id !== id));
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive",
      });
      return;
    }

    // Prepare the data for submission
    const templateData = {
      id: template?.id || `new-${Date.now()}`,
      name,
      description,
      documents_required: requiredDocs.map(doc => doc.name),
      documents_deliverables: deliverableDocs.map(doc => doc.name),
      steps: steps.map(step => step.title),
      created_at: template?.created_at || new Date().toISOString().split('T')[0],
      assigned_services: template?.assigned_services || 0
    };

    onSave(templateData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Service Template' : 'Create New Service Template'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter template name"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter template description"
              className="min-h-[100px]"
            />
          </div>
          
          {/* Required Documents Section */}
          <div className="grid grid-cols-1 gap-2">
            <Label>Required Documents</Label>
            <div className="flex gap-2">
              <Input
                value={newReqDoc}
                onChange={(e) => setNewReqDoc(e.target.value)}
                placeholder="Add required document"
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && addRequiredDoc()}
              />
              <Button type="button" onClick={addRequiredDoc}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {requiredDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{doc.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeRequiredDoc(doc.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {requiredDocs.length === 0 && (
                <p className="text-sm text-muted-foreground">No required documents added yet.</p>
              )}
            </div>
          </div>
          
          {/* Deliverable Documents Section */}
          <div className="grid grid-cols-1 gap-2">
            <Label>Deliverable Documents</Label>
            <div className="flex gap-2">
              <Input
                value={newDelDoc}
                onChange={(e) => setNewDelDoc(e.target.value)}
                placeholder="Add deliverable document"
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && addDeliverableDoc()}
              />
              <Button type="button" onClick={addDeliverableDoc}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {deliverableDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{doc.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeDeliverableDoc(doc.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {deliverableDocs.length === 0 && (
                <p className="text-sm text-muted-foreground">No deliverable documents added yet.</p>
              )}
            </div>
          </div>
          
          {/* Service Steps Section */}
          <div className="grid grid-cols-1 gap-2">
            <Label>Service Steps</Label>
            <div className="flex gap-2">
              <Input
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                placeholder="Add service step"
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && addStep()}
              />
              <Button type="button" onClick={addStep}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center justify-between p-2 border rounded">
                  <span className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    {step.title}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {steps.length === 0 && (
                <p className="text-sm text-muted-foreground">No steps added yet.</p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {isEditing ? 'Update Template' : 'Create Template'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
