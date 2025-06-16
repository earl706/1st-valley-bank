import React, { useState } from "react";
import { MapPin, Calendar, Hash, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
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
}
