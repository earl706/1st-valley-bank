import React, { useEffect, useState } from 'react';
import aboutPageService from '../../services/aboutPageService';
import { DarkHeader } from '../../components/Header';
import { Trophy, FileText, X } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import img1 from '/src/assets/carousel/1.png';

// Utility: icon mapping (matching AboutUs.jsx)
const lucideIconMap = {
  award: Trophy,
  trophy: Trophy,
  star: Trophy,
};
const getIconComponent = (iconName) => lucideIconMap[iconName] || Trophy;

const PDFModal = ({ open, onClose, pdfUrl }) => {
  if (!open) return null;
  return (
    <div className="bg-opacity-60 fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-7xl overflow-hidden rounded-lg bg-white shadow-xl">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-800 hover:text-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="p-6 pt-12">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-[#396131]">
            <FileText className="h-6 w-6 text-rose-700" />
            Report PDF Preview
          </h2>
          {pdfUrl ? (
            <iframe
              title="Annual Report PDF"
              src={pdfUrl}
              className="h-[60vh] w-full rounded border-0"
            ></iframe>
          ) : (
            <div className="text-gray-700">PDF not available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Awards() {
  const [aboutPage, setAboutPage] = useState(null);
  const [aboutPageLoading, setAboutPageLoading] = useState(true);
  const [aboutPageError, setAboutPageError] = useState(null);

  // For annual report modal (PDF)
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    let mounted = true;
    setAboutPageLoading(true);
    aboutPageService
      .getAboutPage()
      .then((data) => {
        if (mounted) {
          setAboutPage(data);
          setAboutPageLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setAboutPageError(
            err?.message || 'Failed to load about page data. Please try again later.'
          );
          setAboutPageLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Fallback awards data
  const fallbackFeaturedAwards = [
    {
      title: 'Rated A+',
      description: 'By PhilRatings, a BSP-recognized credit rating agency.',
      icon: 'award',
    },
    {
      title: 'Eagle Award for Microfinance',
      description: 'From USAID via MABS, for expanding rural microfinance services.',
      icon: 'trophy',
    },
  ];
  const fallbackAwards = [
    {
      header: 'Most Outstanding Rural Bank',
      description:
        'Recognized by the Rural Bankers Association of the Philippines for exceptional service.',
    },
    {
      header: 'Top Rural Bank in Microfinance',
      description: 'Awarded at the Visayas and Mindanao Microfinance Conference.',
    },
    {
      header: 'Best Customer Service',
      description: 'Awarded by Mindanao Economic Development Council.',
    },
    {
      header: 'Digital Banking Innovator',
      description: 'Recognized for leadership in digital rural banking solutions.',
    },
  ];

  // Fallback annual reports (for illustration only)
  const fallbackAnnualReports = [];

  // Render
  return (
    <>
      <HeroSection
        title={aboutPage?.awards_section_title || 'Awards & Recognition'}
        subtitle="Recognized Excellence in Banking"
        description={
          aboutPage?.awards_section_subtitle ||
          'Recognized for excellence in service and financial leadership.'
        }
        image={img1}
        imageAlt="1st Valley Bank Awards"
        showCta={false}
        backgroundColor="from-[#E9F2EA] via-white to-green-50"
        titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
      />
    <div className="min-h-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-10">
      <div className="mx-auto max-w-5xl px-2 sm:px-4">
        <DarkHeader
          badgeText="Awards"
          title={aboutPage?.awards_section_title || 'Awards & Recognition'}
          subtitle={
            aboutPage?.awards_section_subtitle ||
            'Recognized for excellence in service and financial leadership.'
          }
        />

        {/* Loader or error */}
        {aboutPageLoading ? (
          <div className="my-16 flex flex-col items-center text-white/80">
            <Trophy className="mb-3 h-12 w-12 animate-spin" />
            <p>Loading awards...</p>
          </div>
        ) : aboutPageError ? (
          <div className="my-12 rounded-lg bg-red-100 p-4 text-center text-red-700">
            {aboutPageError}
          </div>
        ) : (
          <div>
            {/* Featured Awards Section */}
            <div className="flex flex-col gap-4">
              {(aboutPage?.featured_awards?.length
                ? aboutPage.featured_awards
                : fallbackFeaturedAwards
              ).map((award, idx) => {
                const IconComponent = getIconComponent(award.icon || 'award');
                return (
                  <div key={idx} className="flex items-start gap-3 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/80">
                      {award.icon === 'award' && award.title?.includes('A+') ? (
                        <span className="text-xl font-bold text-[#396131]">A+</span>
                      ) : (
                        <IconComponent className="h-6 w-6 text-[#396131]" />
                      )}
                    </div>
                    <div>
                      <span className="mb-1 block text-2xl leading-tight font-bold text-white">
                        {award.title?.toUpperCase() || ''}
                      </span>
                      <p className="text-base leading-relaxed font-normal text-white">
                        {award.description || ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trophy Icon */}
            <div className="mb-8 mt-8 flex flex-1 justify-center md:mb-0 md:justify-end">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-lg md:h-32 md:w-32">
                <Trophy className="h-14 w-14 text-5xl text-[#396131] md:h-24 md:w-24 md:text-7xl" />
              </div>
            </div>

            {/* Additional Awards */}
            <div className="mt-8 p-4">
              <div className="mb-4 text-center">
                <h3 className="mb-1 text-xl leading-tight font-bold text-white">
                  More Achievements
                </h3>
                <div className="mx-auto h-0.5 w-10 rounded-full bg-white/60"></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {(aboutPage?.awards?.length ? aboutPage.awards : fallbackAwards).map(
                  (award, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 p-3 transition-all duration-200"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white/80 transition-transform duration-200 group-hover:scale-105">
                        <Trophy className="h-4 w-4 text-[#396131]" />
                      </div>
                      <div className="flex-1">
                        <span className="block text-base leading-tight font-semibold text-white">
                          {award.header}
                        </span>
                        <p className="text-sm leading-relaxed font-normal text-white">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* PDF Modal (future if needed for downloadable annual reports, left as placeholder) */}
        <PDFModal open={pdfModalOpen} onClose={() => setPdfModalOpen(false)} pdfUrl={pdfUrl} />
      </div>
    </div>
    </>
  );
}

