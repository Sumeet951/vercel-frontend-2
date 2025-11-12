import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Bell,
  CreditCard,
  RefreshCw,
  ArrowUpRight,
  ChevronRight,
  Loader2,
  Menu
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar'; // ✅ Import Sidebar

// ============================================
// Stat Card Component
// ============================================
const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <div className="flex items-center text-green-600 text-sm font-medium">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          {trendValue}
        </div>
      )}
    </div>
    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

// SpendingChart component has been removed as requested.

// ============================================
// Upcoming Card Component
// ============================================
const UpcomingCard = ({ subscription, onEdit }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-purple-200 group">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 ${subscription.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
          {subscription.logo}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {subscription.name}
          </h4>
          <p className="text-xs text-gray-500">{subscription.category}</p>
        </div>
      </div>
      <button 
        onClick={() => onEdit(subscription)}
        className="p-2 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
      >
        <Edit2 className="w-4 h-4 text-gray-600" />
      </button>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          subscription.daysUntil <= 3 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {subscription.daysUntil} days
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">${subscription.cost}</p>
      </div>
    </div>
  </div>
);

// ============================================
// Subscription Card Component
// ============================================
const SubscriptionCard = ({ subscription, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 ${subscription.color} rounded-2xl flex items-center justify-center text-3xl shadow-md`}>
            {subscription.logo}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
              {subscription.name}
            </h4>
            <p className="text-sm text-gray-500">{subscription.category}</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10">
              <button 
                onClick={() => { onEdit(subscription); setShowActions(false); }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => { onDelete(subscription._id); setShowActions(false); }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Amount</span>
          <span className="text-2xl font-bold text-gray-900">${subscription.cost}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Billing</span>
          <span className="text-sm font-medium text-gray-900 capitalize">{subscription.billingCycle}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-600">Next billing</span>
          <span className="text-sm font-medium text-gray-900">
            {new Date(subscription.nextBilling).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
      
      <div className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-medium inline-flex ${
        subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {subscription.status}
      </div>
    </div>
  );
};

// ============================================
// Add/Edit Modal Component
// ============================================
const SubscriptionModal = ({ isOpen, onClose, subscription, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    cost: '',
    billingCycle: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'Credit Card',
    reminderDays: 7,
    notes: '',
    logo: '📦',
    color: 'bg-purple-500',
    status: 'active'
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        ...subscription,
        startDate: subscription.startDate ? new Date(subscription.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        cost: subscription.cost.toString()
      });
    } else {
      setFormData({
        name: '',
        category: 'Other',
        cost: '',
        billingCycle: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Credit Card',
        reminderDays: 7,
        notes: '',
        logo: '📦',
        color: 'bg-purple-500',
        status: 'active'
      });
    }
  }, [subscription, isOpen]);

  const popularServices = [
    { name: 'Netflix', logo: '🎬', color: 'bg-red-500', category: 'Entertainment', cost: 15.99 },
    { name: 'Spotify', logo: '🎵', color: 'bg-green-500', category: 'Music', cost: 9.99 },
    { name: 'Adobe CC', logo: '🎨', color: 'bg-red-600', category: 'Software', cost: 54.99 },
    { name: 'ChatGPT', logo: '🤖', color: 'bg-teal-500', category: 'Productivity', cost: 20.00 }
  ];

  const handleQuickAdd = (service) => {
    setFormData(prev => ({
      ...prev,
      name: service.name,
      logo: service.logo,
      color: service.color,
      category: service.category,
      cost: service.cost.toString()
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.cost) {
      alert('Please fill in required fields');
      return;
    }
    
    const submitData = {
      ...formData,
      cost: parseFloat(formData.cost),
      reminderDays: parseInt(formData.reminderDays)
    };
    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {subscription ? 'Edit Subscription' : 'Add Subscription'}
            </h2>
            <button 
              onClick={onClose}
              disabled={loading}
              className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center justify-center disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {!subscription && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Add</h3>
              <div className="grid grid-cols-4 gap-3">
                {popularServices.map((service) => (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() => handleQuickAdd(service)}
                    disabled={loading}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:shadow-md transition-all disabled:opacity-50"
                  >
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {service.logo}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
              <input
                type="text"
                required
                disabled={loading}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Netflix, Spotify..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                disabled={loading}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              >
                <option>Entertainment</option>
                <option>Software</option>
                <option>Music</option>
                <option>Fitness</option>
                <option>Cloud Storage</option>
                <option>Gaming</option>
                <option>Education</option>
                <option>Productivity</option>
                <option>Shopping</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  disabled={loading}
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Billing Cycle *</label>
              <select
                value={formData.billingCycle}
                disabled={loading}
                onChange={(e) => setFormData({...formData, billingCycle: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                required
                disabled={loading}
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <input
                type="text"
                disabled={loading}
                value={formData.paymentMethod}
                onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                placeholder="Credit Card"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              disabled={loading}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              placeholder="Add any notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Saving...' : subscription ? 'Update' : 'Add'} Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN DASHBOARD COMPONENT WITH SIDEBAR
// ============================================
export default function Dashboard({ 
  // Redux state props
  subscriptions = [],
  stats = { monthlyTotal: 0, annualTotal: 0, activeCount: 0, upcomingCount: 0 },
  upcomingRenewals = [],
  spendingData = [], // This data is no longer used for the chart but might be used elsewhere
  loading = false,
  
  // Redux action props
  onGetAllSubscriptions,
  onGetDashboardStats,
  onGetUpcomingRenewals,
  onCreateSubscription,
  onUpdateSubscription,
  onDeleteSubscription,
  onSetCurrentSubscription,
  onClearCurrentSubscription
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // ✅ Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // ✅ Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load data on mount
  useEffect(() => {
    if (onGetAllSubscriptions) onGetAllSubscriptions();
    if (onGetDashboardStats) onGetDashboardStats();
    if (onGetUpcomingRenewals) onGetUpcomingRenewals();
  }, []);

  const handleRefresh = () => {
    if (onGetAllSubscriptions) onGetAllSubscriptions();
    if (onGetDashboardStats) onGetDashboardStats();
    if (onGetUpcomingRenewals) onGetUpcomingRenewals();
  };

  const handleEdit = (subscription) => {
    setCurrentSubscription(subscription);
    setIsModalOpen(true);
    if (onSetCurrentSubscription) onSetCurrentSubscription(subscription);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      if (onDeleteSubscription) {
        await onDeleteSubscription(id);
        handleRefresh();
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (currentSubscription) {
        // Update existing
        if (onUpdateSubscription) {
          await onUpdateSubscription({ id: currentSubscription._id, data });
        }
      } else {
        // Create new
        if (onCreateSubscription) {
          await onCreateSubscription(data);
        }
      }
      
      handleRefresh();
      setIsModalOpen(false);
      setCurrentSubscription(null);
      if (onClearCurrentSubscription) onClearCurrentSubscription();
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSubscription(null);
    if (onClearCurrentSubscription) onClearCurrentSubscription();
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || sub.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // ✅ Wrapper with sidebar
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ✅ Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* ✅ Mobile menu toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage all your subscriptions in one place</p>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 sm:p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 sm:p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" title="Notifications">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => { setCurrentSubscription(null); setIsModalOpen(true); }}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Subscription</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <StatCard 
              title="Monthly Cost" 
              value={`$${stats.monthlyTotal || 0}`}
              icon={DollarSign}
              color="bg-purple-600"
              trend={true}
              trendValue="+12%"
            />
            <StatCard 
              title="Annual Cost" 
              value={`$${stats.annualTotal || 0}`}
              icon={TrendingUp}
              color="bg-blue-600"
            />
            <StatCard 
              title="Active" 
              value={stats.activeCount || 0}
              icon={CreditCard}
              color="bg-green-600"
            />
            <StatCard 
              title="Due Soon" 
              value={stats.upcomingCount || 0}
              icon={AlertCircle}
              color="bg-orange-600"
            />
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Spending Chart was here, but has been removed. */}

              {/* Subscriptions List */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-bold text-gray-900">All Subscriptions</h3>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    >
                      <option>All</option>
                      <option>Entertainment</option>
                      <option>Software</option>
                      <option>Music</option>
                      <option>Productivity</option>
                      <option>Shopping</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading subscriptions...</p>
                  </div>
                ) : filteredSubscriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">No subscriptions found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search or add a new subscription</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSubscriptions.map(sub => (
                      <SubscriptionCard
                        key={sub._id}
                        subscription={sub}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Renewals */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Renewals</h3>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {upcomingRenewals.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No upcoming renewals</p>
                    </div>
                  ) : (
                    upcomingRenewals.map(sub => (
                      <UpcomingCard key={sub._id} subscription={sub} onEdit={handleEdit} />
                    ))
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-purple-100 text-sm mb-4">
                  Get insights on how to save money on your subscriptions
                </p>
                <button className="w-full px-4 py-3 bg-white text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors">
                  View Recommendations
                </button>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">By Category</h3>
                <div className="space-y-3">
                  {['Entertainment', 'Software', 'Music', 'Productivity'].map((cat) => {
                    const count = subscriptions.filter(s => s.category === cat).length;
                    const total = subscriptions.filter(s => s.category === cat).reduce((sum, s) => sum + s.cost, 0);
                    if (count === 0) return null;
                    return (
                      <div key={cat} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{cat}</p>
                          <p className="text-xs text-gray-500">{count} subscription{count > 1 ? 's' : ''}</p>
                        </div>
                        <p className="font-bold text-gray-900">${total.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        subscription={currentSubscription}
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
}