
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressOverviewProps {
  averageProgress: number;
  pendingTasks: any[];
  ongoingTasks: any[];
  completedTasks: any[];
  upcomingTasks: any[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  averageProgress,
  pendingTasks,
  ongoingTasks,
  completedTasks,
  upcomingTasks
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
        <CardDescription>Your task completion status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{averageProgress.toFixed(0)}%</span>
            </div>
            <Progress value={averageProgress} className="h-2" />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Tasks by Status</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-amber-100 p-2 rounded-md">
                  <p className="text-amber-800 text-lg font-bold">{pendingTasks.length}</p>
                  <p className="text-xs text-amber-800">Pending</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <p className="text-blue-800 text-lg font-bold">{ongoingTasks.length}</p>
                  <p className="text-xs text-blue-800">Ongoing</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <p className="text-green-800 text-lg font-bold">{completedTasks.length}</p>
                  <p className="text-xs text-green-800">Completed</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Upcoming Deadlines</p>
              {upcomingTasks.map(task => (
                <div key={task.id} className="flex justify-between items-center text-sm mb-2">
                  <span className="truncate mr-2">{task.title}</span>
                  <span className="text-red-500">{task.deadline}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
