import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Package,
  CreditCard,
  Loader2,
  Menu
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar'; // ✅ Import Sidebar

// Stats Card Component
const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {change && (
        <div className={`flex items-center text-sm font-medium ${
          changeType === 'up' ? 'text-red-600' : 'text-green-600'
        }`}>
          {changeType === 'up' ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {change}
        </div>
      )}
    </div>
    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

// Category Breakdown
const CategoryBreakdown = ({ subscriptions }) => {
  // Calculate category data from subscriptions
  const categoryMap = {};
  
  subscriptions.forEach(sub => {
    if (!categoryMap[sub.category]) {
      categoryMap[sub.category] = {
        name: sub.category,
        amount: 0,
        count: 0
      };
    }
    categoryMap[sub.category].amount += sub.cost;
    categoryMap[sub.category].count += 1;
  });

  const categoryData = Object.values(categoryMap).map((cat, index) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-teal-500', 'bg-pink-500', 'bg-indigo-500'];
    return {
      ...cat,
      color: colors[index % colors.length]
    };
  });

  const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
  
  // Calculate percentages
  categoryData.forEach(cat => {
    cat.percentage = total > 0 ? Math.round((cat.amount / total) * 100) : 0;
  });

  if (categoryData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No category data available</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Category Breakdown</h3>
          <p className="text-sm text-gray-500 mt-1">Where your money goes</p>
        </div>
        <PieChart className="w-6 h-6 text-gray-400" />
      </div>
      
      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-56 h-56">
          <svg className="w-full h-full transform -rotate-90">
            {categoryData.map((cat, index) => {
              const previousPercentage = categoryData.slice(0, index).reduce((sum, c) => sum + c.percentage, 0);
              const strokeDasharray = `${cat.percentage} ${100 - cat.percentage}`;
              const strokeDashoffset = -previousPercentage;
              
              return (
                <circle
                  key={cat.name}
                  cx="112"
                  cy="112"
                  r="80"
                  fill="none"
                  strokeWidth="32"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:opacity-80"
                  style={{
                    stroke: cat.color === 'bg-red-500' ? '#ef4444' :
                           cat.color === 'bg-blue-500' ? '#3b82f6' :
                           cat.color === 'bg-green-500' ? '#10b981' :
                           cat.color === 'bg-orange-500' ? '#f97316' :
                           cat.color === 'bg-purple-500' ? '#a855f7' :
                           cat.color === 'bg-teal-500' ? '#14b8a6' :
                           cat.color === 'bg-pink-500' ? '#ec4899' : '#6366f1'
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total/month</p>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {categoryData.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 ${cat.color} rounded-full`}></div>
              <div>
                <span className="font-medium text-gray-900">{cat.name}</span>
                <p className="text-xs text-gray-500">{cat.count} subscription{cat.count > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">{cat.percentage}%</span>
              <span className="text-lg font-bold text-gray-900">${cat.amount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Subscriptions
const TopSubscriptions = ({ subscriptions }) => {
  const topSubs = [...subscriptions]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5);
    
  const maxAmount = Math.max(...topSubs.map(s => s.cost), 1);

  if (topSubs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Most Expensive</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No subscriptions available</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Most Expensive</h3>
          <p className="text-sm text-gray-500 mt-1">Your top 5 subscriptions</p>
        </div>
        <BarChart3 className="w-6 h-6 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {topSubs.map((sub, index) => (
          <div key={sub._id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{sub.name}</p>
                  <p className="text-xs text-gray-500">{sub.category}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">${sub.cost.toFixed(2)}</span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-0 ${sub.color || 'bg-purple-600'} rounded-full transition-all duration-500 group-hover:opacity-80`}
                style={{ width: `${(sub.cost / maxAmount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Insights Card
const InsightsCard = ({ subscriptions, stats }) => {
  const insights = [];
  
  // Generate insights based on actual data
  if (stats.monthlyTotal > 200) {
    insights.push({
      icon: TrendingUp,
      text: `You're spending $${stats.monthlyTotal.toFixed(2)}/month on subscriptions`,
      type: 'info'
    });
  }

  // Check for unused subscriptions (would need usage data)
  const unusedCount = subscriptions.filter(sub => sub.status === 'paused').length;
  if (unusedCount > 0) {
    insights.push({
      icon: Package,
      text: `${unusedCount} subscription${unusedCount > 1 ? 's are' : ' is'} currently paused`,
      type: 'warning'
    });
  }

  // Savings opportunity
  const monthlySubs = subscriptions.filter(sub => sub.billingCycle === 'monthly');
  if (monthlySubs.length > 0) {
    const potentialSavings = monthlySubs.length * 15; // Rough estimate
    insights.push({
      icon: DollarSign,
      text: `Save up to $${potentialSavings}/year by switching to annual plans`,
      type: 'success'
    });
  }

  // Category analysis
  const categorySpending = {};
  subscriptions.forEach(sub => {
    categorySpending[sub.category] = (categorySpending[sub.category] || 0) + sub.cost;
  });
  
  const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
  if (topCategory) {
    const percentage = stats.monthlyTotal > 0 ? Math.round((topCategory[1] / stats.monthlyTotal) * 100) : 0;
    insights.push({
      icon: CreditCard,
      text: `${percentage}% of your budget goes to ${topCategory[0]}`,
      type: 'info'
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: Lightbulb,
      text: 'Add more subscriptions to get personalized insights',
      type: 'info'
    });
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">Insights & Recommendations</h3>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`flex items-start gap-3 p-4 rounded-xl ${
              insight.type === 'warning' ? 'bg-orange-50 border border-orange-100' :
              insight.type === 'success' ? 'bg-green-50 border border-green-100' :
              'bg-blue-50 border border-blue-100'
            }`}
          >
            <insight.icon className={`w-5 h-5 mt-0.5 ${
              insight.type === 'warning' ? 'text-orange-600' :
              insight.type === 'success' ? 'text-green-600' :
              'text-blue-600'
            }`} />
            <p className="text-sm text-gray-700 flex-1">{insight.text}</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg">
        View All Insights
      </button>
    </div>
  );
};

// Main Analytics Page - Props Based
export default function AnalyticsPage({
  // Redux state props
  subscriptions = [],
  stats = { monthlyTotal: 0, annualTotal: 0, activeCount: 0, upcomingCount: 0 },
  loading = false,
  
  // Redux action props
  onGetAllSubscriptions,
  onGetDashboardStats
}) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Responsive sidebar behavior
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
  }, []);

  const handleExport = () => {
    // In real app: Generate and download report
    alert('Export functionality - Connect to your backend to generate reports!');
  };

  // Calculate year-over-year change
  const yearTotal = stats.annualTotal || 0;
  const lastYearTotal = yearTotal * 0.88; // Mock 12% increase
  const yoyChange = lastYearTotal > 0
    ? (((yearTotal - lastYearTotal) / lastYearTotal) * 100).toFixed(0)
    : '0';
  
  // Calculate potential savings
  const monthlySubs = subscriptions.filter(sub => sub.billingCycle === 'monthly');
  const potentialSavings = monthlySubs.length * 15;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }
  
  return (
    // ✅ Sidebar wrapper
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ✅ Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Header with mobile toggle */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Analytics</h1>
                <p className="text-gray-600">Deep insights into your subscription spending</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button 
                onClick={handleExport}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Spent This Year"
              value={`$${yearTotal.toFixed(2)}`}
              change={`+${yoyChange}%`}
              changeType="up"
              icon={DollarSign}
              color="bg-purple-600"
            />
            <StatsCard
              title="Monthly Average"
              value={`$${stats.monthlyTotal.toFixed(2)}`}
              change="-3%"
              changeType="down"
              icon={TrendingDown}
              color="bg-green-600"
            />
            <StatsCard
              title="Active Subscriptions"
              value={stats.activeCount || subscriptions.length}
              icon={Package}
              color="bg-blue-600"
            />
            <StatsCard
              title="Potential Savings"
              value={`$${potentialSavings}`}
              icon={TrendingUp}
              color="bg-orange-600"
            />
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <CategoryBreakdown subscriptions={subscriptions} />
              
              {/* Top Subscriptions */}
              <TopSubscriptions subscriptions={subscriptions} />
            </div>

            {/* Insights */}
            <InsightsCard subscriptions={subscriptions} stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}