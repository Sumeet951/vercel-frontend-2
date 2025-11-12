import React, { useState } from 'react';
import { HiSearch, HiStar } from 'react-icons/hi';
import { popularServices } from '../../data/popularServices';

const ServiceSelector = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'entertainment', 'productivity', 'news', 'health', 'education', 'finance'];

  const filteredServices = popularServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (service) => {
    onSelect(service);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center text-2xl`}>
                {service.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 capitalize">{service.category}</p>
                {service.isPopular && (
                  <div className="flex items-center gap-1 mt-1">
                    <HiStar className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-amber-600 font-medium">Popular</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-500">No services found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Custom Service Option */}
      <div className="border-t border-gray-200 pt-4">
        <div
          onClick={() => onSelect({
            id: 'custom',
            name: 'Custom Service',
            category: 'other',
            logo: '📱',
            color: 'bg-gray-500',
            isPopular: false
          })}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl group-hover:bg-primary-100 transition-colors">
              ➕
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                Add Custom Service
              </h3>
              <p className="text-sm text-gray-600">Can't find your service? Add it manually</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;
