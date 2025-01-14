"use client";

import React, { useState } from 'react';

const PartnershipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    bedsCount: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-white dark:bg-black py-24 relative">
        <div className="max-w-xl mx-auto text-center px-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-100 dark:border-green-900">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">We&apos;ve received your partnership request and will be in touch shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-black py-24 relative">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-50 dark:opacity-100 transition-opacity"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(102, 119, 219, 0.1), transparent 50%),
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '1200px 1200px, 80px 80px, 80px 80px',
          backgroundPosition: '50% 50%, 0 0, 0 0',
          backgroundRepeat: 'no-repeat, repeat, repeat'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Partner with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6677db] to-violet-500 ml-2">
              Altrix
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join us in redefining nursing workflows and improving patient care
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:text-white"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Organization
              </label>
              <input
                type="text"
                name="organization"
                id="organization"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:text-white"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:text-white"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="bedsCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Beds
            </label>
            <select
              name="bedsCount"
              id="bedsCount"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:text-white"
              value={formData.bedsCount}
              onChange={handleChange}
            >
              <option value="">Select bed count</option>
              <option value="1-10">1-10 beds</option>
              <option value="11-25">11-25 beds</option>
              <option value="26-50">26-50 beds</option>
              <option value="51-100">51-100 beds</option>
              <option value="100+">100+ beds</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Information
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent dark:text-white"
              placeholder="Tell us about your current challenges and what you're looking to achieve..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Partnership Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnershipForm;