import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Copyright from './components/layout/Copyright';
import Home from './pages/Home';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { ForgotPassword, EditBilling, EditShipping } from './pages/AccountPages';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-0">
        <TopBar />
        <Header />
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/edit-billing" element={<EditBilling />} />
            <Route path="/edit-shipping" element={<EditShipping />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <Copyright />
      </div>
    </Router>
  );
}

export default App;
