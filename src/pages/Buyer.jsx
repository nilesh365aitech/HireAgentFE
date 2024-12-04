import React from 'react';
import { CheckCircle, Globe, Users, Star } from 'lucide-react';
import Navbar from '../components/Navbar';

const Buyer = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Turn Industry Expertise Into Intelligent Voice Bots
          </h1>
          <p className="text-xl mb-8">Where Industry Expertise Meets AI Innovation</p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Share Your Expertise
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Explore Solutions
            </button>
          </div>
        </div>
      </header>

      {/* Value Propositions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* For Industry Experts */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">For Industry Experts</h2>
            <p className="text-lg mb-4">Your Expertise + Our Technology = Game-Changing Voice Bots</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-green-500" />
                Turn proven business processes into scalable voice solutions
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-green-500" />
                Share your industry knowledge with others facing similar challenges
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-green-500" />
                Create new revenue streams from your domain expertise
              </li>
            </ul>
          </div>

          {/* For Bot Buyers */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">For Bot Buyers</h2>
            <p className="text-lg mb-4">Access Voice Solutions Built by Industry Veterans</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-blue-500" />
                Get voice bots designed by professionals who've solved your exact challenges
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-blue-500" />
                Customize proven solutions to your specific needs
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 text-blue-500" />
                Deploy faster with pre-trained, industry-tested bots
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Voice Bots */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Voice Bots</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Healthcare Scheduling Bot</h3>
              <p className="text-gray-600 mb-4">Created by: Dr. Sarah Chen</p>
              <p>25 years managing multi-location medical practices</p>
              <p className="font-bold mt-2">Handles 2000+ appointments monthly</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Real Estate Inquiry Bot</h3>
              <p className="text-gray-600 mb-4">Created by: Mark Rodriguez</p>
              <p>Top 1% realtor, managed 500+ property transactions</p>
              <p className="font-bold mt-2">Handles 3000+ property inquiries monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">1. Share Your Expertise</h3>
              <p>We translate your industry knowledge into powerful voice AI - no coding required</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">2. Validate & Refine</h3>
              <p>Work with our AI experts to perfect your solution while maintaining full control of business logic</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">3. Earn & Scale</h3>
              <p>Generate revenue every time someone uses your industry-proven solution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="bg-blue-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-8">
          <div>
            <Users className="mx-auto text-5xl mb-4" />
            <h3 className="text-3xl font-bold">500+</h3>
            <p>Businesses</p>
          </div>
          <div>
            <Globe className="mx-auto text-5xl mb-4" />
            <h3 className="text-3xl font-bold">2M+</h3>
            <p>Monthly Conversations</p>
          </div>
          <div>
            <Star className="mx-auto text-5xl mb-4" />
            <h3 className="text-3xl font-bold">20+</h3>
            <p>Industry Sectors</p>
          </div>
          <div>
            <CheckCircle className="mx-auto text-5xl mb-4" />
            <h3 className="text-3xl font-bold">98%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-blue-400 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Where Industry Knowledge Becomes Intelligent Conversation
          </h2>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Share Your Expertise
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Explore Solutions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
   
    </div>
    </>
  );
};

export default Buyer;