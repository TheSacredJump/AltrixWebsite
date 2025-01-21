import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeTrustedBy from '@/components/TrustedBy';
import Features from '@/components/Features';
import NurseBenefits from '@/components/NurseBenefits';
import Promotion from '@/components/Promotion';
import Footer from '@/components/Footer';
import Metrics from '@/components/Metrics';
import Tabs from '@/components/Tabs';
import PartnershipForm from '@/components/PartnershipForm';

const MainPage: React.FC = () => {
  return (
    <div className="relative">
        <Navbar />
        <Hero />
        <Features />


        <MarqueeTrustedBy />
        <Promotion />
        <Metrics />
        <PartnershipForm />
        <Footer />
    </div>
  );
};

export default MainPage;