import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from '../pages/Products/ProductsPage'
import DashboardPage from '../pages/Dashboard/DashboardPage';
import LoginPage from '../pages/Login/LoginPage'
import SalesPage from '../pages/Sales/SalesPage';
import RegisterPage from '../pages/Register/RegisterPage';
import ExpensesPage from '../pages/Expenses/ExpensesPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import SettingsPage from '../Settings/SettingsPage';
import AnalyticsPage from '../pages/Analytics/AnalyticsPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/sales" element ={<SalesPage />} />
        <Route path ="/expenses" element = {<ExpensesPage/>} />
        <Route path ="/reports" element = {<ReportsPage/>} />
        <Route path ="/settings" element = {<SettingsPage/>} />
        <Route path ="/analytics" element = {<AnalyticsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}