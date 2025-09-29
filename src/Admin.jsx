import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('adminUser');
    
    console.log('Admin component - checking saved credentials:', { 
      hasToken: !!savedToken, 
      hasSavedUser: !!savedUser 
    });
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('Admin component - parsed user:', parsedUser);
        
        if (parsedUser.isAdmin) {
          setUser(parsedUser);
          setToken(savedToken);
          console.log('Admin component - user is admin, setting state');
        } else {
          console.log('Admin component - user is not admin, clearing storage');
          // Clear invalid admin session
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#718096'
      }}>
        Loading...
      </div>
    );
  }

  if (!user || !token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard user={user} token={token} onLogout={handleLogout} />;
}
