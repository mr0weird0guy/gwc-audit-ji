
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock clients for selection
const mockClients = [
  { id: 'client1', name: 'Acme Corporation' },
  { id: 'client2', name: 'Globex Inc.' },
  { id: 'client3', name: 'Wayne Enterprises' },
  { id: 'client4', name: 'Stark Industries' },
  { id: 'client5', name: 'Oscorp' },
];

// Mock employees for selection
const mockEmployees = [
  { id: 'emp1', name: 'John Doe', role: 'Auditor' },
  { id: 'emp2', name: 'Jane Smith', role: 'Reviewer' },
  { id: 'emp3', name: 'Robert Johnson', role: 'Task Manager' },
  { id: 'emp4', name: 'Sarah Williams', role: 'Auditor' },
  { id: 'emp5', name: 'Michael Brown', role: 'Reviewer' },
];

const formSchema = z.object({
  clientId: z.string().min(1, { message: "Please select a client." }),
  primaryEmployeeId: z.string().min(1, { message: "Please select a primary employee." }),
  secondaryEmployeeIds: z.array(z.string()).optional(),
  startDate: z.string().min(1, { message: "Start date is required." }),
  dueDate: z.string().min(1, { message: "Due date is required." }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ClientServiceFormProps {
  clientId?: string;
  serviceTemplateId?: string;
  onSuccess?: () => void;
}

export function ClientServiceForm({ clientId, serviceTemplateId, onSuccess }: ClientServiceFormProps) {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: clientId || "",
      primaryEmployeeId: "",
      secondaryEmployeeIds: [],
      startDate: new Date().toISOString().split('T')[0],
      dueDate: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // For demonstration, create a payload that would be sent to an API
    const serviceData = {
      ...data,
      serviceTemplateId,
      status: "pending",
      progress: 0,
      created_at: new Date().toISOString(),
    };
    
    console.log("Service assignment form submitted:", serviceData);
    
    // Show success message
    const clientName = mockClients.find(c => c.id === data.clientId)?.name;
    toast({
      title: "Service Assigned",
      description: `Service has been assigned to ${clientName} successfully.`,
    });
    
    if (onSuccess) {
      onSuccess();
    }
    
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Service to Client</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockClients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="primaryEmployeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Employee</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockEmployees.map(employee => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name} ({employee.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any additional notes for this service assignment" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button type="submit">
                Assign Service
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
