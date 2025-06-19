// import React, { useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function Carousel() {
//   const slides = [
//     {
//       id: 1,
//       image: img1,
//     },
//     {
//       id: 2,
//       image: img2,
//     },
//     {
//       id: 3,
//       image: img3,
//     },
//     {
//       id: 4,
//       image: img4,
//     },
//     {
//       id: 5,
//       image: img5,
//     },
//     {
//       id: 6,
//       image: img6,
//     },
//     {
//       id: 7,
//       image: img7,
//     },
//     {
//       id: 8,
//       image: img8,
//     },
//     {
//       id: 9,
//       image: img9,
//     },
//     {
//       id: 10,
//       image: img10,
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   }, [slides.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   }, [slides.length]);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(nextSlide, 4000);
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, nextSlide]);

//   // Touch handlers
//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       nextSlide();
//     } else if (isRightSwipe) {
//       prevSlide();
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div
//         className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
//         onMouseEnter={() => setIsAutoPlaying(false)}
//         onMouseLeave={() => setIsAutoPlaying(true)}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {/* Slides */}
//         <div
//           className="flex h-full transition-transform duration-700 ease-out"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {slides.map((slide, index) => (
//             <div key={slide.id} className="min-w-full h-full relative">
//               <img
//                 src={slide.image}
//                 alt={""}
//                 className="w-full h-full object-contain"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 drop-shadow-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft size={24} />
//         </button>

//         <button
//           onClick={nextSlide}
//           className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
//           aria-label="Next slide"
//         >
//           <ChevronRight size={24} />
//         </button>

//         {/* Dot Indicators */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? "bg-white scale-125"
//                   : "bg-white/50 hover:bg-white/80"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
//           <div
//             className="h-full bg-white transition-all duration-300"
//             style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
//           />
//         </div>
//       </div>

//       {/* Thumbnail Navigation */}
//       <div className="flex justify-center mt-6 space-x-4 overflow-x-auto pb-2">
//         {slides.map((slide, index) => (
//           <button
//             key={slide.id}
//             onClick={() => goToSlide(index)}
//             className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
//               index === currentSlide
//                 ? "ring-4 ring-blue-500 scale-110"
//                 : "opacity-60 hover:opacity-100 hover:scale-105"
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "/src/assets/advisory/1.jpg";
import img2 from "/src/assets/advisory/2.png";
import img3 from "/src/assets/advisory/3.jpg";
import img4 from "/src/assets/advisory/4.jpeg";
import img5 from "/src/assets/advisory/5.png";
import img6 from "/src/assets/advisory/6.jpg";
import img7 from "/src/assets/advisory/7.jpg";
import img8 from "/src/assets/advisory/8.jpg";
import img9 from "/src/assets/advisory/9.jpg";
import img10 from "/src/assets/advisory/10.png";

const Carousel = () => {
  // Sample images - replace with your actual image URLs
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);

  // Auto-advance carousel
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetInterval();
  }, [images.length, resetInterval]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetInterval();
  }, [images.length, resetInterval]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex(index);
      resetInterval();
    },
    [resetInterval]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  // Image loading handler
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full p-2">
      {/* Main image container */}
      <div className="relative w-full h-150 bg-white/50 rounded-xl overflow-hidden shadow-2xl">
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Images */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain"
                  onLoad={index === 0 ? handleImageLoad : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex justify-center mt-8 space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              index === currentIndex
                ? "ring-2 ring-blue-500 opacity-100"
                : "opacity-60 hover:opacity-80"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
