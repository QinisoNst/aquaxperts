import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/nav/Footer';
import WaterQuality from '../pages/WaterQuality';
import TankAnalytics from '../pages/TankAnalytics';
import WaterLeaks from '../pages/WaterLeaks';
import Home from '../pages/Home';
import Reports from '../pages/Reports';
import Community from '../pages/Community';
import AboutUs from '../pages/AboutUs';
import WaterInfoForm from '../components/WaterInfoForm';
import LocationSelection from './LocationSelection';
import Login from './Login'; // Import the Login component

const App: React.FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location/:page" element={<LocationSelection />} />
      <Route path="/tank-analytics" element={<TankAnalytics />} />
      <Route path="/water-quality" element={<WaterQuality />} />
      <Route path="/water-leaks" element={<WaterLeaks />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/community" element={<Community />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/add-water-info" element={<WaterInfoForm />} />
      <Route path="/login" element={<Login />} /> {/* Add the login route */}
    </Routes>
    <Footer />
  </>
);

export default App;
