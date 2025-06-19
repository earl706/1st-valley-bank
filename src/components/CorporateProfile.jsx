import React from "react";
import { Users, Award, Building2 } from "lucide-react";

// Mock data for demonstration
const corporateProfile = {
  senior_management: [
    { name: "Maria Santos Rodriguez", position: "VICE PRESIDENT" },
    { name: "John Michael Chen", position: "CHIEF FINANCIAL OFFICER" },
    { name: "Sarah Elizabeth Johnson", position: "CHIEF OPERATING OFFICER" },
    { name: "David Antonio Cruz", position: "EXECUTIVE DIRECTOR" },
  ],
  product_management: [
    { name: "Jennifer Marie Lopez", position: "PRODUCT MANAGER" },
    { name: "Robert James Kim", position: "AREA MANAGER - NORTH" },
    { name: "Lisa Anne Thompson", position: "AREA MANAGER - SOUTH" },
    { name: "Michael Peter Garcia", position: "REGIONAL DIRECTOR" },
  ],
};

// Mock logo placeholder
const logo =
  "data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-family='Arial' font-size='12' fill='%23374151'%3ELOGO%3C/text%3E%3C/svg%3E";

const OfficerCard = ({ officer, isPresident = false }) => (
  <div
    className={`group relative ${
      isPresident ? "col-span-full flex justify-center mb-8" : ""
    }`}
  >
    <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Avatar with gradient border */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-1">
          <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
            <img
              src={logo}
              alt={officer.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>
        {isPresident && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2">
            <Award className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Name and position */}
      <div className="text-center space-y-1">
        <h3
          className={`font-bold text-white ${
            isPresident ? "text-xl" : "text-base"
          } group-hover:text-emerald-200 transition-colors`}
        >
          {officer.name}
        </h3>
        <p
          className={`text-emerald-200/80 ${
            isPresident ? "text-base" : "text-sm"
          } font-medium tracking-wide`}
        >
          {officer.position}
        </p>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center space-y-4 mb-12">
    <div className="flex items-center justify-center space-x-3">
      <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
        <Icon className="w-6 h-6 text-emerald-200" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-emerald-200/80 text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

export default function CorporateProfile() {
  return (
    <section
      id="corporate-profile"
      className="relative min-h-screen py-20 px-6 md:px-12 lg:px-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Header */}
        <SectionHeader
          icon={Building2}
          title="Corporate Profile"
          subtitle="Meet our distinguished leadership team driving innovation and excellence"
        />

        {/* President Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Award className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-semibold text-emerald-200 tracking-wide">
              EXECUTIVE LEADERSHIP
            </h3>
          </div>

          <div className="flex justify-center">
            <OfficerCard
              officer={{ name: "Atty. Nicolas J. Lim", position: "PRESIDENT" }}
              isPresident={true}
            />
          </div>
        </div>

        {/* Senior Management */}
        <div className="mb-20">
          <div className="flex items-center justify-center space-x-2 mb-12">
            <Users className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-semibold text-emerald-200 tracking-wide">
              SENIOR MANAGEMENT
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateProfile.senior_management.map((officer, index) => (
              <OfficerCard key={index} officer={officer} />
            ))}
          </div>
        </div>

        {/* Product & Area Management */}
        <div>
          <div className="flex items-center justify-center space-x-2 mb-12">
            <Building2 className="w-5 h-5 text-emerald-300" />
            <h3 className="text-xl font-semibold text-emerald-200 tracking-wide">
              PRODUCT & AREA MANAGEMENT
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateProfile.product_management.map((officer, index) => (
              <OfficerCard key={index} officer={officer} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-900 to-transparent pointer-events-none" />
    </section>
  );
}
