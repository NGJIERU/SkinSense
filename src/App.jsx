import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import Order from './components/Order';
import MyProduct from './components/MyProduct'; 
import AddProduct from './components/AddProduct'; 
import ChatManagement from './components/ChatManagement'; 
import Finance from './components/Finance'; 
import './App.css';

const MainLayout = () => {
  return (
    <div className="MainContainer">
      <div className="SidebarContainer">
        <Sidebar />
      </div>
      <div className="MainContentContainer">
        <Routes>
          <Route path="/Order" element={<Order />} />
          <Route path="/MyProduct" element={<MyProduct />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ChatManagement" element={<ChatManagement />} />
          <Route path="/Finance" element={<Finance />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
