import React, { useState, useEffect } from "react";
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
import { NavLink } from "react-router-dom";

export default function PropertyCard({ property }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleView = () => {
    console.log("Viewing property:", property.propertyCode);
    // Add your view logic here
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
          className="w-full bg-gradient-to-r from-emerald-900 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-900 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
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
}
