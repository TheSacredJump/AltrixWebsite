import React from 'react';
import ScrollControlledVideo from '@/components/ScrollControlledVideo';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeTrustedBy from '@/components/TrustedBy';
import Features from '@/components/Features';
import NurseBenefits from '@/components/NurseBenefits';
import SplineComponent from '@/components/SplineComponent';
import Transition from '@/components/Transition';
import Steps from '@/components/Steps';
import Promotion from '@/components/Promotion';
import InvertTransition from '@/components/InvertTransition';
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
        <NurseBenefits />
        <Tabs />
        <Promotion />
        <Metrics />
        <PartnershipForm />
        <MarqueeTrustedBy />
        <Footer />
    </div>
  );
};

export default MainPage;