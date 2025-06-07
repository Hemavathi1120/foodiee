
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import { useMenu } from '../../hooks/useMenu';

const FeaturedMenu = () => {
  const navigate = useNavigate();
  const { menuItems } = useMenu();

  // Get the first 3 main course items for featured display
  const featuredDishes = menuItems
    .filter(item => item.category === 'main')
    .slice(0, 3);

  const handleAddToCart = (dish: any) => {
    console.log('Adding to cart:', dish);
    // TODO: Implement cart functionality
    alert(`Added ${dish.name} to cart!`);
  };

  const handleViewFullMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4">
            Signature <span className="text-amber-400">Creations</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each dish is a masterpiece, crafted with passion and the finest ingredients from around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="group bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {dish.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {dish.name}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-400">${dish.price}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddToCart(dish)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={handleViewFullMenu}>
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
