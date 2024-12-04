'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Download, Share2, Menu, X, Search, Home, Copy, Check, PlayCircle, PauseCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { UrlObject } from 'url';

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-400" />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        className="rounded-lg !bg-gray-900"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const ExpandableSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 pt-0"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const InteractiveDemo = ({ title, videoSrc, poster }: {title: string; videoSrc: string; poster: string; }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    
    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (videoElement) {
      videoElement.addEventListener('ended', handleEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#6677db] text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          {isPlaying ? (
            <>
              <PauseCircle size={18} /> Pause Demo
            </>
          ) : (
            <>
              <PlayCircle size={18} /> Start Demo
            </>
          )}
        </button>
      </div>
      <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] transition-opacity">
            <PlayCircle size={48} className="text-white/90" />
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full rounded-lg"
          src={videoSrc}
          poster={poster}
          playsInline
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

const SectionContent = ({ subsection }: { subsection: any }) => {
  return (
    <section id={subsection.id} className="mb-12 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          {subsection.title}
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {subsection.content}
          </p>

          {subsection.codeExample && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Implementation Example</h3>
              <CodeBlock 
                code={subsection.codeExample.code} 
                language={subsection.codeExample.language} 
              />
            </div>
          )}

          {subsection.demo && (
            <InteractiveDemo
              videoSrc={'/Altrix-Demo.mp4'}
              title={subsection.demo.title}
              poster=""
            />
          )}

          <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Key Points</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {subsection.keyPoints?.map((point: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#6677db]">•</span>
                  <span>{point}</span>
                </li>
              )) || (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6677db]">•</span>
                    <span>Important feature or finding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6677db]">•</span>
                    <span>Technical specification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6677db]">•</span>
                    <span>Implementation detail</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {subsection.resources && (
            <ExpandableSection title="Additional Resources">
              <ul className="space-y-2">
                {subsection.resources.map((resource: { url: string | UrlObject; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                  <li key={index}>
                    <Link 
                      href={resource.url}
                      className="text-[#6677db] hover:text-violet-700 dark:hover:text-violet-400"
                    >
                      {resource.title}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </p>
                  </li>
                ))}
              </ul>
            </ExpandableSection>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const WhitePaper = () => {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sections data structure
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      subsections: [
        { 
          id: 'executive-summary', 
          title: 'Executive Summary',
          content: 'Altrix represents a paradigm shift in healthcare documentation through its nurse-centric AI platform...',
          keyPoints: [
            'Revolutionary nurse-centric AI platform',
            'Focused on documentation efficiency',
            'Built with clinical expertise',
            'Proven results in healthcare settings'
          ]
        },
        { 
          id: 'introduction', 
          title: 'Introduction to Altrix',
          content: 'As a nurse-led innovation with deep roots in clinical practice...',
          demo: {
            title: 'Platform Overview',
            content: (isPlaying: any) => (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  {isPlaying ? (
                    <video 
                      className="w-full h-full rounded-lg"
                      autoPlay 
                      loop 
                      muted
                      src="/demo.mp4"
                    />
                  ) : (
                    <PlayCircle size={48} className="text-gray-400" />
                  )}
                </div>
              </div>
            )
          }
        },
      ]
    },
    {
      id: 'technical',
      title: 'Technical Overview',
      subsections: [
        { 
          id: 'architecture', 
          title: 'Technical Architecture',
          content: 'The Altrix platform is built on three core pillars...',
          codeExample: {
            language: 'typescript',
            code: `// Initialize Altrix client
const altrixClient = new AltrixClient({
  apiKey: process.env.ALTRIX_API_KEY,
  environment: 'production'
});

// Configure SIFT engine
await altrixClient.configureSIFT({
  model: 'clinical-v2',
  language: 'en',
  specialties: ['nursing', 'emergency']
});

// Process documentation
const result = await altrixClient.processNotes({
  patientId: '12345',
  notes: clinicalNotes,
  options: {
    extractEntities: true,
    generateSummary: true
  }
});`,}
        },
        { 
          id: 'ai-stack', 
          title: 'AI Technology Stack',
          content: 'Our AI stack combines custom NLP models, clinical entity recognition, temporal reasoning engine, and context understanding capabilities.'
        },
        { 
          id: 'sift-technology', 
          title: 'SIFT Technology',
          content: 'SIFT is our proprietary extractive NLP technology that ensures accurate clinical term extraction with zero hallucinations.'
        },
        { 
          id: 'xenia-middleware', 
          title: 'XENIA Middleware',
          content: 'XENIA is our adaptive middleware system that customizes Altrix for each specific nursing unit.'
        },
      ]
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      subsections: [
        { 
          id: 'security-overview', 
          title: 'Security Overview',
          content: 'Our comprehensive security architecture ensures protection at rest and in transit, with multiple layers of encryption and access controls.'
        },
        { 
          id: 'hipaa-compliance', 
          title: 'HIPAA Compliance',
          content: 'Altrix maintains full HIPAA compliance through our rigorous security measures and privacy controls.'
        },
        { 
          id: 'data-privacy', 
          title: 'Data Privacy',
          content: 'We implement state-of-the-art privacy measures to protect sensitive healthcare data.'
        },
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation',
      subsections: [
        { 
          id: 'integration-guide', 
          title: 'Integration Guide',
          content: 'Step-by-step guide for integrating Altrix with existing healthcare systems and workflows.'
        },
        { 
          id: 'api-reference', 
          title: 'API Reference',
          content: 'Comprehensive API documentation for developers implementing Altrix integration.'
        },
        { 
          id: 'deployment', 
          title: 'Deployment Options',
          content: 'Flexible deployment options including cloud, hybrid, and on-premise solutions.'
        },
      ]
    },
    {
      id: 'validation',
      title: 'Validation & Metrics',
      subsections: [
        { 
          id: 'clinical-validation', 
          title: 'Clinical Validation',
          content: 'Results from our clinical validation studies with leading healthcare institutions.'
        },
        { 
          id: 'performance-metrics', 
          title: 'Performance Metrics',
          content: 'Detailed performance metrics including accuracy, speed, and efficiency gains.'
        },
        { 
          id: 'case-studies', 
          title: 'Case Studies',
          content: 'Real-world implementation case studies and success stories.'
        },
      ]
    }
  ];

  // Search functionality
  const flattenedSections = sections.flatMap(section => 
    section.subsections.map(subsection => ({
      ...subsection,
      parentTitle: section.title
    }))
  );

  const filteredSections = searchQuery
    ? flattenedSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (section.content && section.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sectionElements.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl mx-4 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search documentation... (Press '/' to focus)"
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                ESC
              </kbd>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredSections.length > 0 ? (
                <div className="p-2">
                  {filteredSections.map((result) => (
                    <Link
                      key={result.id}
                      href={`#${result.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {result.parentTitle}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No results found for &quot;{searchQuery}&quot;
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <Home size={24} />
              </button>
            </Link>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-gray-50 dark:bg-neutral-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto`}
      >
        <div className="sticky top-0 bg-gray-50 dark:bg-neutral-900 z-10 p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
          <Link href="/">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <Home size={20} />
              </button>
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Search size={16} />
              Quick search...
              <kbd className="ml-auto text-xs text-gray-400">⌘K</kbd>
            </button>
          </div>
          <h1 className="text-xl font-bold dark:text-white">Altrix Whitepaper</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Technical Documentation v1.0</p>
        </div>
        <nav className="p-6">
          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.subsections.map((subsection) => (
                  <li key={subsection.id}>
                    <Link
                      href={`#${subsection.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        activeSection === subsection.id
                          ? 'bg-violet-50 dark:bg-violet-900/20 text-[#6677db] dark:text-violet-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => {
                        setIsSidebarOpen(false);
                        setActiveSection(subsection.id);
                      }}
                    >
                      {subsection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="lg:pl-72">
        <header className="hidden lg:block sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Home size={20} />
                </button>
              </Link>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Search size={16} />
                Quick search...
                <kbd className="ml-auto text-xs text-gray-400">⌘K</kbd>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Download size={18} />
                Download PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 lg:py-16">
          {sections.map((section) => (
            <div key={section.id} className="mb-16">
              {section.subsections.map((subsection) => (
                <SectionContent
                  key={subsection.id}
                  subsection={subsection}
                />
              ))}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default WhitePaper;