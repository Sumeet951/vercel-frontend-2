export const sampleUser = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    currency: 'USD',
    joinedDate: '2024-01-15',
  };
  
  export const sampleSubscriptions = [
    {
      _id: '1',
      name: 'Netflix',
      category: 'Entertainment',
      cost: 15.99,
      billingCycle: 'monthly',
      startDate: '2024-01-01',
      nextBilling: '2024-12-28',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-red-500',
      logo: '🎬',
      description: 'Streaming service for movies and TV shows',
    },
    {
      _id: '2',
      name: 'Spotify',
      category: 'Music',
      cost: 9.99,
      billingCycle: 'monthly',
      startDate: '2024-02-01',
      nextBilling: '2025-01-01',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-green-500',
      logo: '🎵',
      description: 'Music streaming service',
    },
    {
      _id: '3',
      name: 'Adobe Creative Cloud',
      category: 'Software',
      cost: 52.99,
      billingCycle: 'monthly',
      startDate: '2024-01-15',
      nextBilling: '2025-01-05',
      status: 'active',
      paymentMethod: 'Mastercard ****5678',
      color: 'bg-red-600',
      logo: '🎨',
      description: 'Creative software suite',
    },
    {
      _id: '4',
      name: 'GitHub Pro',
      category: 'Software',
      cost: 7.00,
      billingCycle: 'monthly',
      startDate: '2024-03-01',
      nextBilling: '2025-01-10',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-gray-800',
      logo: '💻',
      description: 'Code hosting platform',
    },
    {
      _id: '5',
      name: 'Disney+',
      category: 'Entertainment',
      cost: 7.99,
      billingCycle: 'monthly',
      startDate: '2024-04-01',
      nextBilling: '2025-01-15',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-blue-600',
      logo: '🏰',
      description: 'Disney streaming service',
    },
    {
      _id: '6',
      name: 'Notion',
      category: 'Productivity',
      cost: 10.00,
      billingCycle: 'monthly',
      startDate: '2024-05-01',
      nextBilling: '2025-01-20',
      status: 'active',
      paymentMethod: 'Mastercard ****5678',
      color: 'bg-gray-900',
      logo: '📝',
      description: 'All-in-one workspace',
    },
    {
      _id: '7',
      name: 'ChatGPT Plus',
      category: 'Software',
      cost: 20.00,
      billingCycle: 'monthly',
      startDate: '2024-06-01',
      nextBilling: '2024-12-25',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-emerald-600',
      logo: '🤖',
      description: 'AI assistant',
    },
    {
      _id: '8',
      name: 'Figma Professional',
      category: 'Software',
      cost: 15.00,
      billingCycle: 'monthly',
      startDate: '2024-07-01',
      nextBilling: '2024-12-26',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-purple-600',
      logo: '🎨',
      description: 'Design tool',
    },
    {
      _id: '9',
      name: 'Amazon Prime',
      category: 'Shopping',
      cost: 14.99,
      billingCycle: 'monthly',
      startDate: '2024-08-01',
      nextBilling: '2025-01-25',
      status: 'active',
      paymentMethod: 'Mastercard ****5678',
      color: 'bg-orange-500',
      logo: '📦',
      description: 'Prime membership',
    },
    {
      _id: '10',
      name: 'YouTube Premium',
      category: 'Entertainment',
      cost: 11.99,
      billingCycle: 'monthly',
      startDate: '2024-09-01',
      nextBilling: '2025-02-01',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-red-600',
      logo: '📺',
      description: 'Ad-free YouTube',
    },
    {
      _id: '11',
      name: 'Dropbox',
      category: 'Cloud Storage',
      cost: 11.99,
      billingCycle: 'monthly',
      startDate: '2024-10-01',
      nextBilling: '2025-02-05',
      status: 'active',
      paymentMethod: 'Visa ****1234',
      color: 'bg-blue-500',
      logo: '☁️',
      description: 'Cloud storage',
    },
    {
      _id: '12',
      name: 'Grammarly Premium',
      category: 'Productivity',
      cost: 12.00,
      billingCycle: 'monthly',
      startDate: '2024-11-01',
      nextBilling: '2025-02-10',
      status: 'active',
      paymentMethod: 'Mastercard ****5678',
      color: 'bg-green-600',
      logo: '✍️',
      description: 'Writing assistant',
    },
  ];
  
  export const spendingHistory = [
    { month: 'Jul', amount: 234.50 },
    { month: 'Aug', amount: 256.30 },
    { month: 'Sep', amount: 223.80 },
    { month: 'Oct', amount: 267.90 },
    { month: 'Nov', amount: 245.60 },
    { month: 'Dec', amount: 189.93 },
  ];
  
  export const categories = [
    { name: 'Entertainment', count: 4, color: 'bg-red-500', total: 50.96 },
    { name: 'Software', count: 4, color: 'bg-blue-500', total: 94.99 },
    { name: 'Productivity', count: 2, color: 'bg-green-500', total: 22.00 },
    { name: 'Music', count: 1, color: 'bg-purple-500', total: 9.99 },
    { name: 'Cloud Storage', count: 1, color: 'bg-yellow-500', total: 11.99 },
    { name: 'Shopping', count: 1, color: 'bg-orange-500', total: 14.99 },
  ];
  
  // Helper function to calculate days until next billing
  export const calculateDaysUntil = (nextBillingDate) => {
    const today = new Date();
    const billing = new Date(nextBillingDate);
    const diffTime = billing - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Helper function to calculate statistics
  export const calculateStats = (subscriptions) => {
    const active = subscriptions.filter(sub => sub.status === 'active');
    
    const monthlyTotal = active.reduce((sum, sub) => {
      if (sub.billingCycle === 'monthly') return sum + sub.cost;
      if (sub.billingCycle === 'yearly') return sum + (sub.cost / 12);
      if (sub.billingCycle === 'quarterly') return sum + (sub.cost / 3);
      return sum;
    }, 0);
  
    const annualTotal = monthlyTotal * 12;
  
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
    const upcomingCount = active.filter(
      sub => new Date(sub.nextBilling) <= thirtyDaysFromNow
    ).length;
  
    return {
      monthlyTotal: Math.round(monthlyTotal * 100) / 100,
      annualTotal: Math.round(annualTotal * 100) / 100,
      activeCount: active.length,
      upcomingCount,
    };
  };
  
  // Get upcoming renewals (next 30 days)
  export const getUpcomingRenewals = (subscriptions) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
    return subscriptions
      .filter(sub => sub.status === 'active' && new Date(sub.nextBilling) <= thirtyDaysFromNow)
      .map(sub => ({
        ...sub,
        daysUntil: calculateDaysUntil(sub.nextBilling),
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 5);
  };