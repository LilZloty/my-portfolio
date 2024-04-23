import React, { useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
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
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        {/* ... */}
      </Head>
      <main className="px-10 md:px-20 lg:px-40 dark:bg-[#121212f0] dark:text-white py-10">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <About />
        <Portfolio
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <Footer />
      </main>
    </div>
  );
}