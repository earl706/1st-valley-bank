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
import PropertyCard from "../components/PropertyCard";

export default function PropertiesForSaleRealEstate() {
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
                Real Estate and Other Properties Acquired for Sale
              </span>
            </div>
            <span className="text-[1rem]/[2rem]">
              Explore 1st Valley Bank’s Properties for Sale—featuring real
              estate and other acquired assets at great value! From residential
              lots to commercial spaces and more, find the perfect property that
              fits your needs and budget. With affordable terms and trusted
              service, your next big opportunity starts here!
            </span>
          </div>
          <div className="flex items-center justify-center w-2/5">
            <FontAwesomeIcon
              icon={faHouseCircleCheck}
              className="flex aspect-square"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
        </section>
        <section id="vehicles" className="mx-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProperties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </section>
      </main>
      <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main>
    </>
  );
}
