//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import Footer from './components/Footer';
import Header from './components/Header';
import Banner from './components/Banner';
import FishDisplay from './components/FishDisplay';

export default function App() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <Banner />
      <FishDisplay />
      <Footer />
    </div>
  );
}
