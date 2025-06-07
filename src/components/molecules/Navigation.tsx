
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../atoms/Button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleOrderOnline = () => {
    console.log('Order online clicked');
    // TODO: Implement online ordering
    alert('Online ordering coming soon!');
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`relative text-white hover:text-amber-400 transition-colors duration-300 font-medium ${
              location.pathname === item.path ? 'text-amber-400' : ''
            } group`}
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        <Button variant="outline" size="sm" onClick={handleOrderOnline}>
          Order Online
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-white hover:text-amber-400 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-64 z-50 lg:hidden">
          <div className="py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 text-white hover:text-amber-400 hover:bg-gray-800 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6 pt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  handleOrderOnline();
                }}
              >
                Order Online
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
