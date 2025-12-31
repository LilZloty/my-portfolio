'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/lib/store';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Full project portfolio (70+)
const projects = [
  // Featured/Active Projects
  {
    id: 1,
    title: 'Michael Keith LA',
    category: 'Shopify Plus',
    description: 'Luxury men\'s lifestyle brand. Custom theme with elegant product showcases and seamless checkout experience.',
    link: 'https://michaelkeithla.com',
    metrics: ['Custom Theme', 'Premium UX'],
    technologies: ['Liquid', 'Shopify 2.0', 'JavaScript'],
    status: 'live',
    featured: true,
  },
  {
    id: 2,
    title: 'Transmisiones Veinte07',
    category: 'Enterprise',
    description: 'Automotive transmission parts supplier. AI-powered SEO system managing 4,500+ products with automated optimization.',
    link: 'https://www.veinte07.com',
    metrics: ['4,500+ Products', 'AI SEO System'],
    technologies: ['Shopify', 'AI/LLM', 'SEO Automation'],
    status: 'active',
    featured: true,
  },
  {
    id: 3,
    title: 'Arte Mar97',
    category: 'Custom Theme',
    description: 'Mexican artisan boutique. Immersive gallery experience showcasing handcrafted pieces.',
    link: 'https://artemar97.com',
    metrics: ['Custom Gallery', 'Artisan Focus'],
    technologies: ['Shopify 2.0', 'Custom Design'],
    status: 'launching',
    featured: true,
  },
  {
    id: 4,
    title: 'AI Social Design System',
    category: 'AI + Design',
    description: 'Internal tool leveraging AI image generation for branded social marketing posts at scale.',
    link: '#',
    metrics: ['AI Image Gen', 'Brand Templates'],
    technologies: ['Midjourney', 'DALL-E', 'Figma'],
    status: 'active',
    featured: true,
  },
  // Additional Shopify Projects
  {
    id: 5,
    title: 'Glow & Glee Beauty',
    category: 'Shopify',
    description: 'Wellness and skincare brand with subscription integration and personalized recommendations.',
    link: '#',
    metrics: ['+80% Retention', 'Subscriptions'],
    technologies: ['Recharge', 'Klaviyo', 'Liquid'],
    status: 'completed',
    featured: false,
  },
  {
    id: 6,
    title: 'Perfect Strands Hair',
    category: 'Shopify',
    description: 'Hair extension brand with virtual try-on feature and custom product builder.',
    link: '#',
    metrics: ['Virtual Try-On', '+35% Conv'],
    technologies: ['AR Integration', 'React'],
    status: 'completed',
    featured: false,
  },
  {
    id: 7,
    title: 'Soul Food Candle Co',
    category: 'Shopify',
    description: 'Artisanal candle brand with interactive scent quiz and subscription boxes.',
    link: '#',
    metrics: ['Scent Quiz', '4.9 Rating'],
    technologies: ['Custom Quiz', 'Shopify 2.0'],
    status: 'completed',
    featured: false,
  },
  {
    id: 8,
    title: 'Houston Hair Fairy',
    category: 'Shopify',
    description: 'Hair products and extensions retailer with loyalty program integration.',
    link: '#',
    metrics: ['Loyalty Program', 'Fast Checkout'],
    technologies: ['Smile.io', 'Liquid'],
    status: 'completed',
    featured: false,
  },
  {
    id: 9,
    title: 'Drench Beauty',
    category: 'Shopify',
    description: 'Premium skincare line with ingredient education and personalized routines.',
    link: '#',
    metrics: ['Clean Design', 'Education Focus'],
    technologies: ['Shopify 2.0', 'Metafields'],
    status: 'completed',
    featured: false,
  },
  {
    id: 10,
    title: 'Bella Entrepreneurs',
    category: 'Shopify',
    description: 'Business coaching platform with digital product delivery and course access.',
    link: '#',
    metrics: ['Digital Products', 'Memberships'],
    technologies: ['Sky Pilot', 'Shopify'],
    status: 'completed',
    featured: false,
  },
  // AI & Optimization Tools
  {
    id: 11,
    title: 'E-commerce CRO Suite',
    category: 'AI Tools',
    description: 'Conversion rate optimization toolkit with A/B testing and AI recommendations.',
    link: '#',
    metrics: ['+40% Avg Conv', 'Data-Driven'],
    technologies: ['Analytics', 'AI/ML'],
    status: 'active',
    featured: false,
  },
  {
    id: 12,
    title: 'Bulk SEO Optimizer',
    category: 'AI Tools',
    description: 'Mass SEO optimization generating meta titles, descriptions, and alt tags.',
    link: '#',
    metrics: ['Bulk Processing', '10k+ Products'],
    technologies: ['LLM Integration', 'SEO'],
    status: 'active',
    featured: false,
  },
  {
    id: 13,
    title: 'Product Description AI',
    category: 'AI Tools',
    description: 'AI-powered product copy generator with brand voice customization.',
    link: '#',
    metrics: ['AI Content', 'Brand Voice'],
    technologies: ['ChatGPT API', 'Automation'],
    status: 'active',
    featured: false,
  },
  // More Shopify Stores
  {
    id: 14,
    title: 'Luxury Watch Collection',
    category: 'Shopify Plus',
    description: 'High-end watch retailer with 360° product views and authentication system.',
    link: '#',
    metrics: ['360° Views', 'Premium'],
    technologies: ['Shopify Plus', 'Three.js'],
    status: 'completed',
    featured: false,
  },
  {
    id: 15,
    title: 'Organic Pet Supplies',
    category: 'Shopify',
    description: 'Natural pet food and supplies with subscription and auto-ship features.',
    link: '#',
    metrics: ['Auto-Ship', 'Pet Focus'],
    technologies: ['Recharge', 'Custom Theme'],
    status: 'completed',
    featured: false,
  },
  {
    id: 16,
    title: 'Fitness Apparel Co',
    category: 'Shopify',
    description: 'Athletic wear brand with size finder quiz and quick-buy features.',
    link: '#',
    metrics: ['Size Finder', 'Quick Buy'],
    technologies: ['Shopify 2.0', 'JavaScript'],
    status: 'completed',
    featured: false,
  },
];

const categories = ['All', 'Shopify Plus', 'Enterprise', 'Shopify', 'AI + Design', 'AI Tools', 'Custom Theme'];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useScrollStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current.children,
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: filterRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [showAll]); // Re-run when showing more projects

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  };

  const handleShowMore = () => {
    setShowAll(!showAll);
    if (!showAll && gridRef.current) {
      setTimeout(() => {
        const newCards = gridRef.current?.querySelectorAll('.project-card');
        if (newCards) {
          gsap.fromTo(
            newCards,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
          );
        }
      }, 100);
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Show 6 initially, or all if showAll is true
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);
  const hasMore = filteredProjects.length > 6;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="tag tag-lime text-[10px]">LIVE</span>;
      case 'active':
        return <span className="tag tag-lime text-[10px]">ACTIVE</span>;
      case 'launching':
        return <span className="tag text-[10px]">LAUNCHING</span>;
      case 'completed':
        return <span className="tag text-[10px]">DONE</span>;
      default:
        return null;
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="section-container relative py-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-lime-neon text-sm font-semibold tracking-wider uppercase mb-4 block opacity-0">
            Selected Work
          </span>
          <h2 className="heading-lg mb-6 opacity-0">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto opacity-0">
            From Shopify stores to AI-powered tools. A selection from my 70+ completed projects.
          </p>
        </div>

        {/* Category Filter */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-0 ${
                activeCategory === category
                  ? 'bg-lime-neon text-gray-darker shadow-lime-glow'
                  : 'bg-gray-dark text-gray-brand hover:bg-gray-dark/80 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={activeCategory}>
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card glass-card overflow-hidden group cursor-pointer
                         hover:shadow-lime-glow transition-all duration-300
                         ${project.featured ? 'ring-1 ring-lime-neon/20' : ''}`}
            >
              {/* Project Image/Preview */}
              <div className="relative h-36 bg-gradient-to-br from-gray-dark to-gray-darker overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-brand/20 group-hover:text-lime-neon/40 
                                   transition-all duration-300 group-hover:scale-110">
                    {project.title.charAt(0)}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {getStatusBadge(project.status)}
                  {project.featured && (
                    <span className="tag tag-lime text-[10px]">FEATURED</span>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-gray-darker/80 backdrop-blur-sm rounded text-xs text-lime-neon">
                    {project.category}
                  </span>
                </div>

                {/* View Button */}
                {project.link !== '#' && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full 
                                  group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs w-full text-center block py-2"
                    >
                      View Live
                    </a>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-lime-neon transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-brand text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.metrics.map((metric) => (
                    <span key={metric} className="px-2 py-1 bg-lime-neon/10 text-lime-neon text-xs rounded">
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs text-gray-brand">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {hasMore && (
          <div className="text-center mt-10">
            <button 
              onClick={handleShowMore}
              className="btn-secondary hover:shadow-lime-glow transition-shadow"
            >
              {showAll ? 'Show Less' : `Show More (${filteredProjects.length - 6}+ more)`}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-brand/10">
          <p className="text-gray-brand mb-4">
            <span className="text-lime-neon font-semibold">70+</span> projects completed across Shopify, AI, and optimization
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
