import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Resources from './pages/Resources';
import BuyMeABeer from './pages/BuyMeABeer';
import { supabase } from './auth';
import './App.css';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login.html';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Close menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <a href="/Calc.html" onClick={closeMobileMenu}>Calculator</a>
            <a href="/inv.html" onClick={closeMobileMenu}>Inventory</a>
            <Link to="/resources" onClick={closeMobileMenu}>Resources</Link>
            <Link to="/buymeabeer" onClick={closeMobileMenu}>🍺 Buy Me a Beer</Link>
          </div>

          <div className="navbar-right">
            <button onClick={toggleMobileMenu} className="hamburger">☰</button>
            
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {user && (
              <div className="user-profile">
                <div className="user-avatar-container">
                  <img 
                    className="user-avatar" 
                    alt="avatar" 
                    width="38" 
                    height="38"
                    src={user.user_metadata?.avatar_url || 
                         `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=3b82f6&color=fff&size=128`} 
                  />
                  <div className="user-info">
                    <span className="user-name">{user.email.split('@')[0]}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/buymeabeer" element={<BuyMeABeer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;