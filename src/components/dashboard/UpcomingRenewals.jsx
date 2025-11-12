import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Calendar } from 'lucide-react';

const UpcomingRenewals = ({ subscriptions, loading }) => {
  const getUrgencyColor = (days) => {
    if (days <= 3) return 'bg-red-100 text-red-700';
    if (days <= 7) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  if (loading && subscriptions.length === 0) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Renewals</h3>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {subscriptions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="size-12 mx-auto mb-2 opacity-50" />
            <p>No upcoming renewals</p>
          </div>
        ) : (
          subscriptions.map((sub, index) => (
            <motion.div
              key={sub._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`size-12 ${sub.color || 'bg-primary-600'} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                {sub.logo || sub.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">{sub.name}</h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(sub.nextBilling).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">${sub.cost}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(sub.daysUntil || 0)}`}>
                  {sub.daysUntil || 0}d
                </span>
              </div>

              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="size-5" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default UpcomingRenewals;