import { faTty } from "@fortawesome/free-solid-svg-icons/faTty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import ContactPageMap from "../components/ContactPageMap";
import {
  MapPin,
  User,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Map,
} from "lucide-react";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    address: {
      barangay: "",
      municipality: "",
      province: "",
    },
    contact_number: "",
    message: "",
  });

  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(false);

  const subjects = [
    "Deposits - Regular",
    "Deposits - Special",
    "Loans - Agriculture",
    "Loans - Small and Medium Enterprises (SME)",
    "Loans - Microfinance",
    "Loans - Supervised Credit (SUCRE)",
    "Loans - Gold & Gems",
    "Loans - Small Business Loan (SBL)",
    "Loans - Salary",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const fetchMapCoordinates = async () => {
    const { barangay, municipality, province } = formData.address;
    if (barangay.trim() && municipality.trim() && province.trim()) {
      const fullAddress = `${barangay}, ${municipality}, ${province}, Philippines`;
      const encodedAddress = encodeURIComponent(fullAddress);
      console.log(encodedAddress);

      try {
        setIsMapLoading(true);
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZWFybDcwNiIsImEiOiJjbTk1a3Q2dm0xMW9pMm5zZm5kb2EwcXR4In0.aoOboZNNC-ib2-1o2BAOCg&limit=1`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const coordinates = data.features[0].geometry.coordinates;
          setMapCoordinates({
            lng: coordinates[0],
            lat: coordinates[1],
            placeName: data.features[0].place_name,
          });
        } else {
          setMapCoordinates(null);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setMapCoordinates(null);
      } finally {
        setIsMapLoading(false);
      }
    } else {
      setMapCoordinates(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMapCoordinates();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Form Section */}
            <div className="p-8 lg:p-12">
              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Address
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="address.barangay"
                      value={formData.address.barangay}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Barangay"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="address.municipality"
                      value={formData.address.municipality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Municipality/City"
                      required
                    />
                    <input
                      type="text"
                      name="address.province"
                      value={formData.address.province}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Province"
                      required
                    />
                  </div>
                </div>

                {/* Contact Number Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 text-gray-400 w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#396131] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Enter your message..."
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-[#396131] hover:bg-[#2d4d26] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-50 p-8 lg:p-12 flex flex-col">
              <div className="flex items-center mb-6">
                <Map className="w-6 h-6 text-[#396131] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Location Preview
                </h3>
              </div>

              <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-inner">
                {mapCoordinates ? (
                  <ContactPageMap
                    lat={mapCoordinates.lat.toFixed(6)}
                    lon={mapCoordinates.lng.toFixed(6)}
                  />
                ) : (
                  <div className="h-full min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium mb-2">
                        Address Preview
                      </p>
                      <p className="text-gray-400 text-sm max-w-xs">
                        Fill in the address fields to see the location on the
                        map
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Address Summary */}
              {mapCoordinates && (
                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Location Found:
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {mapCoordinates.placeName}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Coordinates: {mapCoordinates.lat.toFixed(6)},{" "}
                    {mapCoordinates.lng.toFixed(6)}
                  </p>
                </div>
              )}

              {(formData.address.barangay ||
                formData.address.municipality ||
                formData.address.province) &&
                !mapCoordinates &&
                !isMapLoading && (
                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <h4 className="font-semibold text-yellow-700 mb-2">
                      Searching for location...
                    </h4>
                    <p className="text-yellow-600 text-sm">
                      {[
                        formData.address.barangay,
                        formData.address.municipality,
                        formData.address.province,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                      {formData.address.barangay &&
                        formData.address.municipality &&
                        formData.address.province &&
                        ", Philippines"}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactUs() {
  return (
    <>
      <main className="flex flex-col gap-[80px] pb-[50px]">
        <section
          id="main"
          data-scroll
          className="flex text-[#396131] bg-white drop-shadow-lg rounded-[8px] py-[80px] px-[80px] mx-[10px]"
        >
          <div className="flex flex-col gap-[20px] w-3/5">
            <span className="text-[4rem]/[4rem] font-bold">Contact Us</span>
            <span className="text-[1rem]/[2rem]">
              Got questions or need assistance? 1st Valley Bank is here for you!
              Reach out anytime via phone, email, or visit us in person. Our
              friendly team is ready to help with your banking needs, provide
              support, and guide you every step of the way. Connect with us
              today—because at 1VB, your satisfaction is our top priority!
            </span>
          </div>
          <div className="flex justify-center w-2/5">
            <FontAwesomeIcon
              icon={faTty}
              style={{ width: "50%", height: "auto" }}
            />
          </div>
        </section>
        <section id="form">
          <ContactUsForm />
        </section>
      </main>
      {/* <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main> */}
    </>
  );
}
