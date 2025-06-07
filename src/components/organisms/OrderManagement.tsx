
import React, { useState } from 'react';
import Button from '../atoms/Button';
import { useToast } from '@/hooks/use-toast';

const OrderManagement = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([
    {
      id: '001',
      customer: 'John Doe',
      email: 'john@example.com',
      items: [
        { name: 'Seared Wagyu Tenderloin', quantity: 1, price: 125 },
        { name: 'Chocolate Soufflé', quantity: 1, price: 45 }
      ],
      total: 170,
      status: 'pending',
      createdAt: new Date('2024-01-15T10:30:00'),
      notes: 'Medium rare please'
    },
    {
      id: '002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      items: [
        { name: 'Mediterranean Sea Bass', quantity: 2, price: 85 }
      ],
      total: 170,
      status: 'preparing',
      createdAt: new Date('2024-01-15T10:15:00'),
      notes: ''
    },
    {
      id: '003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      items: [
        { name: 'Truffle Risotto', quantity: 1, price: 65 }
      ],
      total: 65,
      status: 'delivered',
      createdAt: new Date('2024-01-15T09:45:00'),
      notes: 'Extra parmesan'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order Updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'preparing': return 'bg-blue-500/20 text-blue-400';
      case 'ready': return 'bg-purple-500/20 text-purple-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif text-white">Order Management</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'preparing', 'ready', 'delivered'].map(status => (
            <Button
              key={status}
              size="sm"
              variant={filterStatus === status ? 'primary' : 'outline'}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Order #{order.id}
                </h3>
                <p className="text-gray-400">{order.customer} • {order.email}</p>
                <p className="text-gray-500 text-sm">
                  {order.createdAt.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">${order.total}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-4">
              <h4 className="text-white font-medium mb-2">Order Items:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-300">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              {order.notes && (
                <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    <strong>Notes:</strong> {order.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {order.status === 'pending' && (
                <Button 
                  size="sm" 
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                >
                  Start Preparing
                </Button>
              )}
              {order.status === 'preparing' && (
                <Button 
                  size="sm" 
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                >
                  Mark Ready
                </Button>
              )}
              {order.status === 'ready' && (
                <Button 
                  size="sm" 
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                >
                  Mark Delivered
                </Button>
              )}
              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateOrderStatus(order.id, 'cancelled')}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
