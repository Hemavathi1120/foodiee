
import React from 'react';

const DashboardOverview = () => {
  const stats = [
    { label: 'Today\'s Orders', value: '24', change: '+12%', color: 'text-green-400' },
    { label: 'Total Revenue', value: '$2,847', change: '+8%', color: 'text-green-400' },
    { label: 'Reservations', value: '18', change: '+5%', color: 'text-green-400' },
    { label: 'Pending Orders', value: '7', change: '-2%', color: 'text-red-400' },
  ];

  const recentOrders = [
    { id: '001', customer: 'John Doe', total: '$89.50', status: 'Preparing', time: '10:30 AM' },
    { id: '002', customer: 'Jane Smith', total: '$124.00', status: 'Delivered', time: '10:15 AM' },
    { id: '003', customer: 'Mike Johnson', total: '$67.25', status: 'Pending', time: '10:00 AM' },
  ];

  const popularDishes = [
    { name: 'Seared Wagyu Tenderloin', orders: 12 },
    { name: 'Mediterranean Sea Bass', orders: 8 },
    { name: 'Chocolate Soufflé', orders: 6 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif text-white mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from yesterday</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">#{order.id} - {order.customer}</p>
                  <p className="text-gray-400 text-sm">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-semibold">{order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'Preparing' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Dishes */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Popular Dishes Today</h3>
          <div className="space-y-3">
            {popularDishes.map((dish, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <p className="text-white">{dish.name}</p>
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  {dish.orders} orders
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
