import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Resources from './pages/Resources';
import { supabase } from './auth';
import './App.css';
import { useTheme } from './hooks/useTheme';

function App() {
  const { toggleTheme } = useTheme();     // ← Get toggle function
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="/Calc.html">Calculator</a>
            <a href="/inv.html">Inventory</a>
            <Link to="/resources">Resources</Link>
          </div>

          <div className="navbar-right">
            {/* Fixed Dark Mode Toggle */}
            <button onClick={toggleTheme} className="theme-toggle-btn">
              🌙
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;