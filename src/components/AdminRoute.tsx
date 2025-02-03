import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // אל תשכח להוסיף את הדף הראשי
import { useAdminRoute } from '../hooks/useAdminRoute'; // ייבוא ה-Hook

interface AdminRouteProps {
  children: React.ReactNode;
  path: string;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, path }) => {
  const isAdmin = useAdminRoute(); // שימוש ב-Hook לבדוק אם המשתמש הוא אדמין

  if (!isAdmin) {
    return <LandingPage />; // אם לא אדמין, הצג את הדף הראשי
  }

  return (
    <Routes>
      <Route path={path} element={children} />
    </Routes>
  );
};

export default AdminRoute;
