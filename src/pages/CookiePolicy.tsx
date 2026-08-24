import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useSectionData } from '../store/useCMSStore';
import { useSEO } from '../hooks/useSEO';

export function CookiePolicy() {
  useSEO(
    'cookie-policy',
    'Cookie Policy - Encotec Energy (India)',
    'Overview of cookies, statistical tracking, and privacy preference settings on Encotec Energy website.'
  );

  const { data, loading } = useSectionData<any>('cookie-policy', 'CookieContent');

  const headline = data?.headline || 'Cookie Policy';
  let contentBlocks = data?.contentBlocks || data?.content;
  if (typeof contentBlocks === 'string') {
    contentBlocks = [{ type: 'paragraph', text: contentBlocks }];
  }

  return (
    <div className="min-h-screen bg-white text-neutral-800 flex flex-col font-sans selection:bg-brand-pink selection:text-white">
      <Navigation variant="light" />

      {/* Hero / Header Section matching original website with wave design */}
      <section className="relative bg-[#e9ecef] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="text-xs md:text-sm text-neutral-500 font-medium mb-4">
            <Link to="/" className="hover:text-brand-pink transition-colors">Start</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-700">{headline}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-800 tracking-tight leading-tight">
            {headline}
          </h1>
        </div>

        {/* Bottom Decorative Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-10 md:h-16 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Area (Blog / Article Reader Layout) */}
      <main className="flex-grow py-12 md:py-16 bg-white">
        <div className="max-w-3xl lg:max-w-4xl mx-auto px-6 lg:px-8 leading-relaxed text-neutral-700 text-sm md:text-base space-y-8">
          {Array.isArray(contentBlocks) && contentBlocks.length > 0 ? (
            /* Dynamic Blog / Article Content Blocks from CMS */
            <div className="space-y-8">
              {contentBlocks.map((block: any, idx: number) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight pt-6 pb-2 border-b border-neutral-200"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={idx}
                      className="p-6 my-6 bg-neutral-50 border-l-4 border-brand-pink rounded-r-xl text-neutral-800 font-medium whitespace-pre-line shadow-sm"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === 'list' && Array.isArray(block.items)) {
                  return (
                    <ul key={idx} className="space-y-3 my-4 list-disc pl-6 text-neutral-700">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'image' && (block.image || block.url || block.text)) {
                  return (
                    <div key={idx} className="my-6 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
                      <img
                        src={block.image || block.url || block.text}
                        alt="Cookie Policy visual"
                        className="w-full h-auto object-cover max-h-[500px]"
                      />
                    </div>
                  );
                }
                return (
                  <p key={idx} className="my-3 leading-relaxed whitespace-pre-line">
                    {block.text}
                  </p>
                );
              })}
            </div>
          ) : loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
              <div className="h-4 bg-neutral-100 rounded w-full"></div>
              <div className="h-4 bg-neutral-100 rounded w-5/6"></div>
              <div className="h-4 bg-neutral-100 rounded w-4/6"></div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
