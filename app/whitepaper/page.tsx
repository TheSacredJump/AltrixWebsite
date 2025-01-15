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
      id: 'Problem',
      title: 'Problem',
      subsections: [
        { 
          id: 'Problem: Time in EHRs', 
          title: 'Problem: Time in EHRs',
          content: 'One in three nurses plan to leave their field this year, and the World Health Organization estimates a global nursing shortage of 4.5 million by 2030. A key driver is the overwhelming documentation burden nurses face daily. On average, nurses spend 186 minutes per 12-hour shift—about 26% of their time—on electronic health record (EHR) tasks. This detracts from patient care and contributes to burnout, with 87% of nurses identifying EHR use as a significant mental strain. Documentation dominates nursing workflows, leaving direct patient care at less than 40% of their shift. Nurses also face an average of 45 interruptions per shift, fragmenting focus and increasing errors. The result is not only reduced job satisfaction but also diminished care quality, with documentation errors linked to over 473,200 cases annually. Addressing this issue is critical to alleviating burnout and retaining the nursing workforce.',
          keyPoints: [
            'Massive Shortages: 1 in 3 nurses plans to leave; 4.5M global shortage projected by 2030.',
            'Time Drain: Nurses spend 26% of shifts (186 minutes) on EHR tasks.',
            'Care Impact: Documentation errors contribute to over 473,200 cases annually.'
          ]
        },
        { 
          id: 'Lack of Tailored Solutions', 
          title: 'Lack of Tailored Solutions',
          content: 'Ironically, healthcare technology has consistently overlooked the unique needs of nurses, prioritizing solutions tailored for physicians. Unlike physicians, who document primarily through structured SOAP notes, nurses depend on flowsheets that require aggregating diverse and often non-linear data points. Their dynamic and fast-paced environments, where bedside assessments and hands-on care dominate, render traditional speech-based or stationary tools impractical. Existing partial solutions only add to the inefficiency, as they fail to fully automate workflows or address the real-time demands of nursing tasks. With nurses already spending 26% of their shifts on documentation, these gaps in tailored technology leave them juggling inefficient tools, further compounding their workload and detracting from patient care. This persistent neglect underscores the urgent need for systems designed to integrate seamlessly into nursing workflows and address their unique challenges.',
          keyPoints: [
            'Overlooked Needs: Nursing workflows rely on flowsheets & a moving enviroment, unlike physicians’ SOAP notes & static consultations.',
            'Compounded Burden: Partial automation adds to EHR inefficiencies, consuming 26% of nurses’ shifts.'
          ]
        },
      ]
    },
    {
      id: 'Solution',
      title: 'Solution',
      subsections: [
        { 
          id: 'Solution: Executive Summary', 
          title: 'Solution: Executive Summary',
          content: 'The Altrix platform is designed to streamline nursing workflows by integrating directly with EHR systems, significantly reducing the time nurses spend on documentation. AutoChart captures nurse-patient interactions and converts them into flowsheets within the EHR, removing the need for manual data entry. The EHR Assistant allows nurses to retrieve patient information and queue tasks like lab or technician orders using natural language or voice commands, ensuring tasks are completed efficiently. CNO Visibility provides tools for tracking patient acuity and workload distribution, helping nurse managers make data-driven staffing decisions. Altrix focuses on creating a seamless and practical solution that aligns with the specific demands of inpatient nursing care.',
          keyPoints: [
            'AutoChart reduces manual entry by capturing nurse-patient interactions and generating flowsheets directly in the EHR.',
            'EHR Assistant streamlines task management and information retrieval using natural language or voice commands.',
            'CNO Visibility provides real-time insights into patient acuity and workload distribution to optimize staffing and resource allocation.'
          ]
        },
        { 
          id: 'Multiagent Orchestration', 
          title: 'Multiagent Orchestration',
          content: 'Altrix leverages an AI-native architecture with a multiagent system that enables seamless collaboration across specialized tasks. One agent manages documentation by transcribing and structuring nurse-patient interactions into EHR flowsheets, while another handles billing by converting documentation into CPT and ICD codes. A third agent facilitates scheduling and post-care engagement, ensuring efficient coordination. These agents operate on a shared data framework, eliminating the need for manual data reconciliation. By orchestrating these systems in real time, Altrix ensures that data flows seamlessly between tasks, creating a cohesive and efficient workflow for nurses and administrators.',
          keyPoints: [
            'Specialized agents manage tasks like documentation, surfacing information, billing, and coordinating actions in real time.',
            'Eliminates manual data reconciliation and streams data flow across tasks.',
          ]
        },
        { 
          id: 'Natural Language Interfaces', 
          title: 'Natural Language Interfaces',
          content: 'Altrix incorporates natural language processing (NLP) to enable intuitive and efficient interactions. Nurses can form flowsheets, retrieve patient information, or queue orders using plain language, whether through text or voice commands. These natural language interfaces streamline workflows by allowing conversational interactions that fit seamlessly into nursing routines. As this capability evolves, it moves beyond convenience, serving as a tool for expanding access to actionable information and improving communication between nurses, physicians, and administrators. This approach reduces complexity, making essential data and tasks more accessible in real time.',
          keyPoints: [
            'Nurses can dictate notes, query information, and queue orders using plain language through text or voice.',
            'Expands access to real-time actionable information while reducing complexity in workflows.',
          ]
        },
        { 
          id: 'User-Centric Design', 
          title: 'User-Centric Design',
          content: 'Altrix is designed with user-centricity at its core, addressing the needs of relevant stakeholders in a nurse floor. Nurses benefit from tools that anticipate documentation requirements, streamline workflows, and surface relevant patient information at the point of care. Administrators gain real-time visibility into patient acuity, staffing metrics, and resource allocation, enabling data-driven decision-making. Patients are supported through personalized content and consistent follow-up. This approach ensures that each user group has tools tailored to their specific roles, avoiding the inefficiencies of a one-size-fits-all system.',
          keyPoints: [
            'Tailored interfaces address the roles of nurses, administrators, and IT teams without requiring system-wide adaptation.'
          ]
        },
      ]
    },
    {
      id: 'System Architecture',
      title: 'System Architecture',
      subsections: [
        { 
          id: 'Approaches to AI Integration', 
          title: 'Approaches to AI Integration',
          content: 'AI integration in healthcare typically follows three paths. The first involves incremental enhancements to legacy EHR systems by layering AI modules like billing automation or documentation tools onto platforms such as Epic or Cerner. This approach minimizes disruption and costs but risks creating silos and accumulating technical debt if modules don’t interoperate seamlessly. The second approach is building a fully AI-native EHR from the ground up, incorporating advanced analytics, multi-agent systems, and natural language interfaces. While offering a future-proof solution, this strategy is expensive, time-intensive, and challenging due to existing contractual obligations and user reliance on current EHR systems. The third, and the approach Altrix adopts, is a unified add-on solution. This overlays AI functionalities onto legacy systems, synchronizing data in real time and maintaining a standardized schema without extensive back-end rework. It enables faster adoption, cohesive workflows, and seamless user experiences while retaining familiar systems and processes.',
          keyPoints: [
            '3 Paths: Incremental enhancements to legacy EHRs are cost-effective but risk creating silos, while building a fully AI-native EHR offers advanced capabilities but is costly and time-intensive.',
            'Our path: The unified add-on solution provides seamless integration, faster adoption, and cohesive workflows without requiring extensive re-architecture, aligning with our goal of efficient, scalable AI implementation.'
          ]
        },
        { 
          id: 'Catalyzing Vertical Progress', 
          title: 'Catalyzing Vertical Progress',
          content: 'A complete AI-native platform takes a vertically integrated approach, where documentation, billing, interoperability, scheduling, and patient engagement are modules of a single ecosystem. Clinician interaction – like voice-to-text AI scribes – automatically inform coding modules, which then update claims in real time and feed data back into triaging systems. Patients benefit from continuous monitoring tools that feed data into the same unified backbone, triggering alerts or care management workflows without manual handoffs. Such vertical progress can achieve far greater return on investment (ROI) over the long term. Although it may demand a larger initial commitment, health systems stand to reap compounding benefits: (1) Seamless Data Sharing: A single data backbone ensures that each AI module leverages the same patient record, reducing errors and redundant data entry. (2) Synergistic Intelligence: Insights from one module automatically enhance analytics in others, fueling proactive interventions. (3) Ecosystem Stickiness: Once an organization experiences the benefits of multiple integrated functionalities, the overall value proposition of the platform grows exponentially, making it less desirable to revert to piecemeal solutions. (4) The inflection point for adoption – where an AI-native platform becomes more cost-effective and transformative than individual AI add-ons – occurs when clinical, administrative, and operational benefits reinforce one another in ways that siloed approaches cannot replicate. Once multiple stakeholders run on an integrated ecosystem, the network effect accelerates further improvements in care delivery.',
          keyPoints: [
            'Unified Ecosystem: A vertically integrated AI-native platform connects documentation, billing, scheduling, and patient engagement under a single data backbone, reducing errors and redundant work.',
            'Synergistic Intelligence: Insights from one module enhance others, enabling proactive interventions and streamlined workflows across clinical and administrative tasks.',
            'Compounding ROI: The integrated approach delivers increasing value over time, making the platform more cost-effective and difficult to replace compared to piecemeal solutions.'
          ]
        },
        { 
          id: 'Tailwinds', 
          title: 'Tailwinds',
          content: 'Adopting an all-in-one platform today can still be challenging, given the high development costs, potential disruption to workflows, and limited availability of integrated solutions. However, the evolving landscape of LLMs and AI agents systems suggests that barriers will diminish in the near future: (1) Reduced Compute Costs: The commoditization of high-performance computing and AI frameworks will make advanced LLMs more affordable and accessible to a broader range of healthcare organizations. (2) Maturing AI Agents: As agentic systems become more robust and user-friendly, many of the “glue” functions – such as data exchange, workflow automation, and real-time feedback loops – will be available out-of-the-box. (3) Standardization and Regulatory: Emerging protocols (e.g., FHIR expansions) and clearer regulatory guidance are positioning the industry to embrace unified AI solutions without exposing organizations to unreasonable legal or compliance risks. As the cost and complexity of advanced AI diminish, the rationale for building (or purchasing) a single, integrated suite – rather than assembling a patchwork of disparate tools – becomes stronger.',
          keyPoints: [
            'Challenges Today: High development costs, workflow disruption, and limited integrated solutions make adopting all-in-one platforms challenging.',
            'Future Improvements: Reduced compute costs, maturing AI agents, and clearer standards are making unified AI solutions more affordable and accessible.',
            'Integration Rationale: As costs and complexities decrease, building or adopting a single integrated suite becomes increasingly logical over patchwork solutions.'
          ]
        },
      ]
    },
    {
      id: 'Building for an AI-Native Future',
      title: 'Building for an AI-Native Future',
      subsections: [
        { 
          id: 'Modular Framework for Unified Progress', 
          title: 'Modular Framework for Unified Progress',
          content: 'At Altrix, the focus is on ushering in “vertical progress” – not by creating a series of standalone AI products, but by engineering them to operate within a cohesive environment from the outset. Rather than offering separate solutions for scribes, billing, and patient engagement, Altrix aims to deliver a modular yet unified framework. This approach does not preclude incremental rollouts or pilots; health systems can adopt specific modules first. Over time, the synergy among these components becomes the driver of idiosyncratic value.',
          keyPoints: [
            'Unified Framework: Altrix designs a modular system where components like scribes, billing, and patient engagement operate cohesively from the outset.',
            'Incremental Adoption: Health systems can start with specific modules, with long-term synergy driving value across all components.'
          ]
        
        },
        { 
          id: 'Intelligent Middleware', 
          title: 'Intelligent Middleware',
          content: 'Real-time orchestration of clinical and administrative workflows will require solutions that can dynamically allocate resources, staff, and technology. Systems will likely need “intelligent middleware” that bridges different AI modules, EHR vendors, and external data sources. Growing volumes of unstructured data, tighter staffing constraints, and the maturation of agentic AI will demand ever-more-sophisticated workflow engines that anticipate needs before they become bottlenecks.',
          keyPoints: [
            'Dynamic Resource Allocation: Real-time orchestration requires intelligent middleware to allocate resources, staff, and technology efficiently.',
            'Workflow Engines: Advanced systems are needed to bridge AI modules, EHRs, and external data, anticipating bottlenecks before they occur.'
          ]
        },
        { 
          id: 'Transparency Layers', 
          title: 'Transparency Layers',
          content: 'As AI-driven decision support becomes ubiquitous, providers and regulators will demand greater transparency and fairness. Companies that specialize in designing “explainable AI layers” – complete with bias mitigation and real-time auditing – will fill a vital gap. Heightened patient awareness, stricter regulatory frameworks, and the risk of litigation could amplify the need for robust AI governance.',
          keyPoints: [
            'Demand for Transparency: The ubiquity of AI in decision support drives the need for explainable AI layers with bias mitigation and real-time auditing.',
            'Importance of Governance: Heightened patient awareness and stricter regulations amplify the need for robust AI governance to ensure compliance and fairness.'
          ]
        },
        { 
          id: 'Federated Learning & Data Cooperatives', 
          title: 'Federated Learning & Data Cooperatives',
          content: 'Federated learning allows AI models to train on distributed datasets without centralizing sensitive patient information. As privacy regulations tighten, solutions that facilitate cross-institutional collaboration without data exposure could become invaluable.',
          keyPoints: [
            'Privacy-Preserving Collaboration: Federated learning enables AI training across distributed datasets while safeguarding sensitive patient information, meeting stricter privacy regulations.'
          ]
        },
      ]
    },
    {
      id: 'impact',
      title: 'Impact',
      subsections: [
        { 
          id: 'clinical-validation', 
          title: 'Impact: Clinical Validation',
          content: 'Early testing of the Altrix platform have demonstrated significant reductions in nurse documentation time, cutting it from an average of 186 minutes per shift to under 30 minutes. This streamlined workflow allows nurses to allocate more time to patient care, improving satisfaction for both patients and staff. Additionally, early testing show a potential 30% decrease in documentation-related errors, reducing liability risks for hospitals.',
          keyPoints: [
            'Immediate Benefits from Simulations: Altrix reduces nurse documentation time to under 30 minutes per shift and decreases documentation-related errors by 30%.'
          ]
        },
        { 
          id: 'Projected-Outcomes', 
          title: 'Projected Outcomes',
          content: 'As the platform is implemented more widely, Altrix is expected to improve nurse retention by addressing one of the primary causes of burnout—documentation overload. Projections estimate a 40–45% reduction in nurse burnout rates within adopting systems, alongside optimized resource allocation enabled by real-time patient acuity tracking. Hospitals can also anticipate shorter billing cycles, as automated coding through Altrix minimizes claim denials and accelerates revenue collection.',
          keyPoints: [
            'Projected Clinical and Operational Outcomes: The platform is expected to lower nurse turnover rates by 20–25% and optimize resource allocation through real-time acuity tracking.'
          ]
        },
        { 
          id: 'Long-Term-Vision', 
          title: 'Long-Term Vision',
          content: 'Altrix is committed to redefining nursing workflows through rigorous research and innovation. Drawing from observational clinical studies, contributions to technical research, and healthcare design white papers, Altrix continually develops solutions that address the evolving challenges of nursing. This dedication positions Altrix as a leader in advancing technology that empowers nurses and enhances their role in delivering quality care.',
          keyPoints: [
            'Altrix is commited to advancing nursing workflows through research-driven innovation, empowering nurses and enhancing care quality.'
          ]
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your Nursing Station, on Autopilot</p>
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