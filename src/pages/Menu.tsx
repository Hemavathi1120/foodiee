
import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Button from '../components/atoms/Button';
import { useMenu } from '../hooks/useMenu';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { menuItems } = useMenu();

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starter', name: 'Starters' },
    { id: 'main', name: 'Main Course' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'drinks', name: 'Beverages' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: any) => {
    console.log('Adding to cart:', item);
    // TODO: Implement cart functionality
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            Our <span className="text-amber-400">Menu</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully crafted dishes, each a masterpiece of flavor and artistry
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-400">${item.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
