import React, { useEffect, useState } from 'react';
import aboutPageService from '../../services/aboutPageService';
import { Clock, User, HandCoins, Smartphone, Lightbulb } from 'lucide-react';
import { DarkHeader } from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import carouselImg4 from '../../assets/carousel/4.png';

const iconMap = {
  clock: Clock,
  user: User,
  handcoins: HandCoins,
  smartphone: Smartphone,
  lightbulb: Lightbulb
};

function getIconComponent(iconName) {
  if (!iconName) return Lightbulb;
  const key = iconName.toLowerCase();
  return iconMap[key] || Lightbulb;
}

function WhyChooseUs() {
  const [aboutPage, setAboutPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    aboutPageService
      .getAboutPage()
      .then((data) => {
        if (mounted) {
          setAboutPage(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError('Failed to load data. Please try again later.');
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Default fallback points if API doesn't return items
  const defaultItems = [
    {
      text: '64+ years of trusted banking',
      icon: Clock
    },
    {
      text: 'Personalized, friendly service',
      icon: User
    },
    {
      text: 'Comprehensive financial solutions',
      icon: HandCoins
    },
    {
      text: 'Seamless banking',
      icon: Smartphone
    }
  ];

  let whyChooseUsItems;
  if (
    aboutPage &&
    Array.isArray(aboutPage.why_choose_us_items) &&
    aboutPage.why_choose_us_items.length > 0
  ) {
    whyChooseUsItems = aboutPage.why_choose_us_items.map((item) => ({
      text: item.text || '',
      icon: getIconComponent(item.icon)
    }));
  } else {
    whyChooseUsItems = defaultItems;
  }

  return (
    <>
      <HeroSection
        title={aboutPage?.why_choose_us_title || 'Your Trusted Banking Partner'}
        subtitle="Why Choose 1st Valley Bank"
        description={
          aboutPage?.why_choose_us_subtitle ||
          'Experience the difference of a bank that puts your needs first, with a legacy of excellence and a commitment to your financial success.'
        }
        image={carouselImg4}
        imageAlt="Why Choose 1st Valley Bank"
        showCta={false}
        backgroundColor="from-[#E9F2EA] via-white to-green-50"
        titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
      />
      <section
        id="marketing"
        data-scroll
        className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DarkHeader
            badgeText="Why Choose Us"
            title={aboutPage?.why_choose_us_title || 'Your Trusted Banking Partner'}
            subtitle={
              aboutPage?.why_choose_us_subtitle ||
              'Experience the difference of a bank that puts your needs first, with a legacy of excellence and a commitment to your financial success.'
            }
          />
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="flex w-full shrink-0 items-center justify-center lg:w-2/5">
            <div className="flex h-72 w-72 items-center justify-center">
              <img
                src={aboutPage?.why_choose_us_image || carouselImg4}
                alt="1st Valley Bank Building"
                className="h-64 w-64 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex-1">
            {loading ? (
              <div className="py-12 text-center text-white/80">Loading...</div>
            ) : error ? (
              <div className="py-12 text-center text-red-100">{error}</div>
            ) : (
              <ul className="mb-4 flex flex-col gap-3">
                {whyChooseUsItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-white" />
                      <span className="text-base leading-relaxed font-normal text-white">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default WhyChooseUs;
