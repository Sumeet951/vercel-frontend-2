import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  CreditCard,
  BarChart3,
  User,
  LogOut,
  X,
  ChevronRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const currentPath = window.location.pathname;
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Simplified navigation items
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      path: '/subscriptions',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
    }
  ];

  const isActive = (path) => currentPath === path;

  // Logout handler
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await dispatch(logout());
      
      if (res?.payload?.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      } else {
        console.error('Logout failed:', res?.payload?.message || 'Unknown error');
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const overlayVariants = {
    open: { opacity: 1, display: "block" },
    closed: { 
      opacity: 0,
      transitionEnd: { display: "none" }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
          flex flex-col shadow-2xl
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-72' : 'w-72 lg:w-20'}
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-white tracking-tight">SubTracker</h2>
                  <p className="text-xs text-gray-400">Manage Smarter</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* User Profile Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="m-6 p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 flex-shrink-0 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-gray-800">
                  {data?.fullName ? data.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate text-lg">
                    {data?.fullName || 'John Doe'}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">
                    {data?.email || 'john@example.com'}
                  </p>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Monthly Budget</span>
                  <span className="font-bold text-white">$234 / $500</span>
                </div>
                
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "47%" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  />
                </div>
                
                <p className="mt-2 text-xs text-gray-500">47% used</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                isOpen={isOpen}
                isActive={isActive(item.path)}
                navigate={navigate}
                delay={index * 0.05}
              />
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.button
                key="expanded"
                onClick={handleLogout}
                disabled={isLoggingOut}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium group disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/20 hover:border-red-500/40"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </motion.button>
            ) : (
              <motion.button
                key="collapsed"
                onClick={handleLogout}
                disabled={isLoggingOut}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/20 hover:border-red-500/40"
                title="Logout"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex absolute -right-3 top-24 w-7 h-7 bg-gray-800 border-2 border-gray-700 rounded-full items-center justify-center hover:bg-gray-700 transition-colors shadow-xl z-10"
        >
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </motion.aside>
    </>
  );
};

// ============================================
// Navigation Item Component
// ============================================
const NavItem = ({ item, isOpen, isActive, navigate, delay }) => {
  const Icon = item.icon;

  const handleClick = () => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
          transition-all duration-200 group relative overflow-hidden
          ${isActive 
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30' 
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }
        `}
      >
        {/* Hover Effect */}
        {!isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}

        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 relative z-10 ${
          isActive ? 'text-white' : ''
        }`} />
        
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-medium relative z-10"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"
          />
        )}
      </button>
    </motion.div>
  );
};

export default Sidebar;