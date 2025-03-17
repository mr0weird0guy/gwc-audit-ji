
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, FileText, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'task_update' | 'document_request' | 'document_uploaded' | 'deadline';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'task_update',
      title: 'Task Progress Updated',
      message: 'Tax Filing preparation is now 75% complete',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'document_request',
      title: 'Document Required',
      message: 'Please upload your Q2 financial statements',
      timestamp: 'Yesterday',
      read: false
    },
    {
      id: '3',
      type: 'document_uploaded',
      title: 'Document Uploaded',
      message: 'Your accountant has uploaded Tax Filing Instructions',
      timestamp: '2 days ago',
      read: true
    },
    {
      id: '4',
      type: 'deadline',
      title: 'Upcoming Deadline',
      message: 'Tax Filing deadline in 5 days',
      timestamp: '3 days ago',
      read: true
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_update':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'document_request':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'document_uploaded':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated on your services</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={markAllAsRead}
          disabled={!notifications.some(n => !n.read)}
        >
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-4 p-3 rounded-md ${
                  notification.read ? 'bg-background' : 'bg-muted'
                }`}
              >
                <div className="rounded-full p-2 bg-background">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{notification.title}</h4>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 px-2"
                      >
                        Mark read
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
