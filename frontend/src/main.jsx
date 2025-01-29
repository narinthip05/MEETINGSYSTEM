import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login'
import Dashboo from './pages/Dashboo'
import Management from './pages/Management'
import Home from './pages/Home'
import Dashboard from './pages/dashboard'
import Details from './pages/details'
import UserProfile from './pages/UserProfile'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Management" element={<Management />} />
        <Route path="/Dashboo" element={<Dashboo />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  </StrictMode>
)
