import React from 'react';
import { Zap, Twitter, Facebook, Instagram, Linkedin, Mail, Github } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Roadmap', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
    Resources: ['Documentation', 'Help Center', 'API Reference', 'Community', 'Status'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Licenses'],
  };

  const socialLinks = [
    { icon: <Twitter className="size-5" />, href: '#', label: 'Twitter' },
    { icon: <Facebook className="size-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="size-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="size-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Github className="size-5" />, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-2 rounded-lg">
                <Zap className="size-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SubsTrack</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Take control of your subscriptions. Track, manage, and optimize all your recurring payments in one place.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
                <button className="bg-gradient-to-r from-primary-600 to-purple-600 px-4 py-2 rounded-r-lg hover:shadow-lg transition-all duration-300">
                  <Mail className="size-5 text-white" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 p-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-primary-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 SubsTrack. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;