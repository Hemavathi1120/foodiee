
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

const About = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
            <Button size="lg" onClick={handleLearnMore}>
              Learn More About Us
            </Button>
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
  );
};

export default About;
