import React, { useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Techstack from './components/Techstack';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <Head>
        {/* ... */}
      </Head>
        
      <main className="min-h-screen dark:bg-[#121212f0] dark:text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-4">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Hero />
          <About />
          <Techstack />
          <Portfolio
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <Footer />
        </div>
      </main>
    </div>
  );
}