'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, User, Mail, Building, Stethoscope, MessageSquare } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  ehrSystem: string;
  interest: string;
  message: string;
  subscribe: boolean;
}

const Waitlist = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    role: '',
    ehrSystem: '',
    interest: '',
    message: '',
    subscribe: false
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: e.target instanceof HTMLInputElement && e.target.type === 'checkbox' 
        ? e.target.checked 
        : value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Reset form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      role: '',
      ehrSystem: '',
      interest: '',
      message: '',
      subscribe: false
    });
  };

  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-teal-100 dark:from-neutral-950 dark:from-30% dark:via-teal-900 dark:via-55% dark:to-neutral-950 dark:to-75% p-4'>
      <div className='max-w-2xl w-full bg-white dark:bg-[#212121] rounded-lg shadow-xl overflow-hidden'>
        <div className='p-8'>
          <h2 className='text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white'>Join Our Waitlist</h2>
          <p className='text-center text-gray-600 dark:text-gray-300 mb-6'>Be among the first to experience AI-powered nursing scribes for your EHR!</p>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>First Name</label>
                <div className='relative'>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                    placeholder='John'
                    required
                  />
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </div>
              <div>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Last Name</label>
                <div className='relative'>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                    placeholder='Doe'
                    required
                  />
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Email Address</label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                  placeholder='john@example.com'
                  required
                />
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              </div>
            </div>
            <div>
              <label htmlFor='organization' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Healthcare Organization</label>
              <div className='relative'>
                <input
                  type='text'
                  id='organization'
                  name='organization'
                  value={formData.organization}
                  onChange={handleChange}
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                  placeholder='General Hospital'
                  required
                />
                <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Role</label>
                <div className='relative'>
                  <input
                    type='text'
                    id='role'
                    name='role'
                    value={formData.role}
                    onChange={handleChange}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                    placeholder='Physician, Nurse, Admin, etc.'
                    required
                  />
                  <Stethoscope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </div>
              <div>
                <label htmlFor='ehrSystem' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Current EHR System</label>
                <input
                  type='text'
                  id='ehrSystem'
                  name='ehrSystem'
                  value={formData.ehrSystem}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                  placeholder='e.g., Epic, Cerner, Custom'
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor='interest' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Primary Interest in AI Scribes</label>
              <select
                id='interest'
                name='interest'
                value={formData.interest}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                required
              >
                <option value=''>Select your primary interest</option>
                <option value='Efficiency'>Improving Efficiency</option>
                <option value='Accuracy'>Enhancing Documentation Accuracy</option>
                <option value='Cost'>Reducing Operational Costs</option>
                <option value='Integration'>EHR Integration</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Additional Comments (Optional)</label>
              <div className='relative'>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white'
                  placeholder='Tell us more about your needs or questions...'
                ></textarea>
                <MessageSquare className='absolute left-3 top-3 text-gray-400 h-5 w-5' />
              </div>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='subscribe'
                name='subscribe'
                checked={formData.subscribe}
                onChange={handleChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label htmlFor='subscribe' className='ml-2 block text-sm text-gray-700 dark:text-gray-300'>
                Keep me updated on Altrix developments and early access opportunities
              </label>
            </div>
            <button
              type='submit'
              className='w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6677db] hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out'
            >
              Join Waitlist
              <Send className='ml-2 h-4 w-4' />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Waitlist;