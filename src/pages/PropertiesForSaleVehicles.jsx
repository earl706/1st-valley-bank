import React, { useState, useEffect } from "react";
import img1 from "/src/assets/properties-for-sale/vehicles/1.jpeg";
import img2 from "/src/assets/properties-for-sale/vehicles/2.png";
import img3 from "/src/assets/properties-for-sale/vehicles/3.png";
import img4 from "/src/assets/properties-for-sale/vehicles/4.png";
import { MapPin, Calendar, Hash, Eye } from "lucide-react";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VehicleCard from "../components/VehicleCard";

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
      <main className="flex flex-col gap-[120px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex flex-col-reverse lg:flex-row p-[20px] text-[#396131] bg-white drop-shadow-lg mx-[10px] rounded-[8px]"
        >
          <div className="flex flex-col gap-[20px] lg:py-[80px] lg:px-[60px] mx-[10px] lg:w-3/5">
            <div className="flex flex-col gap-[20px]">
              <span className="text-[1.5rem]/[1.5rem] lg:text-[4rem]/[4rem] font-bold">
                Properties for Sale
              </span>
              <span className="text-[1rem]/[1rem] lg:text-[1.5rem]/[1.5rem] font-bold">
                Vehicles
              </span>
            </div>
            <span className="text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
              1st Valley Bank offers quality pre-owned vehicles at affordable
              prices through our Properties for Sale – Vehicles program! Whether
              for personal or business use, drive home your dream car with
              flexible payment options and trusted service. Don’t miss your
              chance to own for less—check out our listings today!
            </span>
          </div>
          <div className="flex items-center justify-center w-full lg:w-2/5">
            <FontAwesomeIcon
              icon={faTruck}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section id="vehicles" className="mx-[10px] lg:mx-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleVehicles.map((vehicle, index) => (
              <VehicleCard key={index} vehicle={vehicle} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
