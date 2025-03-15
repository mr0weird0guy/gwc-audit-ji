
import React from 'react';
import Layout from '@/components/Layout';
import { mockTasks } from '@/services/mockData';
import EmployeeStats from '@/components/employee/EmployeeStats';
import TasksOverview from '@/components/employee/TasksOverview';
import ProgressOverview from '@/components/employee/ProgressOverview';
import ActivityFeed from '@/components/employee/ActivityFeed';

const EmployeeDashboard: React.FC = () => {
  const assignedTasks = mockTasks.filter(task => task.assignedTo === 'Jane Smith');
  const pendingTasks = assignedTasks.filter(task => task.status === 'pending');
  const ongoingTasks = assignedTasks.filter(task => task.status === 'ongoing');
  const completedTasks = assignedTasks.filter(task => task.status === 'completed');
  
  // Calculate overall progress
  const totalProgress = assignedTasks.reduce((acc, task) => acc + task.progress, 0);
  const averageProgress = assignedTasks.length > 0 ? totalProgress / assignedTasks.length : 0;

  // Sort tasks by deadline for upcoming tasks
  const upcomingTasks = [...assignedTasks]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      
      <EmployeeStats 
        assignedTasks={assignedTasks.length}
        pendingTasks={pendingTasks.length}
        ongoingTasks={ongoingTasks.length}
        completedTasks={completedTasks.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TasksOverview assignedTasks={assignedTasks} />
        </div>
        
        <div>
          <ProgressOverview 
            averageProgress={averageProgress}
            pendingTasks={pendingTasks}
            ongoingTasks={ongoingTasks}
            completedTasks={completedTasks}
            upcomingTasks={upcomingTasks}
          />
        </div>
      </div>
      
      <ActivityFeed />
    </Layout>
  );
};

export default EmployeeDashboard;
