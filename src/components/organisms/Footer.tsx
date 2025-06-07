
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    // TODO: Implement newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Experience culinary excellence where every dish is a masterpiece and every moment is unforgettable. 
              Join us for an extraordinary dining journey.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Instagram clicked');
                  alert('Follow us on Instagram!');
                }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Facebook clicked');
                  alert('Follow us on Facebook!');
                }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif text-amber-400 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <div>123 Gourmet Street</div>
                  <div>Culinary District, CD 12345</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-amber-400" />
                <span className="text-gray-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-amber-400" />
                <span className="text-gray-400">hello@lumiereDining.com</span>
              </div>
            </div>
          </div>

          {/* Hours & Newsletter */}
          <div>
            <h3 className="text-xl font-serif text-amber-400 mb-4">Hours</h3>
            <div className="space-y-2 text-gray-400 mb-6">
              <div className="flex justify-between">
                <span>Mon - Thu</span>
                <span>5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat</span>
                <span>5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>5:00 PM - 9:00 PM</span>
              </div>
            </div>
            
            <h4 className="font-medium mb-3">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <Button variant="primary" size="sm" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2024 Lumière Dining. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Privacy Policy clicked');
                  alert('Privacy Policy page coming soon!');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Terms of Service clicked');
                  alert('Terms of Service page coming soon!');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Accessibility clicked');
                  alert('Accessibility page coming soon!');
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
