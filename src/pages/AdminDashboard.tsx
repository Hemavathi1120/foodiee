
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import AdminHeader from '../components/organisms/AdminHeader';
import AdminSidebar from '../components/organisms/AdminSidebar';
import DashboardOverview from '../components/organisms/DashboardOverview';
import MenuManagement from '../components/organisms/MenuManagement';
import OrderManagement from '../components/organisms/OrderManagement';
import ReservationManagement from '../components/organisms/ReservationManagement';
import MessageManagement from '../components/organisms/MessageManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          uid: user.uid,
          email: user.email
        }));
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        navigate('/admin');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'menu':
        return <MenuManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'messages':
        return <MessageManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // This will redirect to login via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AdminHeader 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      <div className="flex">
        <AdminSidebar 
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        } pt-16`}>
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
