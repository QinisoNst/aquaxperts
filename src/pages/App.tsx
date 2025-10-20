
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
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
import Login from './Login';
import Register from './Register';
import SiteWorkerDashboard from './SiteWorkerDashboard';
import AdminPage from './AdminPage';
import Profile from './Profile';
import EditProfile from './EditProfile';
import SmartMeterPage from './SmartMeterPage';
import CommunityView from './CommunityView';
import CommunityInfo from './CommunityInfo';
import Setup from './Setup';
import { useAuthContext } from '../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from 'react';
import NotFound from './NotFound';
import WaterUseCalculator from './WaterUseCalculator';
import WaterAdvisor from './WaterAdvisor';

const App: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={(<HomeOrRedirect user={user} />)}
          />
          <Route path="/location/:page" element={<LocationOrRedirect />} />
          <Route path="/tank-analytics" element={<TankAnalytics />} />
          <Route path="/water-quality" element={<WaterQuality />} />
          <Route path="/water-leaks" element={<WaterLeaks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/add-water-info" element={<WaterInfoForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setup" element={<Setup />} />
          <Route path='/meter-readings' element={<SmartMeterPage />} />
          <Route path='/water-info/:section?' element={<CommunityView />} />
          <Route path='/community-info' element={<CommunityInfo />} />
          <Route path="/water-use-calculator" element={<WaterUseCalculator />} />
          <Route path="/water-advisor" element={<WaterAdvisor />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-profile"
            element={user ? <EditProfile /> : <Navigate to="/login" />}
          />

          {/* Protected Route for Site Worker and Admin */}
          <Route
            path="/dashboard"
            element={
              (user && (user.role === 'site worker' || user.role === 'admin'))
                ? <SiteWorkerDashboard />
                : <Navigate to="/login" />
            }
          />

          {/* Protected Route for Admin */}
          <Route
            path="/admin"
            element={
              (user && user.role === 'admin')
                ? <AdminPage />
                : <Navigate to="/login" />
            }
          />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// A helper component to handle the initial redirection
const HomeOrRedirect: React.FC<{ user: any }> = ({ user }) => {
  if (!user) {
    return <Home />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin" />;
  } else if (user.role === 'site worker') {
    return <Navigate to="/dashboard" />;
  } else {
    return <Home />;
  }
};

const LocationOrRedirect: React.FC = () => {
    const { page } = useParams<{ page: string }>();
    const { user } = useAuthContext();
    const [userLocation, setUserLocation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserLocation = async () => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.country && userData.province && userData.community) {
                        setUserLocation(userData);
                    }
                }
            }
            setLoading(false);
        };

        fetchUserLocation();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        if (userLocation) {
            // If user is logged in and has a location, navigate to the page
            return <Navigate to={`/${page}`} />;
        } else {
            // If user is logged in but has no location, redirect to setup
            return <Navigate to="/setup" />;
        }
    } else {
        // If user is not logged in, show the location selection page
        return <LocationSelection />;
    }
};


export default App;
