
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TaskCard from '@/components/TaskCard';
import { useNavigate } from 'react-router-dom';

interface TasksOverviewProps {
  assignedTasks: any[];
}

const TasksOverview: React.FC<TasksOverviewProps> = ({ assignedTasks }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
        <CardDescription>Tasks assigned to you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task}
              onClick={() => navigate('/employee/task-details')}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksOverview;
