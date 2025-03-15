
import { Task } from '../components/TaskCard';
import { TaskStatus } from '../components/StatusBadge';

// Types for our mock data
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    company: 'Acme Inc.',
    phone: '(555) 123-4567',
    status: 'active',
  },
  {
    id: '2',
    name: 'Globex Inc.',
    email: 'info@globex.com',
    company: 'Globex International',
    phone: '(555) 234-5678',
    status: 'active',
  },
  {
    id: '3',
    name: 'Wayne Enterprises',
    email: 'bruce@wayne.com',
    company: 'Wayne Enterprises',
    phone: '(555) 345-6789',
    status: 'active',
  },
  {
    id: '4',
    name: 'Stark Industries',
    email: 'tony@stark.com',
    company: 'Stark Industries',
    phone: '(555) 456-7890',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Oscorp',
    email: 'norman@oscorp.com',
    company: 'Oscorp Industries',
    phone: '(555) 567-8901',
    status: 'active',
  },
];

// Mock employees
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Auditor',
    department: 'Audit',
    phone: '(555) 123-4567',
    status: 'active',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Reviewer',
    department: 'Review',
    phone: '(555) 234-5678',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Task Manager',
    department: 'Operations',
    phone: '(555) 345-6789',
    status: 'active',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Auditor',
    department: 'Audit',
    phone: '(555) 456-7890',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Reviewer',
    department: 'Review',
    phone: '(555) 567-8901',
    status: 'active',
  },
];

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Annual Financial Audit',
    description: 'Complete the annual financial audit for Acme Corporation',
    status: 'ongoing' as TaskStatus,
    progress: 45,
    deadline: '2023-12-31',
    assignedTo: 'Jane Smith',
    client: 'Acme Corporation',
  },
  {
    id: '2',
    title: 'Tax Preparation',
    description: 'Prepare tax documents for Globex Inc.',
    status: 'pending' as TaskStatus,
    progress: 0,
    deadline: '2023-11-15',
    assignedTo: 'John Doe',
    client: 'Globex Inc.',
  },
  {
    id: '3',
    title: 'Quarterly Review',
    description: 'Perform quarterly financial review for Wayne Enterprises',
    status: 'completed' as TaskStatus,
    progress: 100,
    deadline: '2023-10-01',
    assignedTo: 'Bob Johnson',
    client: 'Wayne Enterprises',
  },
  {
    id: '4',
    title: 'Financial Statement Preparation',
    description: 'Prepare financial statements for Stark Industries',
    status: 'ongoing' as TaskStatus,
    progress: 75,
    deadline: '2023-11-30',
    assignedTo: 'Alice Williams',
    client: 'Stark Industries',
  },
  {
    id: '5',
    title: 'Compliance Audit',
    description: 'Perform compliance audit for Oscorp',
    status: 'pending' as TaskStatus,
    progress: 10,
    deadline: '2023-12-15',
    assignedTo: 'Charlie Brown',
    client: 'Oscorp',
  },
  {
    id: '6',
    title: 'Budget Planning',
    description: 'Assist with budget planning for Acme Corporation',
    status: 'ongoing' as TaskStatus,
    progress: 30,
    deadline: '2023-11-20',
    assignedTo: 'Jane Smith',
    client: 'Acme Corporation',
  },
  {
    id: '7',
    title: 'Internal Control Review',
    description: 'Review internal controls for Globex Inc.',
    status: 'pending' as TaskStatus,
    progress: 0,
    deadline: '2023-12-10',
    assignedTo: 'John Doe',
    client: 'Globex Inc.',
  },
  {
    id: '8',
    title: 'Tax Advisory',
    description: 'Provide tax advisory services for Wayne Enterprises',
    status: 'completed' as TaskStatus,
    progress: 100,
    deadline: '2023-10-15',
    assignedTo: 'Bob Johnson',
    client: 'Wayne Enterprises',
  },
];

// Mock services
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Financial Audit',
    description: 'Comprehensive review of financial statements and reporting',
    tasks: mockTasks.filter(t => t.title.includes('Financial') || t.title.includes('Audit')),
  },
  {
    id: '2',
    name: 'Tax Services',
    description: 'Tax preparation and advisory services',
    tasks: mockTasks.filter(t => t.title.includes('Tax')),
  },
  {
    id: '3',
    name: 'Compliance Services',
    description: 'Regulatory compliance review and reporting',
    tasks: mockTasks.filter(t => t.title.includes('Compliance')),
  },
  {
    id: '4',
    name: 'Advisory Services',
    description: 'Business planning and advisory services',
    tasks: mockTasks.filter(t => t.title.includes('Planning') || t.title.includes('Review')),
  },
];

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Financial Statements 2023.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Acme Corporation',
    uploadDate: '2023-10-15',
    status: 'approved',
  },
  {
    id: '2',
    name: 'Tax Return 2022.pdf',
    type: 'PDF',
    size: '1.8 MB',
    uploadedBy: 'Globex Inc.',
    uploadDate: '2023-09-30',
    status: 'approved',
  },
  {
    id: '3',
    name: 'Internal Control Documentation.docx',
    type: 'DOCX',
    size: '3.2 MB',
    uploadedBy: 'Jane Smith',
    uploadDate: '2023-10-05',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Compliance Report Q3 2023.xlsx',
    type: 'XLSX',
    size: '1.5 MB',
    uploadedBy: 'Bob Johnson',
    uploadDate: '2023-10-10',
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Budget Forecast 2024.xlsx',
    type: 'XLSX',
    size: '2.1 MB',
    uploadedBy: 'Wayne Enterprises',
    uploadDate: '2023-10-20',
    status: 'pending',
  },
];

// Mock analytics data
export const mockAnalytics = {
  tasksByStatus: {
    pending: mockTasks.filter(t => t.status === 'pending').length,
    ongoing: mockTasks.filter(t => t.status === 'ongoing').length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
  },
  employeePerformance: mockEmployees.map(emp => ({
    name: emp.name,
    tasksCompleted: Math.floor(Math.random() * 20),
    averageCompletionTime: Math.floor(Math.random() * 10) + 2 + ' days',
  })),
  clientActivity: mockClients.map(client => ({
    name: client.name,
    documentsUploaded: Math.floor(Math.random() * 10),
    activeServices: Math.floor(Math.random() * 3) + 1,
  })),
};
