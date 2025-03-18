
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";

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

const formSchema = z.object({
  serviceName: z.string().min(2, { message: "Service name is required." }),
  assignedEmployee: z.string().min(1, { message: "Please select an employee." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  dueDate: z.string().min(1, { message: "Due date is required." }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ClientServiceFormProps {
  clientId?: string;
  serviceId?: string;
  onSuccess?: () => void;
}

export function ClientServiceForm({ clientId, serviceId, onSuccess }: ClientServiceFormProps) {
  const { toast } = useToast();
  const isEditing = !!serviceId;
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      assignedEmployee: "",
      startDate: new Date().toISOString().split('T')[0],
      dueDate: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Mock API call - would be replaced with actual API call
    console.log("Service form submitted:", data);
    
    toast({
      title: isEditing ? "Service Updated" : "Service Added",
      description: `${data.serviceName} has been ${isEditing ? 'updated' : 'added'} successfully.`,
    });
    
    if (onSuccess) {
      onSuccess();
    }
    
    if (!isEditing) {
      form.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Service" : "Add New Service"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter service name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignedEmployee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Employee</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="emp1">John Doe</SelectItem>
                        <SelectItem value="emp2">Jane Smith</SelectItem>
                        <SelectItem value="emp3">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter service description" 
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
                {isEditing ? "Update Service" : "Add Service"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
