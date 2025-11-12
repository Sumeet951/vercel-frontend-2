import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const benefits = [
    'Completely Free',
    'No Credit Card Required',
    'Unlimited Subscriptions'
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 size-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float [animation-delay:2s]"></div>
        <div className="absolute top-40 left-40 size-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float [animation-delay:4s]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                🎉 100% Free Forever
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Take Control of Your{' '}
              <span className="gradient-text">Subscriptions</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Track, manage, and optimize all your recurring payments in one place. 
              Save money and never miss a renewal again - completely free!
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center gap-2 group text-lg px-12 py-4">
                <span>Get Started Free</span>
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">$2M+</div>
                <div className="text-sm text-gray-600">Money Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Dashboard Mockup */}
              <div className="card p-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Your Dashboard</h3>
                    <div className="size-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"></div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-primary-700">$234</div>
                      <div className="text-sm text-primary-600">Monthly</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-700">12</div>
                      <div className="text-sm text-purple-600">Active</div>
                    </div>
                  </div>

                  {/* Subscriptions */}
                  <div className="space-y-3">
                    {[
                      { name: 'Netflix', cost: '$15.99', color: 'bg-red-500' },
                      { name: 'Spotify', cost: '$9.99', color: 'bg-green-500' },
                      { name: 'Adobe CC', cost: '$52.99', color: 'bg-blue-500' },
                    ].map((sub, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 ${sub.color} rounded-lg`}></div>
                          <span className="font-medium text-gray-700">{sub.name}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{sub.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl"
              >
                <div className="text-2xl">💰</div>
                <div className="text-xs font-semibold text-green-600">+$50 saved</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl"
              >
                <div className="text-2xl">🔔</div>
                <div className="text-xs font-semibold text-primary-600">3 renewals</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;