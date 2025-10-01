import { faTty } from '@fortawesome/free-solid-svg-icons/faTty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import ContactPageMap from '../components/ContactPageMap';
import { MapPin, User, Mail, Phone, MessageSquare, FileText, Map } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import carouselImg1 from '/src/assets/carousel/1.png';

const ContactUsForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		address: {
			barangay: '',
			municipality: '',
			province: ''
		},
		contact_number: '',
		message: ''
	});

	const [mapCoordinates, setMapCoordinates] = useState(null);
	const [isMapLoading, setIsMapLoading] = useState(false);

	const subjects = [
		'Deposits - Regular',
		'Deposits - Special',
		'Loans - Agriculture',
		'Loans - Small and Medium Enterprises (SME)',
		'Loans - Microfinance',
		'Loans - Supervised Credit (SUCRE)',
		'Loans - Gold & Gems',
		'Loans - Small Business Loan (SBL)',
		'Loans - Salary'
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name.includes('address.')) {
			const addressField = name.split('.')[1];
			setFormData((prev) => ({
				...prev,
				address: {
					...prev.address,
					[addressField]: value
				}
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value
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
						placeName: data.features[0].place_name
					});
				} else {
					setMapCoordinates(null);
				}
			} catch (error) {
				console.error('Error fetching coordinates:', error);
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
		console.log('Form submitted:', formData);
		// Add your form submission logic here
		alert('Form submitted successfully!');
	};

	return (
		<div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
					<div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
						{/* Form Section */}
						<div className="p-8 lg:p-12">
							<div onSubmit={handleSubmit} className="space-y-6">
								{/* Name Field */}
								<div className="relative">
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Full Name
									</label>
									<div className="relative">
										<User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pr-4 pl-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your full name"
											required
										/>
									</div>
								</div>

								{/* Email Field */}
								<div className="relative">
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Email Address
									</label>
									<div className="relative">
										<Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pr-4 pl-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your email address"
											required
										/>
									</div>
								</div>

								{/* Subject Field */}
								<div className="relative">
									<label className="mb-2 block text-sm font-semibold text-gray-700">Subject</label>
									<div className="relative">
										<FileText className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
										<select
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-4 pr-4 pl-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
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
									<label className="block text-sm font-semibold text-gray-700">Address</label>

									<div className="relative">
										<MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
										<input
											type="text"
											name="address.barangay"
											value={formData.address.barangay}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pr-4 pl-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Barangay"
											required
										/>
									</div>

									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<input
											type="text"
											name="address.municipality"
											value={formData.address.municipality}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Municipality/City"
											required
										/>
										<input
											type="text"
											name="address.province"
											value={formData.address.province}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Province"
											required
										/>
									</div>
								</div>

								{/* Contact Number Field */}
								<div className="relative">
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Contact Number
									</label>
									<div className="relative">
										<Phone className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
										<input
											type="tel"
											name="contact_number"
											value={formData.contact_number}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pr-4 pl-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your contact number"
											required
										/>
									</div>
								</div>

								{/* Message Field */}
								<div className="relative">
									<label className="mb-2 block text-sm font-semibold text-gray-700">Message</label>
									<div className="relative">
										<MessageSquare className="absolute top-6 left-4 h-5 w-5 text-gray-400" />
										<textarea
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											rows={5}
											className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-4 pr-4 pl-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your message..."
											required
										/>
									</div>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									className="w-full transform cursor-pointer rounded-xl bg-[#396131] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#2d4d26] hover:shadow-xl active:scale-[0.98]"
								>
									Send Message
								</button>
							</div>
						</div>

						{/* Map Section */}
						<div className="flex flex-col bg-gray-50 p-8 lg:p-12">
							<div className="mb-6 flex items-center">
								<Map className="mr-3 h-6 w-6 text-[#396131]" />
								<h3 className="text-xl font-semibold text-gray-800">Location Preview</h3>
							</div>

							<div className="flex-1 overflow-hidden rounded-2xl bg-white shadow-inner">
								{mapCoordinates ? (
									<ContactPageMap
										lat={mapCoordinates.lat.toFixed(6)}
										lon={mapCoordinates.lng.toFixed(6)}
									/>
								) : (
									<div className="flex h-full min-h-[400px] items-center justify-center">
										<div className="text-center">
											<MapPin className="mx-auto mb-4 h-16 w-16 text-gray-300" />
											<p className="mb-2 text-lg font-medium text-gray-500">Address Preview</p>
											<p className="max-w-xs text-sm text-gray-400">
												Fill in the address fields to see the location on the map
											</p>
										</div>
									</div>
								)}
							</div>

							{/* Address Summary */}
							{mapCoordinates && (
								<div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
									<h4 className="mb-2 font-semibold text-gray-700">Location Found:</h4>
									<p className="mb-2 text-sm text-gray-600">{mapCoordinates.placeName}</p>
									<p className="text-xs text-gray-500">
										Coordinates: {mapCoordinates.lat.toFixed(6)}, {mapCoordinates.lng.toFixed(6)}
									</p>
								</div>
							)}

							{(formData.address.barangay ||
								formData.address.municipality ||
								formData.address.province) &&
								!mapCoordinates &&
								!isMapLoading && (
									<div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
										<h4 className="mb-2 font-semibold text-yellow-700">
											Searching for location...
										</h4>
										<p className="text-sm text-yellow-600">
											{[
												formData.address.barangay,
												formData.address.municipality,
												formData.address.province
											]
												.filter(Boolean)
												.join(', ')}
											{formData.address.barangay &&
												formData.address.municipality &&
												formData.address.province &&
												', Philippines'}
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
				<HeroSection
					title="Contact Us"
					subtitle=""
					description="Got questions or need assistance? 1st Valley Bank is here for you!
              Reach out anytime via phone, email, or visit us in person. Our
              friendly team is ready to help with your banking needs, provide
              support, and guide you every step of the way. Connect with us
              today—because at 1VB, your satisfaction is our top priority!"
					features={[]}
					image={carouselImg1}
					imageAlt="Contact Us"
				/>

				<section id="form">
					<ContactUsForm />
				</section>
			</main>
			{/* <main className="hidden sm:block lg:hidden">Tablet</main>
      <main className="block sm:hidden">Mobile</main> */}
		</>
	);
}
