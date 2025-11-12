import React, { useState } from 'react';
import { 
  HiX, 
  HiCheckCircle, 
  HiExclamationCircle,
  HiInformationCircle,
  HiUpload,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';
import ServiceSelector from './ServiceSelector';
import ColorPicker from './ColorPicker';

const AddSubscriptionModal = ({ isOpen, onClose, onAdd }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    logo: '📦',
    customLogo: null,
    category: 'Entertainment',
    website: '',
    
    // Plan Details
    plan: '',
    price: '',
    billing: 'monthly',
    currency: 'USD',
    
    // Dates
    startDate: new Date().toISOString().split('T')[0],
    nextBilling: '',
    reminderDays: '3',
    
    // Payment
    paymentMethod: 'credit_card',
    autoRenew: true,
    
    // Additional
    notes: '',
    tags: [],
    notifications: true,
    color: 'bg-blue-500',
    status: 'active'
  });

  // Available emojis for logo
  const logoEmojis = [
    '🎬', '🎵', '🎨', '💻', '📚', '🎮', '💼', '🏋️', 
    '🍔', '✈️', '🏠', '🚗', '📱', '☁️', '🔒', '💳',
    '📺', '🎧', '📰', '🎯', '💡', '🎓', '⚡', '🌟',
    '🔥', '💪', '🎪', '🎭', '🎸', '📷', '🎤', '🎹'
  ];

  // Categories
  const categories = [
    'Entertainment',
    'Music & Audio',
    'Productivity',
    'Cloud Storage',
    'News & Media',
    'Gaming',
    'Health & Fitness',
    'Education',
    'Professional Tools',
    'Shopping & Retail',
    'Food & Delivery',
    'Travel',
    'Security & VPN',
    'Communication',
    'Finance',
    'Developer Tools',
    'Other'
  ];

  // Colors
  const colors = [
    { name: 'Blue', class: 'bg-blue-500', hex: '#3B82F6' },
    { name: 'Red', class: 'bg-red-500', hex: '#EF4444' },
    { name: 'Green', class: 'bg-green-500', hex: '#10B981' },
    { name: 'Yellow', class: 'bg-yellow-500', hex: '#F59E0B' },
    { name: 'Purple', class: 'bg-purple-500', hex: '#8B5CF6' },
    { name: 'Pink', class: 'bg-pink-500', hex: '#EC4899' },
    { name: 'Indigo', class: 'bg-indigo-500', hex: '#6366F1' },
    { name: 'Teal', class: 'bg-teal-500', hex: '#14B8A6' },
    { name: 'Orange', class: 'bg-orange-500', hex: '#F97316' },
    { name: 'Cyan', class: 'bg-cyan-500', hex: '#06B6D4' },
    { name: 'Gray', class: 'bg-gray-500', hex: '#6B7280' },
    { name: 'Emerald', class: 'bg-emerald-500', hex: '#059669' }
  ];

  // Payment methods
  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card', icon: '💳' },
    { value: 'debit_card', label: 'Debit Card', icon: '💳' },
    { value: 'paypal', label: 'PayPal', icon: '🅿️' },
    { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
    { value: 'other', label: 'Other', icon: '💰' }
  ];

  // Billing cycles
  const billingCycles = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly (3 months)' },
    { value: 'semi-annually', label: 'Semi-Annually (6 months)' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'one-time', label: 'One-time Payment' }
  ];

  // Validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Service name is required';
      }
      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }
    }

    if (step === 2) {
      if (!formData.price || formData.price <= 0) {
        newErrors.price = 'Please enter a valid price';
      }
      if (!formData.billing) {
        newErrors.billing = 'Please select a billing cycle';
      }
      if (!formData.nextBilling) {
        newErrors.nextBilling = 'Please select next billing date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle file upload for custom logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('customLogo', reader.result);
        handleChange('logo', ''); // Clear emoji if custom logo is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        handleChange('tags', [...formData.tags, newTag]);
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    handleChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  // Navigate steps
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    // Prepare data
    const subscriptionData = {
      ...formData,
      price: parseFloat(formData.price),
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    onAdd(subscriptionData);
    
    // Show success message
    setShowSuccess(true);
    
    // Close modal after delay
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      onClose();
    }, 1500);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      logo: '📦',
      customLogo: null,
      category: 'Entertainment',
      website: '',
      plan: '',
      price: '',
      billing: 'monthly',
      currency: 'USD',
      startDate: new Date().toISOString().split('T')[0],
      nextBilling: '',
      reminderDays: '3',
      paymentMethod: 'credit_card',
      autoRenew: true,
      notes: '',
      tags: [],
      notifications: true,
      color: 'bg-blue-500',
      status: 'active'
    });
    setCurrentStep(1);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Overlay */}
            {showSuccess && (
              <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <HiCheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Success!
                  </h3>
                  <p className="text-gray-600">
                    Subscription added successfully
                  </p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add New Subscription
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Step {currentStep} of 3
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiX className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-4">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        currentStep >= step
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      <span className={`text-xs mt-2 ${
                        currentStep >= step ? 'text-primary-600 font-medium' : 'text-gray-500'
                      }`}>
                        {step === 1 ? 'Basic Info' : step === 2 ? 'Pricing' : 'Details'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 mx-2 rounded ${
                        currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6 space-y-6">
                
                {/* STEP 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Service Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Netflix, Spotify, Adobe CC"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <HiExclamationCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Popular Services Quick Select */}
                    <ServiceSelector onSelect={(service) => {
                      handleChange('name', service.name);
                      handleChange('logo', service.logo);
                      handleChange('color', service.color);
                      handleChange('category', service.category);
                      handleChange('website', service.website || '');
                    }} />

                    {/* Logo Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Icon / Logo
                      </label>
                      
                      {/* Custom Logo Upload */}
                      <div className="mb-4">
                        <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary-500 transition-colors">
                          <div className="flex items-center gap-2 text-gray-600">
                            <HiUpload className="w-5 h-5" />
                            <span className="text-sm font-medium">
                              {formData.customLogo ? 'Change custom logo' : 'Upload custom logo'}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                        {formData.customLogo && (
                          <div className="mt-2 flex items-center justify-center">
                            <img 
                              src={formData.customLogo} 
                              alt="Custom logo" 
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Emoji Grid */}
                      {!formData.customLogo && (
                        <div className="grid grid-cols-8 gap-2">
                          {logoEmojis.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleChange('logo', emoji)}
                              className={`p-3 text-2xl rounded-lg border-2 transition-all hover:scale-110 ${
                                formData.logo === emoji
                                  ? 'border-primary-500 bg-primary-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Color Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Brand Color
                      </label>
                      <ColorPicker
                        colors={colors}
                        selectedColor={formData.color}
                        onSelect={(color) => handleChange('color', color)}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Website (Optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Website <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Pricing & Billing */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Plan Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Plan Name <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.plan}
                        onChange={(e) => handleChange('plan', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., Premium, Professional, Basic"
                      />
                    </div>

                    {/* Price & Currency */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => handleChange('price', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.price ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="9.99"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <HiExclamationCircle className="w-4 h-4" />
                            {errors.price}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={formData.currency}
                          onChange={(e) => handleChange('currency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="USD">USD $</option>
                          <option value="EUR">EUR €</option>
                          <option value="GBP">GBP £</option>
                          <option value="CAD">CAD $</option>
                          <option value="AUD">AUD $</option>
                          <option value="INR">INR ₹</option>
                        </select>
                      </div>
                    </div>

                    {/* Billing Cycle */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Billing Cycle *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {billingCycles.map((cycle) => (
                          <button
                            key={cycle.value}
                            type="button"
                            onClick={() => handleChange('billing', cycle.value)}
                            className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              formData.billing === cycle.value
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-700'
                            }`}
                          >
                            {cycle.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleChange('startDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Next Billing Date *
                        </label>
                        <input
                          type="date"
                          value={formData.nextBilling}
                          onChange={(e) => handleChange('nextBilling', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.nextBilling ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.nextBilling && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <HiExclamationCircle className="w-4 h-4" />
                            {errors.nextBilling}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() => handleChange('paymentMethod', method.value)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              formData.paymentMethod === method.value
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-700'
                            }`}
                          >
                            <span className="text-xl">{method.icon}</span>
                            <span>{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Auto Renewal Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <HiInformationCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Auto-Renewal</p>
                          <p className="text-sm text-gray-600">
                            Automatically renew this subscription
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange('autoRenew', !formData.autoRenew)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.autoRenew ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.autoRenew ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Additional Details */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Reminder Settings */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Remind me before renewal
                      </label>
                      <select
                        value={formData.reminderDays}
                        onChange={(e) => handleChange('reminderDays', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="1">1 day before</option>
                        <option value="3">3 days before</option>
                        <option value="7">1 week before</option>
                        <option value="14">2 weeks before</option>
                        <option value="30">1 month before</option>
                      </select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tags <span className="text-gray-400 font-normal">(Press Enter to add)</span>
                      </label>
                      <input
                        type="text"
                        onKeyDown={handleTagInput}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., work, personal, shared"
                      />
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-primary-900"
                              >
                                <HiX className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Notes <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Add any additional notes or information about this subscription..."
                      />
                    </div>

                    {/* Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🔔</span>
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">
                            Receive email reminders for this subscription
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange('notifications', !formData.notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          formData.notifications ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.notifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-6 border border-primary-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Service</span>
                          <span className="font-medium text-gray-900">{formData.name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Plan</span>
                          <span className="font-medium text-gray-900">{formData.plan || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Price</span>
                          <span className="font-medium text-gray-900">
                            ${formData.price || '0.00'} / {formData.billing}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Next Billing</span>
                          <span className="font-medium text-gray-900">
                            {formData.nextBilling || 'Not set'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-primary-200">
                          <span className="text-sm font-semibold text-gray-900">Yearly Cost</span>
                          <span className="text-lg font-bold text-primary-600">
                            ${formData.price ? (
                              formData.billing === 'yearly' ? formData.price :
                              formData.billing === 'monthly' ? (formData.price * 12).toFixed(2) :
                              formData.billing === 'quarterly' ? (formData.price * 4).toFixed(2) :
                              formData.billing === 'weekly' ? (formData.price * 52).toFixed(2) :
                              '0.00'
                            ) : '0.00'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HiChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <div className="flex items-center gap-3">
                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>

                  {/* Next/Submit Button */}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30"
                    >
                      Next
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all shadow-lg shadow-primary-500/30"
                    >
                      <HiCheckCircle className="w-5 h-5" />
                      Add Subscription
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubscriptionModal;