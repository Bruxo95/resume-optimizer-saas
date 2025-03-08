import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loadUser } from '../../store/slices/authSlice';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Sidebar from '../ui/Sidebar';
import AlertManager from '../ui/AlertManager';
import ModalManager from '../ui/ModalManager';

const MainLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  // Load user on initial render if token exists
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  // Determine if we should show the sidebar
  const showSidebar = isAuthenticated && !location.pathname.startsWith('/auth');

  return (
    <div className="flex flex-col min-h-screen">
      <AlertManager />
      <ModalManager />
      <Header />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            showSidebar && sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
