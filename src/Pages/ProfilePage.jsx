import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Trash2,
  AlertCircle,
  Check,
  Menu,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/layout/Sidebar';
import { updateProfile, getUserData } from '../Redux/Slices/AuthSlice';


const Profile = () => {
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    bio: ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: false,
    upcomingRenewals: true,
    newSubscriptions: true
  });

  useEffect(() => {
    if (data) {
      setProfileData({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        bio: data.bio || ''
      });
    }
  }, [data]);

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

//   const handleProfileUpdate = async () => {
//     setLoading(true);
//     try {
//       // Add your update profile API call here
//       await dispatch(updateProfile(profileData));
      
//       setTimeout(() => {
//         setLoading(false);
//         setIsEditing(false);
//         alert('Profile updated successfully!');
//       }, 1500);
//     } catch (error) {
//       setLoading(false);
//       alert('Failed to update profile');
//     }
//   };
const handleProfileUpdate = async () => {
  setLoading(true);
  try {
    const updateData = {
      fullName: profileData.fullName.trim(),
      email: profileData.email.trim()
    };

    // Important: Pass as array [userId, updateData]
    const result = await dispatch(
      updateProfile([data?._id, updateData])
    ).unwrap();

    if (result?.success) {
      toast.success('Profile updated!');
      setIsEditing(false);
      
      // Refresh user data
      await dispatch(getUserData());
    }
  } catch (error) {
    toast.error('Failed: ' + error?.message);
  } finally {
    setLoading(false);
  }
};

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      // Add your change password API call here
      // await dispatch(changePassword(passwordData));
      
      setTimeout(() => {
        setLoading(false);
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        alert('Password changed successfully!');
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert('Failed to change password');
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      // Add your update notification settings API call here
      // await dispatch(updateNotificationSettings(notifications));
      
      setTimeout(() => {
        setLoading(false);
        alert('Notification settings updated!');
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert('Failed to update settings');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-600 mt-1">Manage your account settings and preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 mb-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center text-purple-600 font-bold text-4xl shadow-2xl ring-8 ring-white/20">
                    {data?.fullName ? data.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white text-purple-600 rounded-xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl font-bold mb-2">{data?.fullName || 'John Doe'}</h2>
                  <p className="text-purple-100 mb-4">{data?.email || 'john@example.com'}</p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <div className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-purple-100">Member Since</p>
                      <p className="font-semibold">{new Date(data?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-purple-100">Active Subscriptions</p>
                      <p className="font-semibold">12</p>
                    </div>
                    <div className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-purple-100">Total Spent</p>
                      <p className="font-semibold">$2,845</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-2 border border-gray-100 space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="lg:col-span-3">
                {/* Profile Info Tab */}
                {activeTab === 'profile' && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                          <button
                            onClick={handleProfileUpdate}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                          >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          City
                        </label>
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 transition-all"
                          placeholder="New York"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 transition-all"
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 transition-all resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Change Password</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showOldPassword ? "text" : "password"}
                              value={passwordData.oldPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 pr-12"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowOldPassword(!showOldPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 pr-12"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 pr-12"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handlePasswordChange}
                          disabled={loading}
                          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                          {loading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                          <div>
                            <h4 className="font-semibold text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {key === 'emailNotifications' && 'Receive notifications via email'}
                              {key === 'pushNotifications' && 'Receive push notifications'}
                              {key === 'weeklyReport' && 'Get weekly spending reports'}
                              {key === 'upcomingRenewals' && 'Get notified about upcoming renewals'}
                              {key === 'newSubscriptions' && 'Notifications for new subscriptions'}
                            </p>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, [key]: !value })}
                            className={`relative w-14 h-7 rounded-full transition-all ${
                              value ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                                value ? 'translate-x-7' : ''
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleNotificationUpdate}
                      disabled={loading}
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                      {loading ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h3>
                      
                      <div className="space-y-4">
                        <div className="p-4 border-2 border-purple-500 rounded-xl bg-purple-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-600">Expires 12/25</p>
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                              Default
                            </span>
                          </div>
                        </div>

                        <button className="w-full px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-all flex items-center justify-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Payment Method
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Billing History</h3>
                      
                      <div className="space-y-3">
                        {[
                          { date: 'Oct 15, 2025', amount: '$234.50', status: 'Paid' },
                          { date: 'Sep 15, 2025', amount: '$234.50', status: 'Paid' },
                          { date: 'Aug 15, 2025', amount: '$234.50', status: 'Paid' }
                        ].map((bill, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-semibold text-gray-900">{bill.date}</p>
                              <p className="text-sm text-gray-600">Monthly subscriptions</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{bill.amount}</p>
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                {bill.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                          <p className="text-sm text-red-700 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all flex items-center gap-2">
                            <Trash2 className="w-5 h-5" />
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;