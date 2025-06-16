import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Star,
  Zap,
  Heart,
  ArrowUp,
  Eye,
  Code,
  Palette,
  Rocket,
  Shield,
  Globe,
  Camera,
} from "lucide-react";

const Effects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState("");
  const observerRefs = useRef({});

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];

    const createObserver = (threshold = 0.1) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));

            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold, rootMargin: "-50px 0px" }
      );
    };

    const observer = createObserver();
    const elements = document.querySelectorAll("[data-scroll]");
    elements.forEach((el) => observer.observe(el));
    observers.push(observer);

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      icon: Code,
      title: "Web Development",
      desc: "Modern, responsive websites",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      desc: "Beautiful user experiences",
    },
    { icon: Rocket, title: "Performance", desc: "Lightning fast applications" },
    { icon: Shield, title: "Security", desc: "Enterprise-grade protection" },
    { icon: Globe, title: "Global Reach", desc: "Worldwide accessibility" },
    { icon: Camera, title: "Media Solutions", desc: "Visual storytelling" },
  ];

  const features = [
    {
      title: "Fade In Animation",
      description: "Elements smoothly fade in as they enter the viewport",
    },
    {
      title: "Slide Animations",
      description: "Content slides in from different directions",
    },
    {
      title: "Scale Effects",
      description: "Elements grow and shrink based on scroll position",
    },
    {
      title: "Parallax Scrolling",
      description: "Background moves at different speeds",
    },
    {
      title: "Staggered Animations",
      description: "Sequential animation of multiple elements",
    },
    {
      title: "Progress Indicators",
      description: "Visual feedback of scroll progress",
    },
  ];

  return (
    <div className="relative bg-gray-900 text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-35 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{
            width: `${
              (scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
              100
            }%`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-40 bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl p-2">
        <div className="flex flex-col gap-2">
          {["hero", "parallax", "cards", "services", "features", "gallery"].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-500 hover:bg-gray-300"
                }`}
              />
            )
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        data-scroll
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translateY(${
                  scrollY * (0.1 + Math.random() * 0.2)
                }px)`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <div
            className={`transition-all duration-1000 ${
              isVisible.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Scroll Magic
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience beautiful scrolling effects and animations built with
              React and Tailwind CSS
            </p>

            <button
              onClick={() => scrollToSection("parallax")}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Explore Effects
              <ChevronDown className="inline-block ml-2 w-5 h-5 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section
        id="parallax"
        data-scroll
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-900 to-blue-900"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 text-center px-4">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible.parallax
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">Parallax</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Background layers move at different speeds creating depth and
              dimension
            </p>
          </div>
        </div>
      </section>

      {/* Animated Cards */}
      <section id="cards" data-scroll className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible.cards
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Scroll Animations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gray-700 rounded-2xl p-6 transition-all duration-700 hover:scale-105 hover:bg-gray-600 ${
                  isVisible.cards
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isVisible.cards
                    ? "translateY(0)"
                    : `translateY(${20 + index * 10}px)`,
                }}
              >
                <Star className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        id="services"
        data-scroll
        className="py-20 px-4 bg-gradient-to-br from-purple-900 to-blue-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible.services
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`group bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                    isVisible.services
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                      ? "opacity-0 -translate-x-20"
                      : "opacity-0 translate-x-20"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" data-scroll className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible.features
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <Eye className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-8">
              Scroll-Triggered Animations
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Elements come to life as you scroll, creating an engaging and
              interactive experience that captures attention and guides users
              through your content seamlessly.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {["Fade", "Slide", "Scale", "Rotate", "Bounce", "Parallax"].map(
                (effect, index) => (
                  <span
                    key={effect}
                    className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold transition-all duration-700 hover:scale-110 ${
                      isVisible.features
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {effect}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section id="gallery" data-scroll className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-6xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible.gallery ? "opacity-100 rotate-0" : "opacity-0 rotate-3"
            }`}
          >
            Visual Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`aspect-square bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl transition-all duration-700 hover:scale-95 hover:rotate-3 ${
                  isVisible.gallery
                    ? "opacity-100 translate-y-0 rotate-0"
                    : "opacity-0 translate-y-20 rotate-6"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  background: `linear-gradient(135deg, 
                    hsl(${(index * 45) % 360}, 70%, 60%), 
                    hsl(${(index * 45 + 60) % 360}, 70%, 40%))`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 bg-black text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible.gallery
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold mb-4">Made with Love</h3>
          <p className="text-gray-400 mb-8">
            Beautiful scrolling effects for modern web experiences
          </p>

          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 group"
          >
            <ArrowUp className="inline-block mr-2 w-5 h-5 group-hover:animate-bounce" />
            Back to Top
          </button>
        </div>
      </footer>

      {/* Background Decorations */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse" />
      <div
        className="fixed bottom-20 right-10 w-48 h-48 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
};

export default Effects;
