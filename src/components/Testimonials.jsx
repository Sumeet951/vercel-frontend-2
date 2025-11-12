import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      image: '👩‍💼',
      rating: 5,
      text: 'SubsTrack helped me discover I was paying for 3 streaming services I never used. Saved me $40/month!',
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: '👨‍💻',
      rating: 5,
      text: 'The analytics dashboard is incredible. I finally understand where my money goes each month.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      image: '👩‍🎨',
      rating: 5,
      text: 'Best subscription manager out there. The renewal reminders alone are worth it. Highly recommended!',
    },
    {
      name: 'David Kim',
      role: 'Entrepreneur',
      image: '👨‍💼',
      rating: 5,
      text: 'Manages all my business and personal subscriptions in one place. Game changer for my workflow.',
    },
    {
      name: 'Lisa Thompson',
      role: 'Content Creator',
      image: '👩‍🎤',
      rating: 5,
      text: 'The AI insights are spot on. It suggested switching to annual plans and I saved over $200 this year!',
    },
    {
      name: 'James Wilson',
      role: 'Product Manager',
      image: '👨‍🚀',
      rating: 5,
      text: 'Clean interface, powerful features. This app paid for itself in the first month by finding unused subscriptions.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users have to say about managing their subscriptions
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 hover:scale-105 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <Quote className="size-10 text-primary-200 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-8">Trusted by users from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-2xl font-bold text-gray-400">Google</div>
            <div className="text-2xl font-bold text-gray-400">Microsoft</div>
            <div className="text-2xl font-bold text-gray-400">Amazon</div>
            <div className="text-2xl font-bold text-gray-400">Apple</div>
            <div className="text-2xl font-bold text-gray-400">Meta</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;