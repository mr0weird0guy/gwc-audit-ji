
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientManagement from "./pages/admin/ClientManagement";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import ServiceManagement from "./pages/admin/ServiceManagement";
import ClientDetail from "./pages/admin/ClientDetail";
import ServiceDetail from "./pages/admin/ServiceDetail";
import ClientDashboard from "./pages/client/ClientDashboard";
import DocumentUpload from "./pages/client/DocumentUpload";
import DocumentDownload from "./pages/client/DocumentDownload";
import ActiveRequests from "./pages/client/ActiveRequests";
import CompletedRequests from "./pages/client/CompletedRequests";
import ServiceDetails from "./pages/client/ServiceDetails";
import TaskDetails from "./pages/employee/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/client-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ClientManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/employee-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EmployeeManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/service-management" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ServiceManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/client-detail/:clientId" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ClientDetail />
          </ProtectedRoute>
        } />
        <Route path="/admin/service-details/:serviceId" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ServiceDetail />
          </ProtectedRoute>
        } />
        
        {/* Client Routes */}
        <Route path="/client/dashboard" element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/client/document-upload" element={
          <ProtectedRoute allowedRoles={['client']}>
            <DocumentUpload />
          </ProtectedRoute>
        } />
        <Route path="/client/document-download" element={
          <ProtectedRoute allowedRoles={['client']}>
            <DocumentDownload />
          </ProtectedRoute>
        } />
        <Route path="/client/active-requests" element={
          <ProtectedRoute allowedRoles={['client']}>
            <ActiveRequests />
          </ProtectedRoute>
        } />
        <Route path="/client/completed-requests" element={
          <ProtectedRoute allowedRoles={['client']}>
            <CompletedRequests />
          </ProtectedRoute>
        } />
        <Route path="/client/service-details/:serviceId" element={
          <ProtectedRoute allowedRoles={['client']}>
            <ServiceDetails />
          </ProtectedRoute>
        } />
        
        {/* Employee Routes */}
        <Route path="/employee/dashboard" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
        <Route path="/employee/task-details" element={
          <ProtectedRoute allowedRoles={['employee']}>
            <TaskDetails />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
