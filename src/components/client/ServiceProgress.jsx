
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ServiceProgress = ({ services }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ongoing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'ongoing':
        return 'text-blue-500';
      case 'pending':
        return 'text-amber-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Progress</CardTitle>
        <CardDescription>Track the progress of your active services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {services.map((service) => (
            <div key={service.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">{service.name}</div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(service.status)}
                  <span className={`text-sm ${getStatusClass(service.status)}`}>
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </span>
                </div>
              </div>
              <Progress value={service.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{service.progress}% complete</span>
                <span>Deadline: {service.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceProgress;
