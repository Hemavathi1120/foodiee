import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import { useMenu } from '../hooks/useMenu';
import { useToast } from '@/hooks/use-toast';
import { orderService, OrderItem } from '../services/orderService';
import Button from '../components/atoms/Button';

const PreOrder = () => {
  const { menuItems } = useMenu();
  const { toast } = useToast();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  });

  const addToCart = (menuItem: any) => {
    const existingItem = cart.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.menuItem.id === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { menuItem, quantity: 1, specialInstructions: '' }]);
    }
    toast({
      title: "Added to Cart",
      description: `${menuItem.name} has been added to your cart`,
    });
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.menuItem.id !== itemId));
    } else {
      setCart(cart.map(item => 
        item.menuItem.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before placing an order",
        variant: "destructive"
      });
      return;
    }

    const totalAmount = cart.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0
    );

    const order = orderService.createOrder({
      items: cart,
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone
      },
      pickupDate: customerInfo.pickupDate,
      pickupTime: customerInfo.pickupTime,
      totalAmount,
      specialInstructions: customerInfo.specialInstructions
    });

    toast({
      title: "Order Placed Successfully",
      description: `Your order #${order.id} has been placed`,
    });

    // Reset form
    setCart([]);
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      pickupDate: '',
      pickupTime: '',
      specialInstructions: ''
    });
  };

  const getTotalAmount = () => cart.reduce((total, item) => 
    total + (item.menuItem.price * item.quantity), 0
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            Pre-<span className="text-amber-400">Order</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Order your favorite dishes in advance and pick them up at your convenience
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Items */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-serif">Menu Items</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-xl p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <span className="text-amber-400 font-bold">${item.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                      <Button 
                        onClick={() => addToCart(item)}
                        className="w-full mt-4"
                      >
                        Add to Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-gray-800 rounded-xl p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-serif mb-6">Your Order</h2>
              
              {cart.length > 0 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.menuItem.id} className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{item.menuItem.name}</h4>
                          <p className="text-sm text-gray-400">${item.menuItem.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-xl font-bold flex justify-between">
                      <span>Total:</span>
                      <span className="text-amber-400">${getTotalAmount()}</span>
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      required
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={customerInfo.pickupDate}
                      onChange={(e) => setCustomerInfo({...customerInfo, pickupDate: e.target.value})}
                    />
                    <select
                      required
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      value={customerInfo.pickupTime}
                      onChange={(e) => setCustomerInfo({...customerInfo, pickupTime: e.target.value})}
                    >
                      <option value="">Select Pickup Time</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const hour = i + 11; // 11 AM to 10 PM
                        return `${hour % 12 + 1}:00 ${hour < 12 ? 'AM' : 'PM'}`;
                      }).map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Special Instructions (Optional)"
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                      rows={3}
                      value={customerInfo.specialInstructions}
                      onChange={(e) => setCustomerInfo({...customerInfo, specialInstructions: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Place Order
                  </Button>
                </form>
              ) : (
                <p className="text-gray-400 text-center">Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PreOrder;
