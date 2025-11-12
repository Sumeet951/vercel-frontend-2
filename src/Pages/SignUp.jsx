import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Bell,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../Redux/Slices/AuthSlice';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Calculate password strength
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
      
      // Show toast for password strength
      if (value.length > 0) {
        if (strength <= 1) {
          // Don't show toast for every keystroke, just update
        } else if (strength <= 3) {
          // Medium strength reached
        } else if (strength >= 4 && value.length >= 12) {
          toast.success('Strong password! 🔒', {
            id: 'password-strength',
            duration: 2000,
          });
        }
      }
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      toast.error('Please enter your full name', {
        icon: '👤',
      });
      isValid = false;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
      toast.error('Name is too short', {
        icon: '⚠️',
      });
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      if (isValid) {
        toast.error('Please enter your email address', {
          icon: '📧',
        });
      }
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      if (isValid) {
        toast.error('Please enter a valid email address', {
          icon: '❌',
        });
      }
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      if (isValid) {
        toast.error('Please create a password', {
          icon: '🔒',
        });
      }
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      if (isValid) {
        toast.error('Password must be at least 8 characters long', {
          icon: '🔐',
        });
      }
      isValid = false;
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password is too weak';
      if (isValid) {
        toast.error('Please create a stronger password', {
          icon: '⚠️',
        });
      }
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      if (isValid) {
        toast.error('Please confirm your password', {
          icon: '🔒',
        });
      }
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      if (isValid) {
        toast.error('Passwords do not match', {
          icon: '❌',
        });
      }
      isValid = false;
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms and conditions';
      if (isValid) {
        toast.error('Please accept the Terms and Privacy Policy', {
          icon: '📋',
        });
      }
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    // const loadingToast = toast.loading('Creating your account...');
     //dispatch create account action
     const response=await dispatch(createAccount(formData))
     if(response?.payload?.success)
        navigate("/dashboard");
     setFormData({
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
              agreeTerms: false
            });

    // try {
      // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 2000));

    //   // Dismiss loading toast
    //   toast.dismiss(loadingToast);

    //   // Show success toast with custom component
    //   toast.custom((t) => (
    //     <div
    //       className={`${
    //         t.visible ? 'animate-enter' : 'animate-leave'
    //       } max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //     >
    //       <div className="flex-1 w-0 p-4">
    //         <div className="flex items-start">
    //           <div className="flex-shrink-0 pt-0.5">
    //             <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
    //               <CheckCircle className="size-6 text-green-600" />
    //             </div>
    //           </div>
    //           <div className="ml-3 flex-1">
    //             <p className="text-sm font-medium text-gray-900">
    //               Account created successfully! 🎉
    //             </p>
    //             <p className="mt-1 text-sm text-gray-500">
    //               Welcome to SubsTrack, {formData.fullName}!
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex border-l border-gray-200">
    //         <button
    //           onClick={() => toast.dismiss(t.id)}
    //           className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   ), {
    //     duration: 5000,
    //   });

      // Alternative simple success toast
      // toast.success(`Welcome to SubsTrack, ${formData.fullName}! 🎉`, {
      //   duration: 4000,
      // });

      // Reset form
    //   setTimeout(() => {
    //     setFormData({
    //       fullName: '',
    //       email: '',
    //       password: '',
    //       confirmPassword: '',
    //       agreeTerms: false
    //     });
    //     setPasswordStrength(0);
        
    //     // Redirect to dashboard (simulate)
    //     console.log('Redirecting to dashboard...');
    //     // window.location.href = '/dashboard';
    //   }, 2000);

    // } catch (error) {
    //   // Dismiss loading toast
    //   toast.dismiss(loadingToast);
      
    //   // Show error toast
    //   toast.error('Something went wrong. Please try again.', {
    //     icon: '❌',
    //   });
    //   console.error('Signup error:', error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const features = [
    {
      icon: <TrendingUp className="size-6" />,
      title: 'Track Everything',
      description: 'Monitor all your subscriptions in one place'
    },
    {
      icon: <Bell className="size-6" />,
      title: 'Smart Reminders',
      description: 'Never miss a renewal date again'
    },
    {
      icon: <Shield className="size-6" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected'
    }
  ];

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-2 rounded-lg">
              <Zap className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SubsTrack</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Start managing your subscriptions for free
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="size-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="size-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="size-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    passwordStrength <= 1 ? 'text-red-600' : 
                    passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    Password strength: {getPasswordStrengthText()}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="size-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="size-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="size-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="size-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-600 text-primary-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="size-4" />
                  {errors.agreeTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 text-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign In
            </a>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 p-12 items-center justify-center relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 size-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 size-96 bg-white/10 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
        </div>

        <div className="relative z-10 max-w-md">
          {/* Main Message */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start Saving Money Today
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of users who are taking control of their subscriptions and saving money every month.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-white">
                  {feature.icon}
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-3xl font-bold text-white mb-1">$2M+</div>
              <div className="text-sm text-white/80">Money Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-white/80">User Rating</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;