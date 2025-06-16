import React, { useEffect, useState } from "react";
import img1 from "/src/assets/properties-for-sale/1.jpeg";
import img2 from "/src/assets/properties-for-sale/2.jpeg";
import {
  MapPin,
  Calendar,
  Hash,
  Eye,
  Heart,
  Share2,
  Home,
  Ruler,
} from "lucide-react";
import {
  faHouseCircleCheck,
  faMoneyBillTrendUp,
  faTags,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleView = () => {
    console.log("Viewing vehicle:", vehicle.plateNumber);
    // Add your view logic here
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log("Sharing vehicle:", vehicle.plateNumber);
    // Add your share logic here
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={vehicle.image}
          alt={`${vehicle.year} Vehicle`}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-lg font-bold">
              ₱{vehicle.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Vehicle Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MapPin size={16} className="text-blue-600" />
            </div>
            <span className="font-medium">{vehicle.location}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-green-50 rounded-lg">
              <Calendar size={16} className="text-green-600" />
            </div>
            <span className="font-medium">{vehicle.year}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Hash size={16} className="text-purple-600" />
            </div>
            <span className="font-medium font-mono">{vehicle.plateNumber}</span>
          </div>
        </div>

        {/* Action Button */}
        <NavLink
          to=""
          onClick={handleView}
          className="w-full bg-gradient-to-r from-emerald-900 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-900 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Eye
            size={18}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          View Details
        </NavLink>
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleView = () => {
    console.log("Viewing property:", property.propertyCode);
    // Add your view logic here
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log("Sharing property:", property.propertyCode);
    // Add your share logic here
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={property.image}
          alt={`Property ${property.propertyCode}`}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isLiked
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/80 text-gray-700 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart size={16} className={isLiked ? "fill-current" : ""} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-lg font-bold">
              ${property.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Property Code Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-mono">
            #{property.propertyCode}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Property Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <MapPin size={16} className="text-emerald-600" />
            </div>
            <span className="font-medium">{property.location}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar size={16} className="text-blue-600" />
            </div>
            <span className="font-medium">{formatDate(property.date)}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Home size={16} className="text-orange-600" />
            </div>
            <span className="font-medium">{property.number}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Ruler size={16} className="text-purple-600" />
            </div>
            <span className="font-medium">
              {property.area.toLocaleString()} sq ft
            </span>
          </div>
        </div>

        {/* Action Button */}
        <NavLink
          onClick={handleView}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Eye
            size={18}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          View Property
        </NavLink>
      </div>
    </div>
  );
};

export default function PropertiesForSale() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sampleVehicles = [
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
  ];

  const sampleProperties = [
    {
      image: img2,
      location: "Residential Land, Napoloan Pagadian City, Zamboanga del Sur",
      date: "2018-12-4",
      number: "TCT#1372020004737 / TCT#1372020004738",
      price: 1950000.0,
      area: 1262,
      propertyCode: "K05-03",
    },
    {
      image: img2,
      location: "Residential Land, Napoloan Pagadian City, Zamboanga del Sur",
      date: "2018-12-4",
      number: "TCT#1372020004737 / TCT#1372020004738",
      price: 1950000.0,
      area: 1262,
      propertyCode: "K05-03",
    },
    {
      image: img2,
      location: "Residential Land, Napoloan Pagadian City, Zamboanga del Sur",
      date: "2018-12-4",
      number: "TCT#1372020004737 / TCT#1372020004738",
      price: 1950000.0,
      area: 1262,
      propertyCode: "K05-03",
    },
    {
      image: img2,
      location: "Residential Land, Napoloan Pagadian City, Zamboanga del Sur",
      date: "2018-12-4",
      number: "TCT#1372020004737 / TCT#1372020004738",
      price: 1950000.0,
      area: 1262,
      propertyCode: "K05-03",
    },
    {
      image: img2,
      location: "Residential Land, Napoloan Pagadian City, Zamboanga del Sur",
      date: "2018-12-4",
      number: "TCT#1372020004737 / TCT#1372020004738",
      price: 1950000.0,
      area: 1262,
      propertyCode: "K05-03",
    },
    {
      image: img2,
      location: "Residential Land, Napoloan Pagadian City, Zamboanga del Sur",
      date: "2018-12-4",
      number: "TCT#1372020004737 / TCT#1372020004738",
      price: 1950000.0,
      area: 1262,
      propertyCode: "K05-03",
    },
  ];

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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <main className="hidden lg:flex flex-col gap-[120px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px]"
        >
          <div className="flex flex-col gap-[20px] py-[80px] px-[60px] mx-[10px] w-3/5">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[4rem]/[4rem] font-bold">
                Properties for Sale
              </span>
              <span className="text-[1.5rem]/[1.5rem] font-bold">
                Turn opportunities into assets with our featured listings
              </span>
            </div>
            <span className="text-[1rem]/[2rem]">
              Discover 1st Valley Bank’s Properties for Sale—a curated list of
              real estate, vehicles, and other acquired assets available at
              affordable prices. Whether you're starting fresh or growing your
              portfolio, we offer great deals with flexible terms. Don’t miss
              out—explore our listings and find your next opportunity today!
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faTags}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section
          id="vehicles"
          className="flex flex-col text-[#396131] mx-[80px] gap-[70px]"
        >
          <div className="flex justify-center gap-[40px]">
            <div className="flex justify-center w-1/4">
              {" "}
              <FontAwesomeIcon
                icon={faTruck}
                className="flex aspect-square"
                style={{ width: "250px", height: "250px" }}
              />
            </div>
            <div className="flex flex-col justify-start gap-[10px] w-3/4">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[3rem]/[3rem] font-bold">Vehicles</span>
                <span className="text-[1.5rem]/[3rem] font-bold">
                  Looking for great deals on wheels?
                </span>
              </div>

              <span className="text-[1rem]/[3rem]">
                1st Valley Bank offers quality pre-owned vehicles at affordable
                prices through our Properties for Sale – Vehicles program!
                Whether for personal or business use, drive home your dream car
                with flexible payment options and trusted service. Don’t miss
                your chance to own for less—check out our listings today!
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleVehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))}
          </div>
          <NavLink
            to="/properties-for-sale/vehicles"
            className="w-full bg-gradient-to-r from-emerald-900 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-900 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Eye
              size={18}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            See More
          </NavLink>
        </section>
        <section
          id="properties"
          className="flex flex-col text-[#396131] mx-[80px] gap-[70px]"
        >
          <div className="flex justify-center gap-[40px]">
            <div className="flex flex-col justify-start gap-[10px] w-3/4">
              <div className="flex flex-col gap-[20px]">
                <span className="text-[3rem]/[3rem] font-bold">
                  Real Estate and Other Properties Acquired for Sale
                </span>
                <span className="text-[1.5rem]/[3rem] font-bold">
                  Ready to invest in your future?
                </span>
              </div>

              <span className="text-[1rem]/[3rem]">
                Explore 1st Valley Bank’s Properties for Sale—featuring real
                estate and other acquired assets at great value! From
                residential lots to commercial spaces and more, find the perfect
                property that fits your needs and budget. With affordable terms
                and trusted service, your next big opportunity starts here!
              </span>
            </div>
            <div className="flex justify-center w-1/4">
              {" "}
              <FontAwesomeIcon
                icon={faHouseCircleCheck}
                className="flex aspect-square"
                style={{ width: "250px", height: "250px" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProperties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
          <NavLink
            to="/properties-for-sale/real-estate-and-other-properties-acquired-for-sale"
            className="w-full bg-gradient-to-r from-emerald-900 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-900 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Eye
              size={18}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            See More
          </NavLink>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
