import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FloatingCart } from './components/FloatingCart';
import { LandingPage } from './pages/LandingPage';
import { ActivationPage } from './pages/ActivationPage';
import { RedirectPage } from './pages/RedirectPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ResellerManager } from './pages/ResellerManager';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { MyAccount } from './pages/MyAccount';
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-blue-200 selection:text-blue-900 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

                <Route path="/r/:codigo" element={<RedirectPage />} />
                
                {/* Protected Routes */}
                <Route path="/admin" element={<Navigate to="/admin/qr" replace />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/mi-cuenta" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                <Route path="/activar" element={<ActivationPage />} />
                <Route path="/activar/:codigo" element={<ActivationPage />} />
                <Route path="*" element={<NotFoundPage />} />
                
                <Route 
                  path="/admin/qr" 
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'RESELLER_PRO']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/revendedores" 
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <ResellerManager />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
            <FloatingCart />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
