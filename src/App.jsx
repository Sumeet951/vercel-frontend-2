import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import LandingPage from './Pages/landingpage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
// import Dashboard from './Pages/Dashboard'
import Subscriptions from './Pages/Subscriptions'
import DashboardPage from './Pages/DashboardPage'
import Analytics from './Pages/AnalyticsPage'
import Profile from './Pages/ProfilePage'
// import DashboardLayout from './components/dashboard/DashboardLayout'

const App = () => {
  return (
    <>
    <Routes>
      {/* <Route path="/" element={<Dashboard/>}></Route> */}
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    

      <Route path="/dashboard" element={<DashboardPage/>}></Route>
       <Route path="/analytics" element={<Analytics/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
 



    </Routes>
    </>
  )
}

export default App