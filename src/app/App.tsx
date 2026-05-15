import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VisionMission } from './components/VisionMission';
import { Pastor } from './components/Pastor';
import { TestimonyForm } from './components/TestimonyForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPage } from './components/AdminPage';
import { AdminForgotPassword } from './components/AdminForgotPassword';
import { AdminResetPassword } from './components/AdminResetPassword';
import { AdminSetup } from './components/AdminSetup';
import { AdminWelcome } from './components/AdminWelcome';
import { Toaster } from './components/ui/sonner';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <VisionMission />
      <Pastor />
      <TestimonyForm />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/welcome" element={<AdminWelcome />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </HashRouter>
  );
}
