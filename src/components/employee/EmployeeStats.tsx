
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle, BarChart } from 'lucide-react';

interface EmployeeStatsProps {
  assignedTasks: number;
  pendingTasks: number;
  ongoingTasks: number;
  completedTasks: number;
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({
  assignedTasks,
  pendingTasks,
  ongoingTasks,
  completedTasks
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
          <CardDescription>Total tasks assigned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <BarChart className="h-4 w-4 text-primary mr-2" />
            <div className="text-2xl font-bold">{assignedTasks}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <CardDescription>Tasks not started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-amber-500 mr-2" />
            <div className="text-2xl font-bold">{pendingTasks}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <CardDescription>Tasks being worked on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />
            <div className="text-2xl font-bold">{ongoingTasks}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CardDescription>Finished tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <div className="text-2xl font-bold">{completedTasks}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeStats;
