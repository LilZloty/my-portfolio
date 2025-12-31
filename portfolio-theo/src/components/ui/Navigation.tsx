'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollStore, useUIStore } from '@/lib/store';

type NavItem = { id: string; label: string; href?: string };

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const { activeSection } = useScrollStore();
  const { isMenuOpen, toggleMenu, closeAll } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeAll();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-darker/80 backdrop-blur-md border-b border-gray-brand/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-white">THEO</span>
            <span className="text-lime-neon">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium transition-colors text-gray-brand hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item.id
                      ? 'text-lime-neon'
                      : 'text-gray-brand hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lime-neon rounded-full" />
                  )}
                </button>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-sm"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-lime-neon transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeAll}
                  className="block w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-brand hover:bg-gray-dark hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-lime-neon/10 text-lime-neon'
                      : 'text-gray-brand hover:bg-gray-dark hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary w-full mt-4"
            >
              Start Project
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
