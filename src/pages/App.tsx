import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/nav/Navbar';
import Footer from '../components/nav/Footer';
import WaterQuality from '../pages/WaterQuality';
import TankAnalytics from '../pages/TankAnalytics';
import Home from '../pages/Home';


const App: React.FC = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tank-analytics" element={<TankAnalytics />} />
      <Route path="/water-quality" element={<WaterQuality />} />
    </Routes>
    <Footer />
  </>
);

export default App;
