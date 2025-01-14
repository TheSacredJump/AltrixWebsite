'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    // Create observers for Steps and Promotion sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsOnDarkSection(true);
          } else {
            // Only set to false if both sections are not in view
            const otherDarkSectionVisible = document.querySelector('#steps, #promotion, #invert')?.getBoundingClientRect().top === 0;
            if (!otherDarkSectionVisible) {
              setIsOnDarkSection(false);
            }
          }
        });
      },
      {
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );

    // Observe both Steps and Promotion sections
    const stepsSection = document.querySelector('#steps');
    const promotionSection = document.querySelector('#promotion');
    const invertSection = document.querySelector('#invert');

    if (stepsSection) observer.observe(stepsSection);
    if (promotionSection) observer.observe(promotionSection);
    if (invertSection) observer.observe(invertSection);

    // Animate in on initial load
    setTimeout(() => setIsVisible(true), 50);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isOnDarkSection ? 'bg-black' : 'bg-white dark:bg-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <Image src="/altrix_logo.png" width={100} height={100} alt="Altrix" />
            </Link>
            <div className="hidden md:flex md:space-x-8 ml-10">
              <NavLink href="/#features">Platform</NavLink>
              <NavLink href="/#nursebenefits">Impact</NavLink>
              <NavLink href="/#about">About</NavLink>
              <NavLink href="/whitepaper">Research</NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/waitlist" className={`inline-flex items-center px-4 py-2 border border-[#6677db] text-sm font-medium rounded-md text-[#6677db] ${isOnDarkSection ? 'bg-black' : 'bg-white dark:bg-neutral-950'} hover:bg-[#6677db] dark:hover:bg-[#6677db] hover:text-white hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}>
            Supercharge Your Nurses
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#6677db] focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-neutral-950">
            <MobileNavLink href="/#features">Platform</MobileNavLink>
            <MobileNavLink href="/#nursebenefits">Impact</MobileNavLink>
            <MobileNavLink href="/#about">About</MobileNavLink>
            <MobileNavLink href="/whitepaper">Research</MobileNavLink>
            <Link href="/waitlist" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#6677db] hover:bg-violet-700">
              Supercharge Your Nurses
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[#6677db] hover:text-violet-800">
    {children}
  </Link>
);

const MobileNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium text-[#6677db] hover:bg-violet-50 dark:hover:bg-gray-800 hover:text-violet-800">
    {children}
  </Link>
);

export default Navbar;