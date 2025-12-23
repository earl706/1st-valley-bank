import React, { useEffect, useState } from 'react';
import aboutPageService from '../../services/aboutPageService';
import { DarkHeader } from '../../components/Header';
import { Trophy } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import img1 from '/src/assets/carousel/1.png';

// Utility: icon mapping (matching AboutUs.jsx)
const lucideIconMap = {
  award: Trophy,
  trophy: Trophy,
  star: Trophy,
};
const getIconComponent = (iconName) => lucideIconMap[iconName] || Trophy;

/* Awards data provision:
   - Only aboutPage.awards_section_title, aboutPage.awards_section_subtitle, aboutPage.featured_awards, aboutPage.awards are used.
   - Provide fallback structure for those fields only, and simplify hook logic.
*/

// Fallback data for awards section
const FALLBACK = {
  awards_section_title: 'Awards & Recognition',
  awards_section_subtitle: 'Recognized for excellence in service and financial leadership.',
  featured_awards: [
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
  ],
  awards: [
    {
      header: 'Most Outstanding Rural Bank',
      description: 'Recognized by the Rural Bankers Association of the Philippines for exceptional service.',
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
  ],
};

export default function Awards() {
  const [awardsData, setAwardsData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    aboutPageService
      .getAboutPage()
      .then((data) => {
        if (mounted) {
          setAwardsData({
            awards_section_title: data?.awards_section_title || FALLBACK.awards_section_title,
            awards_section_subtitle: data?.awards_section_subtitle || FALLBACK.awards_section_subtitle,
            featured_awards: Array.isArray(data?.featured_awards) && data.featured_awards.length > 0
              ? data.featured_awards
              : FALLBACK.featured_awards,
            awards: Array.isArray(data?.awards) && data.awards.length > 0
              ? data.awards
              : FALLBACK.awards,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setAwardsData(FALLBACK);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeroSection
        title={awardsData.awards_section_title}
        subtitle="Recognized Excellence in Banking"
        description={awardsData.awards_section_subtitle}
        image={img1}
        imageAlt="1st Valley Bank Awards"
        showCta={false}
        backgroundColor="from-[#E9F2EA] via-white to-green-50"
        titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
      />
      <section
        id="awards"
        data-scroll
        className="relative bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-8 lg:py-12"
      >
        <div className="mx-auto max-w-5xl px-2 sm:px-4">
          <DarkHeader
            badgeText="Awards"
            title={awardsData.awards_section_title}
            subtitle={awardsData.awards_section_subtitle}
          />
          {/* Header & Trophy */}
          <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-8">
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Featured Awards */}
              <div className="flex flex-col gap-5">
                {Array.isArray(awardsData.featured_awards) && awardsData.featured_awards.length > 0 ? (
                  awardsData.featured_awards.map((award, idx) => {
                    const IconComponent = getIconComponent(award.icon || 'award');
                    return (
                      <div key={idx} className="flex items-start gap-4 p-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/80">
                          {award.icon === 'award' && award.title?.includes('A+') ? (
                            <span className="text-2xl font-bold text-[#396131]">A+</span>
                          ) : (
                            <IconComponent className="h-7 w-7 text-[#396131]" />
                          )}
                        </div>
                        <div>
                          <span className="mb-1 block text-3xl leading-tight font-bold text-white">
                            {award.title?.toUpperCase() || ''}
                          </span>
                          <p className="text-lg leading-relaxed font-normal text-white">
                            {award.description || ''}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex items-start gap-4 p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/80">
                        <span className="text-2xl font-bold text-[#396131]">A+</span>
                      </div>
                      <div>
                        <span className="mb-1 block text-3xl leading-tight font-bold text-white">
                          RATED A+
                        </span>
                        <p className="text-lg leading-relaxed font-normal text-white">
                          By PhilRatings, a BSP-recognized credit rating agency.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/80">
                        <Trophy className="h-7 w-7 text-[#396131]" />
                      </div>
                      <div>
                        <span className="mb-1 block text-3xl leading-tight font-bold text-white">
                          EAGLE AWARD FOR MICROFINANCE
                        </span>
                        <p className="text-lg leading-relaxed font-normal text-white">
                          From USAID via MABS, for expanding rural microfinance services.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Trophy Icon */}
            <div className="mb-4 flex flex-1 justify-center md:mb-0 md:justify-end">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/80 shadow-lg md:h-36 md:w-36">
                <Trophy className="h-16 w-16 text-6xl text-[#396131] md:h-28 md:w-28 md:text-8xl" />
              </div>
            </div>
          </div>
          {/* Additional Awards Grid */}
          <div className="mt-10 p-5">
            <div className="mb-6 text-center">
              <h3 className="mb-1 text-2xl leading-tight font-bold text-white">
                More Achievements
              </h3>
              <div className="mx-auto h-0.5 w-12 rounded-full bg-white/60"></div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              {(Array.isArray(awardsData.awards) ? awardsData.awards : []).map((award, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 transition-all duration-200"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white/80 transition-transform duration-200 group-hover:scale-105">
                    <Trophy className="h-6 w-6 text-[#396131]" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-lg leading-tight font-semibold text-white">
                      {award.header}
                    </span>
                    <p className="text-base leading-relaxed font-normal text-white">
                      {award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

