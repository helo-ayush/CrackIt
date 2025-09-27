// App.jsx - This is where routes go!
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage' // Import AboutPage
import CareersPage from './pages/CareersPage' // Import CareersPage
import ContactPage from './pages/ContactPage' // Import ContactPage
import FeaturesPage from './pages/FeaturesPage';  
import HowItWorksPage from './pages/HowItWorksPage'; 

function App() {
  return (
    <Router>  {/* Router setup in App.jsx */}
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />       
        <Route path="/careers" element={<CareersPage />} />  
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />      
        <Route path="/how-it-works" element={<HowItWorksPage />} />  
      </Routes>
    </Router>
  )
}

export default App