
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { Search, UserPlus, Mail, Trash, Edit } from 'lucide-react';
import { mockAnalytics } from '@/services/mockData';

const ClientManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const clients = mockAnalytics.clientActivity;
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>Manage your client accounts and their services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
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
                  <TableHead>Client Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>{client.activeServices}</TableCell>
                    <TableCell>{client.documentsUploaded}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
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
            <CardTitle className="text-sm">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{clients.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {clients.reduce((total, client) => total + client.activeServices, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Documents Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {clients.reduce((total, client) => total + client.documentsUploaded, 0)}
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClientManagement;
