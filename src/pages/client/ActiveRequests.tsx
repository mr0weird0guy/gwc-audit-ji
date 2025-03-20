
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/components/Layout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

// Mock active services data
const activeServices = [
  {
    id: '1',
    name: 'Tax Filing 2023',
    assignedTo: 'Sarah Johnson',
    deadline: 'May 15, 2023',
    status: 'in-progress',
    progress: 75,
  },
  {
    id: '2',
    name: 'Quarterly Financial Audit',
    assignedTo: 'Michael Chen',
    deadline: 'Apr 30, 2023',
    status: 'pending-documents',
    progress: 40,
  },
  {
    id: '3',
    name: 'Compliance Check',
    assignedTo: 'Emma Rodriguez',
    deadline: 'Jun 20, 2023',
    status: 'in-progress',
    progress: 30,
  },
];

const ActiveRequests: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (serviceId: string) => {
    navigate(`/client/service-details/${serviceId}`);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Active Requests</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Services</CardTitle>
          <CardDescription>
            View all your active service requests and track their progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeServices.map((service) => (
                <TableRow 
                  key={service.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(service.id)}
                >
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.assignedTo}</TableCell>
                  <TableCell>{service.deadline}</TableCell>
                  <TableCell>
                    <StatusBadge status={service.status} />
                  </TableCell>
                  <TableCell>{service.progress}%</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(service.id);
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ActiveRequests;
