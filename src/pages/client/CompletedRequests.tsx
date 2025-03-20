
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

// Mock completed services data
const completedServices = {
  '2023': [
    {
      id: '101',
      name: 'Annual Financial Statement 2022',
      completedDate: 'Mar 15, 2023',
      documentCount: 5,
    },
    {
      id: '102',
      name: 'Business Tax Return 2022',
      completedDate: 'Apr 10, 2023',
      documentCount: 3,
    },
    {
      id: '103',
      name: 'Q1 Payroll Tax Filing',
      completedDate: 'Apr 30, 2023',
      documentCount: 2,
    },
  ],
  '2022': [
    {
      id: '201',
      name: 'Annual Financial Statement 2021',
      completedDate: 'Mar 12, 2022',
      documentCount: 4,
    },
    {
      id: '202',
      name: 'Business Tax Return 2021',
      completedDate: 'Apr 8, 2022',
      documentCount: 3,
    },
  ],
};

type YearKey = keyof typeof completedServices;

const CompletedRequests: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<YearKey>('2023');

  const handleDownload = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Mock download functionality
    console.log(`Downloading documents for service ${serviceId}`);
    // In a real app, this would trigger an API call to generate a download link
  };

  const handleDownloadAll = (year: YearKey) => {
    // Mock download all functionality
    console.log(`Downloading all documents for year ${year}`);
    // In a real app, this would trigger an API call to generate a download link for all documents
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Completed Requests</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Completed Services</CardTitle>
          <CardDescription>
            Access and download completed service documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedYear} onValueChange={(value) => setSelectedYear(value as YearKey)}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                {Object.keys(completedServices).map((year) => (
                  <TabsTrigger key={year} value={year}>
                    {year}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownloadAll(selectedYear)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download All {selectedYear} Documents
              </Button>
            </div>
            
            {Object.entries(completedServices).map(([year, services]) => (
              <TabsContent key={year} value={year}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Document Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                            {service.name}
                          </div>
                        </TableCell>
                        <TableCell>{service.completedDate}</TableCell>
                        <TableCell>{service.documentCount} documents</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleDownload(service.id, e)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CompletedRequests;
