import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Bell, 
  PieChart, 
  Shield, 
  Smartphone, 
  Zap 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <TrendingUp className="size-6" />,
      title: 'Track All Subscriptions',
      description: 'Keep track of all your subscriptions in one centralized dashboard with smart categorization.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Bell className="size-6" />,
      title: 'Smart Reminders',
      description: 'Never miss a payment. Get notified before renewals and price changes.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <PieChart className="size-6" />,
      title: 'Spending Analytics',
      description: 'Visualize your spending patterns with beautiful charts and detailed insights.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Shield className="size-6" />,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and secure with industry-standard protection.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Smartphone className="size-6" />,
      title: 'Mobile Apps',
      description: 'Manage subscriptions on the go with our iOS and Android applications.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: <Zap className="size-6" />,
      title: 'Money-Saving Insights',
      description: 'AI-powered recommendations to help you save money on unused subscriptions.',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
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
            Everything You Need to
            <span className="gradient-text"> Manage Subscriptions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you take control of your recurring expenses
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card p-8 group cursor-pointer"
            >
              <div className={`size-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-primary-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-primary-100">Money Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;