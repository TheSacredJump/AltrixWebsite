'use client';

import React from 'react';
import Link from 'next/link';
import {Linkedin} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-400 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/altrix_logo.png" alt="Logo" width={100} height={100} />
            </Link>
            <p className="text-sm mb-4">
              Your Nurses Station, on Autopilot
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="hover:text-[#6677db] transition-colors">
                  AutoChart
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#6677db] transition-colors">
                  AutoAssistant
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#6677db] transition-colors">
                  AutoVisibility
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#6677db] transition-colors">
                  AutoBilling
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="hover:text-[#6677db] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="hover:text-[#6677db] transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/#nursebenefits" className="hover:text-[#6677db] transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/waitlist" className="hover:text-[#6677db] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="hover:text-[#6677db] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#6677db] transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Altrix. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link href={'/waitlist'}>
              <button className="inline-flex items-center px-4 py-2 border border-[#6677db] text-sm font-medium rounded-md text-[#6677db] bg-white dark:bg-neutral-950 hover:bg-[#6677db] hover:text-white transition-colors duration-300">
                Supercharge Your Nurses
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;