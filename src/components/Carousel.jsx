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
    <div className="w-full p-2 sm:p-4 lg:p-6">
      {/* Main image container */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[32rem] bg-white/50 rounded-xl overflow-hidden shadow-2xl">
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-900 z-10">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
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
            className="absolute left-2 sm:left-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
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
      <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 space-x-1 sm:space-x-2 overflow-x-auto pb-2 px-2 sm:px-0">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 md:w-20 md:h-15 lg:w-24 lg:h-18 rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
    // <div className="w-full p-2">
    //   {/* Main image container */}
    //   <div className="relative w-full h-150 bg-white/50 rounded-xl overflow-hidden shadow-2xl">
    //     <div
    //       className="relative w-full h-full"
    //       onTouchStart={handleTouchStart}
    //       onTouchMove={handleTouchMove}
    //       onTouchEnd={handleTouchEnd}
    //     >
    //       {/* Loading overlay */}
    //       {isLoading && (
    //         <div className="absolute inset-0 flex items-center justify-center bg-green-900 z-10">
    //           <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
    //         </div>
    //       )}

    //       {/* Images */}
    //       <div className="relative w-full h-full">
    //         {images.map((image, index) => (
    //           <div
    //             key={index}
    //             className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
    //               index === currentIndex ? "opacity-100" : "opacity-0"
    //             }`}
    //           >
    //             <img
    //               src={image}
    //               alt={`Slide ${index + 1}`}
    //               className="w-full h-full object-contain"
    //               onLoad={index === 0 ? handleImageLoad : undefined}
    //               loading={index === 0 ? "eager" : "lazy"}
    //             />
    //           </div>
    //         ))}
    //       </div>

    //       {/* Navigation arrows */}
    //       <button
    //         onClick={goToPrevious}
    //         className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
    //         aria-label="Previous image"
    //       >
    //         <ChevronLeft className="w-6 h-6" />
    //       </button>

    //       <button
    //         onClick={goToNext}
    //         className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
    //         aria-label="Next image"
    //       >
    //         <ChevronRight className="w-6 h-6" />
    //       </button>

    //       {/* Image counter */}
    //       <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
    //         {currentIndex + 1} / {images.length}
    //       </div>
    //     </div>

    //     {/* Dot indicators */}
    //     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
    //       {images.map((_, index) => (
    //         <button
    //           key={index}
    //           onClick={() => goToSlide(index)}
    //           className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
    //             index === currentIndex
    //               ? "bg-white scale-110"
    //               : "bg-white/50 hover:bg-white/70"
    //           }`}
    //           aria-label={`Go to slide ${index + 1}`}
    //         />
    //       ))}
    //     </div>
    //   </div>

    //   {/* Thumbnail navigation */}
    //   <div className="flex justify-center mt-8 space-x-2 overflow-x-auto pb-2">
    //     {images.map((image, index) => (
    //       <button
    //         key={index}
    //         onClick={() => goToSlide(index)}
    //         className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    //           index === currentIndex
    //             ? "ring-2 ring-blue-500 opacity-100"
    //             : "opacity-60 hover:opacity-80"
    //         }`}
    //       >
    //         <img
    //           src={image}
    //           alt={`Thumbnail ${index + 1}`}
    //           className="w-full h-full object-cover"
    //           loading="lazy"
    //         />
    //       </button>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Carousel;
