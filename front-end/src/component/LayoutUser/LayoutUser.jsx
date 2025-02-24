import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../component/Footer/Footer';
import Header from '../Header/Header';


const LayoutUser = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUser;
