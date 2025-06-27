import { faLetterboxd } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, ArrowRight, Eye, Clock } from "lucide-react";
import img1 from "/src/assets/newsletter/1.jpg";
import img2 from "/src/assets/newsletter/2.jpg";
import img3 from "/src/assets/newsletter/3.jpg";
import img4 from "/src/assets/newsletter/4.jpg";
import img5 from "/src/assets/newsletter/5.jpg";
import img6 from "/src/assets/newsletter/6.jpg";
import React from "react";

const NewsletterGrid = () => {
  const newsletters = [
    {
      id: 1,
      title: "Grow Your Business with 1VB SME Loans",
      header: "Unlock Growth Potential with Flexible Financing",
      opening_paragraph:
        "At 1st Valley Bank, we understand the challenges small and medium enterprises face. That’s why our SME loans offer competitive rates, flexible terms, and fast approvals to help you expand your business, upgrade equipment, or boost working capital. Discover how we can support your entrepreneurial journey today!",
      datetime: "June 19, 2025",
      see_full_article_button: "Read Full Article",
      image: img1,
      views: "3.2k",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Secure Your Future with 1VB Deposit Products",
      header: "Safe and Rewarding Savings Solutions",
      opening_paragraph:
        "Building your financial future starts with the right savings plan. 1st Valley Bank offers a range of deposit products designed to keep your money safe while helping it grow. Whether you’re saving for education, emergencies, or investments, our trusted deposit accounts provide security and convenience you can rely on.",
      datetime: "June 19, 2025",
      see_full_article_button: "Read Full Article",
      image: img2,
      views: "3.2k",
      readTime: "5 min",
    },
    {
      id: 3,
      title: "How 1VB’s Agriculture Loans Empower Farmers",
      header: "Funding Growth for Filipino Farmers",
      opening_paragraph:
        "Agriculture is the backbone of our nation, and 1st Valley Bank is proud to support farmers with tailored loan programs. Our agriculture loans provide flexible funds for seeds, equipment, and more, plus expert guidance to boost productivity and income. Learn how our lending solutions can help cultivate your success",
      datetime: "June 19, 2025",
      see_full_article_button: "Read Full Article",
      image: img3,
      views: "3.2k",
      readTime: "5 min",
    },
    {
      id: 4,
      title: "1VB’s Commitment to Consumer Protection",
      header: "Transparent, Fair, and Secure Banking",
      opening_paragraph:
        "At 1st Valley Bank, protecting our customers is a top priority. We are committed to transparent practices, safeguarding your privacy, and ensuring fair treatment across all products and services. Read on to learn about our latest consumer protection policies and how we keep your banking experience safe and worry-free",
      datetime: "June 19, 2025",
      see_full_article_button: "Read Full Article",
      image: img4,
      views: "3.2k",
      readTime: "5 min",
    },
    {
      id: 5,
      title: "Discover the Benefits of 1VB’s Salary Loans",
      header: "Quick Access to Funds When You Need Them Most",
      opening_paragraph:
        "Need cash for unexpected expenses or special occasions? Our Salary Loans offer fast, hassle-free access to funds directly deducted from your paycheck. With competitive rates and flexible terms, 1VB makes borrowing easy, so you can focus on what matters most without financial stress",
      datetime: "June 19, 2025",
      see_full_article_button: "Read Full Article",
      image: img5,
      views: "3.2k",
      readTime: "5 min",
    },
    {
      id: 6,
      title: "Maximize Your Wealth with 1VB Advisory Services",
      header: "Personalized Financial Guidance You Can Trust",
      opening_paragraph:
        "Financial success starts with smart decisions. At 1st Valley Bank, our Advisory team provides expert guidance tailored to your goals—whether it’s investment planning, loan management, or wealth growth. Discover how our trusted advisors can help you navigate your financial future with confidence",
      datetime: "June 19, 2025",
      see_full_article_button: "Read Full Article",
      image: img6,
      views: "3.2k",
      readTime: "5 min",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Latest Newsletter Issues
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay updated with our curated collection of insights, trends, and
            innovations across various industries.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-200 hover:shadow-2xl border border-slate-200/50 group flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={newsletter.image}
                  alt={newsletter.header}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <span className="text-[#396131] font-semibold text-xs tracking-wide uppercase">
                      {newsletter.title}
                    </span>
                  </div>
                </div>

                {/* Date Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-[#396131]/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center gap-1 text-white">
                      <Calendar size={12} />
                      <time className="text-xs font-medium">
                        {new Date(newsletter.datetime).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </time>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex flex-col flex-grow">
                  {/* Header */}
                  <h2 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-[#396131] transition-colors duration-200">
                    {newsletter.header}
                  </h2>

                  {/* Opening Paragraph */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {newsletter.opening_paragraph}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-slate-500 text-xs mb-6 mt-auto">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{newsletter.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{newsletter.readTime} read</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-[#396131] cursor-pointer hover:bg-[#2d4d26] text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn mt-4">
                  <span className="text-sm">
                    {newsletter.see_full_article_button}
                  </span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="bg-white text-[#396131] border-2 border-[#396131] hover:bg-[#396131] hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Newsletter() {
  return (
    <>
      <main className="flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex flex-col-reverse lg:flex-row text-[#396131] bg-white drop-shadow-lg rounded-[8px] p-[20px] lg:py-[60px] lg:px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[20px] lg:w-3/5">
            <span className="text-[2rem]/[4rem] lg:text-[4rem]/[4rem] font-bold">
              1VB Newsletter
            </span>
            <span className="text-[0.8rem]/[2.4rem] lg:text-[1rem]/[2rem]">
              Navigate your financial journey with confidence through 1VB
              Advisory! Our expert team is here to guide you with personalized
              advice, smart strategies, and tailored solutions. Whether planning
              investments, managing loans, or growing your wealth, 1VB Advisory
              empowers you to make informed decisions and secure a brighter
              financial future. Your success, our mission!
            </span>
          </div>
          <div className="flex justify-center items-center lg:w-2/5">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-[10rem] lg:text-[15rem]"
            />
          </div>
        </section>
        <section>
          <NewsletterGrid />
        </section>
      </main>
    </>
  );
}
