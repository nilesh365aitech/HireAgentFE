import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import customersupport from "../assets/customersupport.png"
import healthcare from "../assets/health.png"
import education from "../assets/education.png"

const HeroBanner = () => {
  // Hero banner data
  const heroSlides = [
    {
      id: 1,
      title: "Premium Healthcare Bots",
      description: "Revolutionize patient care with AI-powered voice assistants",
      buttonText: "Explore Healthcare",
      image: healthcare,
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Education Voice Assistants",
      description: "Transform learning with interactive AI tutors",
      buttonText: "View Education Bots",
      image: education,
      color: "bg-green-600"
    },
    {
      id: 3,
      title: "Customer Service Solutions",
      description: "24/7 customer support with intelligent voice bots",
      buttonText: "Discover More",
      image: customersupport,
      color: "bg-purple-600"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto scroll hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute  inset-0 bg-black bg-opacity-40 flex  pt-24 items-start justify-start">
              <div className="text-center text-white p-8 max-w-2xl">
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.description}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Hero Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default HeroBanner;










