import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ClientsPage from './pages/ClientsPage';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceCreatePage from './pages/InvoiceCreatePage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import SettingsPage from './pages/SettingsPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { useEffect } from 'react';

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/invoices/new" element={<InvoiceCreatePage />} />
        <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}