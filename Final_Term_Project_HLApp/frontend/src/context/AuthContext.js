'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Custom Toast State
  const [toasts, setToasts] = useState([]);
  
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedProfile = localStorage.getItem('profile');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
          }
          
          // Verify current session with backend API
          try {
            const res = await API.get('/auth/me');
            if (res.data.success) {
              setUser(res.data.user);
              setProfile(res.data.profile);
              localStorage.setItem('user', JSON.stringify(res.data.user));
              localStorage.setItem('profile', JSON.stringify(res.data.profile));
            }
          } catch (err) {
            console.warn('[Session Verify Failed] Session token expired.');
            logout();
          }
        }
      } catch (err) {
        console.error('[Session Load Error]', err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      
      if (res.data.success) {
        const { token, user, profile } = res.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('profile', JSON.stringify(profile));
        
        setToken(token);
        setUser(user);
        setProfile(profile);
        
        showToast('Login successful! Welcome back.', 'success');
        
        // Redirect to dashboard based on role
        if (user.role === 'Admin') {
          router.push('/dashboard/admin');
        } else if (user.role === 'Doctor') {
          router.push('/dashboard/doctor');
        } else {
          router.push('/dashboard/patient');
        }
        return { success: true };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      showToast(errMsg, 'error');
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role, extraFields = {}) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', {
        name,
        email,
        password,
        role,
        ...extraFields,
      });

      if (res.data.success) {
        const { token, user, profile } = res.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('profile', JSON.stringify(profile));
        
        setToken(token);
        setUser(user);
        setProfile(profile);
        
        showToast('Registration successful! Welcome.', 'success');

        // Redirect based on role
        if (user.role === 'Admin') {
          router.push('/dashboard/admin');
        } else if (user.role === 'Doctor') {
          router.push('/dashboard/doctor');
        } else {
          router.push('/dashboard/patient');
        }
        return { success: true };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed.';
      showToast(errMsg, 'error');
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    
    setToken(null);
    setUser(null);
    setProfile(null);
    
    showToast('Logged out successfully.', 'info');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, profile, setProfile, token, loading, login, register, logout, showToast }}>
      {children}
      
      {/* Dynamic Toast Renderer overlay */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className={`toast toast-${t.type}`}>
              <div className="toast-message">{t.message}</div>
              <button 
                className="close-btn" 
                onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                style={{ fontSize: '1rem', marginLeft: '10px' }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
