import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, BarChart3, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="size-8" />,
      title: 'Create Your Account',
      description: 'Sign up in seconds with email or social login. Completely free, no credit card needed.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Search className="size-8" />,
      title: 'Add Subscriptions',
      description: 'Manually add or auto-import subscriptions from your email. Track unlimited services.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <BarChart3 className="size-8" />,
      title: 'Track & Analyze',
      description: 'Monitor spending patterns, get insights, and receive renewal reminders automatically.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <CheckCircle className="size-8" />,
      title: 'Save Money',
      description: 'Discover unused subscriptions and get recommendations to cut costs effortlessly.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and take control of your subscriptions - all for free!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`size-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white shadow-lg relative z-10`}>
                    {step.icon}
                  </div>
                </div>

                {/* Step Number Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-white border-2 border-gray-200 rounded-full size-8 flex items-center justify-center text-sm font-bold text-gray-700 z-20">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="btn-primary text-lg px-10 py-4">
            Get Started Free
          </button>
          <p className="mt-4 text-gray-600">
            No credit card required • Free forever • All features included
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;