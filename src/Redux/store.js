import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice';
import subscriptionReducer from './Slices/SubscriptionSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        subscription: subscriptionReducer,
    },
    devTools: true
});

export default store;