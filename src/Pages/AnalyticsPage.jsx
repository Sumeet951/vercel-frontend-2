// In your AnalyticsPage.jsx container:
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubscriptions, getDashboardStats } from '../Redux/Slices/SubscriptionSlice';
import AnalyticsPage from '../components/AnalyticsPage'; // This artifact

export default function Analytics() {
  const dispatch = useDispatch();
  const { subscriptions, stats, spendingData, loading } = useSelector(
    state => state.subscription
  );

  return (
    <AnalyticsPage
      subscriptions={subscriptions}
      stats={stats}
      spendingData={spendingData}
      loading={loading}
      onGetAllSubscriptions={() => dispatch(getAllSubscriptions())}
      onGetDashboardStats={() => dispatch(getDashboardStats())}
    />
  );
}