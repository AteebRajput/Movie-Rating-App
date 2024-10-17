import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Rated from './pages/rated/Rated'; 
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './config';  // Added onAuthStateChanged
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { userLogin, userLogout } from './slice/userSlice';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userLogin({
          user: user.uid,
          username: user.displayName,
          email: user.email,
          isLoggedIn: true,
        }));
      } else {
        dispatch(userLogout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router> {/* Ensure Router wraps the entire component tree */}
      <div className="bg-gradient-to-r from-red-500 to-red-800 min-h-screen">
        <Navbar />
        <Routes>
          {/* Redirect to Home if authenticated */}
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
          
          {/* Redirect to Login if not authenticated */}
          <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/auth" element={isAuth ? <Auth /> : <Navigate to="/login" />} />
          <Route path="/rated" element={isAuth ? <Rated /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
