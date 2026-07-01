import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from '../pages/Products/ProductsPage'
import DashboardPage from '../pages/Dashboard/DashboardPage';
import LoginPage from '../pages/Login/LoginPage'
import SalesPage from '../pages/Sales/SalesPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/sales" element ={<SalesPage />} />
      </Routes>
    </BrowserRouter>
  );
}