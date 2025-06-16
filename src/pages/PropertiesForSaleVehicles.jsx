import React, { useState, useEffect } from "react";
import img1 from "/src/assets/properties-for-sale/vehicles/1.jpeg";
import img2 from "/src/assets/properties-for-sale/vehicles/2.png";
import img3 from "/src/assets/properties-for-sale/vehicles/3.png";
import img4 from "/src/assets/properties-for-sale/vehicles/4.png";
import { MapPin, Calendar, Hash, Eye } from "lucide-react";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleView = () => {
    console.log("Viewing vehicle:", vehicle.plateNumber);
    // Add your view logic here
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

export default function PropertiesForSaleVehicles() {
  const sampleVehicles = [
    {
      image: img1,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img2,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img3,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img4,
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
      image: img2,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img3,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
    {
      image: img4,
      location: "Bacolod, Lanao Del Norte",
      year: 2017,
      plateNumber: "JDO5067",
      price: 180000.0,
    },
  ];

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
              <span className="text-[1.5rem]/[1.5rem] font-bold">Vehicles</span>
            </div>
            <span className="text-[1rem]/[2rem]">
              1st Valley Bank offers quality pre-owned vehicles at affordable
              prices through our Properties for Sale – Vehicles program! Whether
              for personal or business use, drive home your dream car with
              flexible payment options and trusted service. Don’t miss your
              chance to own for less—check out our listings today!
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faTruck}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section id="vehicles" className="mx-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleVehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))}
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
