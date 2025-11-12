import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Heart } from 'lucide-react';

const Pricing = () => {
  const plan = {
    name: 'Free Forever',
    description: 'Everything you need, absolutely free',
    features: [
      'Unlimited subscriptions',
      'Advanced analytics & insights',
      'Renewal reminders',
      'Price change alerts',
      'Mobile app access',
      'Email & push notifications',
      'Custom categories',
      'Export reports (CSV/PDF)',
      'Multi-currency support',
      'Dark mode',
      'Data backup & sync',
      'Community support',
    ],
  };

  return (
    <section id="pricing" className="py-20 bg-white">
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
            Simple, <span className="gradient-text">Free Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            All features, no hidden fees, no credit card required. Free forever.
          </p>
        </motion.div>

        {/* Main Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative card p-10 ring-2 ring-primary-600 shadow-2xl"
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Star className="size-4 fill-white" />
                <span>Most Popular Choice</span>
              </div>
            </div>

            {/* Plan Header */}
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-3">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-7xl font-bold gradient-text">$0</span>
                <span className="text-gray-600 ml-3 text-xl">/forever</span>
              </div>
              <p className="text-green-600 font-semibold text-lg">
                🎉 No credit card required
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="size-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full btn-primary py-4 text-lg">
              Get Started Free - No Signup Required
            </button>

            {/* Trust Text */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Join 50,000+ users managing their subscriptions for free
            </p>
          </motion.div>
        </div>

        {/* Why Free Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 card p-8 bg-gradient-to-r from-primary-50 to-purple-50 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Heart className="size-6 text-red-500 fill-red-500" />
              Why is SubsTrack Free?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe everyone deserves access to powerful financial tools. SubsTrack is 
              built by a community of developers who are passionate about helping people save 
              money. The project is open-source and funded by optional donations from users 
              who love the product.
            </p>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">Is it really free?</h4>
              <p className="text-gray-600">Yes! 100% free with no hidden costs or premium tiers.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">Do I need a credit card?</h4>
              <p className="text-gray-600">No credit card required. Just sign up and start using!</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">Any limitations?</h4>
              <p className="text-gray-600">Nope! Unlimited subscriptions and full access to all features.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-2">How can I support?</h4>
              <p className="text-gray-600">Share with friends or make an optional donation if you love it!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;