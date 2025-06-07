
import React from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Button from '../components/atoms/Button';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            About <span className="text-amber-400">Lumière</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A culinary journey that began with passion and evolved into artistry
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6">
                Our <span className="text-amber-400">Story</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Founded in 2015 by Chef Marcus Beaumont, Lumière Dining represents the pinnacle of fine dining excellence. 
                Our commitment to culinary artistry and impeccable service has earned us recognition from critics and 
                food enthusiasts worldwide.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Every dish tells a story of passion, creativity, and respect for the finest ingredients. 
                We source locally when possible and travel globally to bring you flavors that transcend expectations.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Chef preparing dish"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-black p-6 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Chef Marcus Beaumont"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6">
                Meet Our <span className="text-amber-400">Chef</span>
              </h2>
              <h3 className="text-2xl text-amber-400 mb-4 font-serif">Marcus Beaumont</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With over two decades of culinary excellence, Chef Marcus Beaumont has trained under Michelin-starred 
                mentors across France and Italy. His innovative approach combines classical techniques with modern creativity.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                "Cooking is not just about feeding the body, but nourishing the soul. Every plate that leaves our kitchen 
                carries our passion and dedication to the craft."
              </p>
              <Button size="lg">
                View Chef's Special Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4">
              Our <span className="text-amber-400">Philosophy</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three pillars that define our approach to culinary excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Quality Ingredients</h3>
              <p className="text-gray-400 leading-relaxed">
                We source only the finest ingredients from trusted suppliers and local farms, 
                ensuring every dish meets our exceptional standards.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-800 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Culinary Innovation</h3>
              <p className="text-gray-400 leading-relaxed">
                Our menu evolves seasonally, incorporating new techniques and flavors while 
                respecting classical culinary traditions.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-800 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Exceptional Service</h3>
              <p className="text-gray-400 leading-relaxed">
                Every guest is treated as family, with personalized attention and care that 
                makes each dining experience truly memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
