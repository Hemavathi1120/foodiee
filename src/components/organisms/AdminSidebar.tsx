
import React from 'react';

interface AdminSidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'menu', label: 'Menu Items', icon: '🍽️' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'reservations', label: 'Reservations', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
