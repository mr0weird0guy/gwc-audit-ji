
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserRole } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  ClipboardList, 
  FileText, 
  Upload, 
  Download, 
  Bell, 
  BarChart,
  Settings
} from 'lucide-react';

interface SidebarProps {
  userRole?: UserRole;
}

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ userRole = 'client' }) => {
  const location = useLocation();
  
  const sidebarItems: SidebarItem[] = [
    // Admin routes
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', roles: ['admin'] },
    { icon: Users, label: 'Client Management', href: '/admin/client-management', roles: ['admin'] },
    { icon: UserCog, label: 'Employee Management', href: '/admin/employee-management', roles: ['admin'] },
    { icon: ClipboardList, label: 'Service Management', href: '/admin/service-management', roles: ['admin'] },
    { icon: BarChart, label: 'Reports', href: '/admin/reports', roles: ['admin'] },
    { icon: Settings, label: 'Settings', href: '/admin/settings', roles: ['admin'] },
    
    // Client routes
    { icon: LayoutDashboard, label: 'Dashboard', href: '/client/dashboard', roles: ['client'] },
    { icon: Upload, label: 'Upload Documents', href: '/client/document-upload', roles: ['client'] },
    { icon: Download, label: 'Download Documents', href: '/client/document-download', roles: ['client'] },
    { icon: Bell, label: 'Notifications', href: '/client/notifications', roles: ['client'] },
    { icon: Settings, label: 'Account Settings', href: '/client/settings', roles: ['client'] },
    
    // Employee routes
    { icon: LayoutDashboard, label: 'Dashboard', href: '/employee/dashboard', roles: ['employee'] },
    { icon: ClipboardList, label: 'Task Details', href: '/employee/task-details', roles: ['employee'] },
    { icon: FileText, label: 'Document Management', href: '/employee/document-management', roles: ['employee'] },
    { icon: BarChart, label: 'Progress Tracking', href: '/employee/progress-tracking', roles: ['employee'] },
    { icon: Bell, label: 'Notifications', href: '/employee/notifications', roles: ['employee'] },
    { icon: Settings, label: 'Settings', href: '/employee/settings', roles: ['employee'] },
  ];

  const filteredItems = sidebarItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-sidebar md:border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">GWC Audit</h2>
        <p className="text-sm text-muted-foreground capitalize">{userRole} Portal</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {filteredItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">© 2023 GWC Audit Portal</p>
      </div>
    </div>
  );
};

export default Sidebar;
