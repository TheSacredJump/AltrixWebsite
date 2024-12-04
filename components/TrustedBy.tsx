import React from 'react';
import Image from 'next/image';

const MarqueeTrustedBy = () => {
  const companies = [
    { name: 'Epic', logo: '/epic.png' },
    { name: 'Medstack', logo: '/medstack.png' },
    { name: 'Microsoft', logo: '/microsoft.png' },
    { name: 'University of Michigan', logo: '/umich_logo.png' },
    { name: 'Ann Arbor Spark', logo: '/annarbor_spark.png' },
    { name: 'Rice University', logo: '/rice_logo.png' },
    { name: 'Synergy', logo: '/synergy.png' },
    { name: 'MC3 Cardiopulmonary', logo: '/mc3.png' },
    // Add more companies as needed
  ];

  return (
    <section className="py-20 overflow-hidden dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
          In Collaboration with Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6677db] to-violet-500">Organizations</span>
        </h2>
        <div className="relative">
          <div className="flex animate-marquee">
            {companies.concat(companies).map((company, index) => (
              <div key={index} className="flex-shrink-0 w-32 mx-8">
                <div className="w-full h-20 relative grayscale dark:grayscale-0 hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeTrustedBy;