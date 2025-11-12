// In your real Dashboard.jsx file:
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSubscriptions,
  getDashboardStats,
  getUpcomingRenewals,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  setCurrentSubscription,
  clearCurrentSubscription
} from "../Redux/Slices/SubscriptionSlice"
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { subscriptions, stats, upcomingRenewals, spendingData, loading } = useSelector(
    state => state.subscription
  );

  return (
    <Dashboard
      subscriptions={subscriptions}
      stats={stats}
      upcomingRenewals={upcomingRenewals}
      spendingData={spendingData}
      loading={loading}
      onGetAllSubscriptions={() => dispatch(getAllSubscriptions())}
      onGetDashboardStats={() => dispatch(getDashboardStats())}
      onGetUpcomingRenewals={() => dispatch(getUpcomingRenewals())}
      onCreateSubscription={(data) => dispatch(createSubscription(data))}
      onUpdateSubscription={(payload) => dispatch(updateSubscription(payload))}
      onDeleteSubscription={(id) => dispatch(deleteSubscription(id))}
      onSetCurrentSubscription={(sub) => dispatch(setCurrentSubscription(sub))}
      onClearCurrentSubscription={() => dispatch(clearCurrentSubscription())}
    />
  );
}