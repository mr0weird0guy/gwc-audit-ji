
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart, Clock, AlertTriangle } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: 1, 
      type: 'completed',
      title: 'Task completed',
      description: 'Quarterly Review for Wayne Enterprises marked as completed',
      time: '1 hour ago',
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 2, 
      type: 'progress',
      title: 'Progress update',
      description: 'Updated progress on Annual Financial Audit to 45%',
      time: '3 hours ago',
      icon: BarChart,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 3, 
      type: 'deadline',
      title: 'Deadline approaching',
      description: 'Tax Preparation for Globex Inc. is due in 3 days',
      time: 'Yesterday',
      icon: Clock,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      id: 4, 
      type: 'new',
      title: 'New task assigned',
      description: 'New task assigned: Compliance Audit for Oscorp',
      time: '2 days ago',
      icon: AlertTriangle,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Updates</CardTitle>
        <CardDescription>Latest changes to your tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 border-b pb-4">
              <div className={`rounded-full p-2 ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
