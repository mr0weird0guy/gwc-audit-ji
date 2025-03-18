
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Search, UserPlus, Mail, Trash, Edit, BarChart } from 'lucide-react';
import { mockAnalytics } from '@/services/mockData';

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const employees = mockAnalytics.employeePerformance;
  
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Employee
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage your employees and their assigned tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
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
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tasks Completed</TableHead>
                  <TableHead>Average Completion Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.tasksCompleted}</TableCell>
                    <TableCell>{employee.averageCompletionTime}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <BarChart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{employees.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {employees.reduce((total, employee) => total + employee.tasksCompleted, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Completion Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round(employees.reduce((total, emp) => {
                // Convert "X days" to a number
                const days = parseInt(emp.averageCompletionTime.split(' ')[0]);
                return total + days;
              }, 0) / employees.length)} days
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployeeManagement;
