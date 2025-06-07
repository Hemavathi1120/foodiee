
import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "interior",
      title: "Main Dining Room"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "food",
      title: "Wagyu Tenderloin"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "interior",
      title: "Private Dining Area"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "food",
      title: "Chocolate Soufflé"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "kitchen",
      title: "Chef at Work"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "food",
      title: "Mediterranean Sea Bass"
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'food', name: 'Cuisine' },
    { id: 'interior', name: 'Interior' },
    { id: 'kitchen', name: 'Kitchen' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            Our <span className="text-amber-400">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A visual journey through our culinary artistry and elegant atmosphere
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-2xl cursor-pointer hover:transform hover:scale-105 transition-all duration-500"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-xl font-serif">{image.title}</h3>
                    <p className="text-amber-400 capitalize">{image.category}</p>
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

export default Gallery;
