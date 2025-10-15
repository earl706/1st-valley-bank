import { faTty } from '@fortawesome/free-solid-svg-icons/faTty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import ContactPageMap from '../components/ContactPageMap';
import { MapPin, User, Mail, Phone, MessageSquare, FileText, Map, ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import { DarkHeader } from '../components/Header';
import { contactService } from '../services/index';

const ContactUsForm = () => {
	const initialFormData = {
		name: '',
		email: '',
		subject: 'general',
		contact_number: '',
		barangay: '',
		municipality: '',
		province: '',
		message: ''
	};

	const [formData, setFormData] = useState(initialFormData);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const [mapCoordinates, setMapCoordinates] = useState(null);
	const [isMapLoading, setIsMapLoading] = useState(false);

	const subjects = [
		{ display: 'General Inquiry', value: 'general' },
		{ display: 'Deposits - Regular', value: 'deposits_regular' },
		{ display: 'Deposits - Special', value: 'deposits_special' },
		{ display: 'Loans - Agriculture', value: 'loans_agriculture' },
		{ display: 'Loans - Small and Medium Enterprises (SME)', value: 'loans_sme' },
		{ display: 'Loans - Microfinance', value: 'loans_microfinance' },
		{ display: 'Loans - Supervised Credit (SUCRE)', value: 'loans_sucre' },
		{ display: 'Loans - Gold & Gems', value: 'loans_gold_gems' },
		{ display: 'Loans - Small Business Loan (SBL)', value: 'loans_sbl' },
		{ display: 'Loans - Salary', value: 'loans_salary' }
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// Fix: Support flat fields and nested address fields
		if (name.startsWith('address.')) {
			const field = name.replace('address.', '');
			setFormData((prev) => ({
				...prev,
				[field]: value
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value
			}));
		}
	};

	const fetchMapCoordinates = async () => {
		const { barangay, municipality, province } = formData;
		if (barangay.trim() && municipality.trim() && province.trim()) {
			const fullAddress = `${barangay}, ${municipality}, ${province}, Philippines`;
			const encodedAddress = encodeURIComponent(fullAddress);

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
	}, [formData.barangay, formData.municipality, formData.province]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prepare the payload as required (flat format)
		const payload = {
			name: formData.name,
			email: formData.email,
			subject: formData.subject,
			contact_number: formData.contact_number,
			barangay: formData.barangay,
			municipality: formData.municipality,
			province: formData.province,
			message: formData.message
		};

		try {
			setIsSubmitting(true);
			const response = await contactService.submitContact(payload);
			console.log('Form submitted:', response);
			if (response.success) {
				setSubmitSuccess(true);
				setSubmitError(null);
			} else {
				setSubmitError(response.error);
				setSubmitSuccess(false);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitError(error);
			setSubmitSuccess(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<DarkHeader
					badgeText="Contact Us"
					title="Send Us a Message"
					subtitle="Questions? Contact 1st Valley Bank anytime. By phone, email, or in person. We're here to help!"
					alignment="center"
					level={2}
					className="mb-16"
				/>
				<div className="overflow-hidden rounded-3xl bg-white/90 shadow-2xl">
					<div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
						{/* Form Section */}
						<div className="p-8 lg:p-12">
							{submitError && (
								<div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
									{submitError}
								</div>
							)}
							{isSubmitting && (
								<div className="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700">
									Submitting...
								</div>
							)}
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Name Field */}
								<div className="relative">
									<label className="mb-2 block text-base leading-tight font-bold text-[#396131]">
										Full Name
									</label>
									<div className="relative">
										<User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-[#4a7c3a]" />
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-white/60 py-4 pr-4 pl-12 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your full name"
											required
										/>
									</div>
								</div>

								{/* Email Field */}
								<div className="relative">
									<label className="mb-2 block text-base leading-tight font-bold text-[#396131]">
										Email Address
									</label>
									<div className="relative">
										<Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-[#4a7c3a]" />
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-white/60 py-4 pr-4 pl-12 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your email address"
											required
										/>
									</div>
								</div>

								{/* Subject Field */}
								<div className="relative">
									<label className="mb-2 block text-base leading-tight font-bold text-[#396131]">
										Subject
									</label>
									<div className="relative">
										<FileText className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-[#4a7c3a]" />
										<select
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											className="w-full appearance-none rounded-xl border border-gray-200 bg-white/60 py-4 pr-4 pl-12 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											required
										>
											<option value="">Select a subject</option>
											{subjects.map((subjectItem) => (
												<option key={subjectItem.value} value={subjectItem.value}>
													{subjectItem.display}
												</option>
											))}
										</select>
									</div>
								</div>

								{/* Address Fields */}
								<div className="space-y-4">
									<label className="block text-base leading-tight font-bold text-[#396131]">
										Address
									</label>
									<div className="relative">
										<MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-[#4a7c3a]" />
										<input
											type="text"
											name="address.barangay"
											value={formData.barangay}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-white/60 py-4 pr-4 pl-12 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Barangay"
											required
										/>
									</div>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<input
											type="text"
											name="address.municipality"
											value={formData.municipality}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-white/60 px-4 py-4 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Municipality/City"
											required
										/>
										<input
											type="text"
											name="address.province"
											value={formData.province}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-white/60 px-4 py-4 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Province"
											required
										/>
									</div>
								</div>

								{/* Contact Number Field */}
								<div className="relative">
									<label className="mb-2 block text-base leading-tight font-bold text-[#396131]">
										Contact Number
									</label>
									<div className="relative">
										<Phone className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-[#4a7c3a]" />
										<input
											type="tel"
											name="contact_number"
											value={formData.contact_number}
											onChange={handleInputChange}
											className="w-full rounded-xl border border-gray-200 bg-white/60 py-4 pr-4 pl-12 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your contact number"
											required
										/>
									</div>
								</div>

								{/* Message Field */}
								<div className="relative">
									<label className="mb-2 block text-base leading-tight font-bold text-[#396131]">
										Message
									</label>
									<div className="relative">
										<MessageSquare className="absolute top-6 left-4 h-5 w-5 text-[#4a7c3a]" />
										<textarea
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											rows={5}
											className="w-full resize-none rounded-xl border border-gray-200 bg-white/60 py-4 pr-4 pl-12 text-base leading-relaxed font-normal text-[#2c4125] placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-[#396131]"
											placeholder="Enter your message..."
											required
										/>
									</div>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									className="group inline-flex w-full transform cursor-pointer items-center justify-center rounded-xl bg-[#396131] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
								>
									<span className="flex items-center">
										Send Message
										<ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
									</span>
								</button>
							</form>
							{submitSuccess && (
								<div className="mt-4 flex items-center gap-2 rounded-lg border border-green-300 bg-green-100 p-5 text-base font-bold text-green-800 shadow-md">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-green-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>Success</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<span>
										Success! Your form has been{' '}
										<span className="underline underline-offset-2">submitted</span>.<br />
										We appreciate you reaching out to us.
									</span>
								</div>
							)}
						</div>

						{/* Map Section */}
						<div className="flex flex-col bg-gradient-to-r from-[#396131]/70 to-[#4a7c3a]/70 p-8 lg:p-12">
							<div className="mb-6 flex items-center">
								<Map className="mr-3 h-6 w-6 text-white" />
								<h3 className="text-2xl leading-tight font-bold text-white">Location Preview</h3>
							</div>

							<div className="flex-1 overflow-hidden rounded-2xl bg-white/95 shadow-inner">
								{mapCoordinates ? (
									<ContactPageMap
										lat={mapCoordinates.lat.toFixed(6)}
										lon={mapCoordinates.lng.toFixed(6)}
									/>
								) : (
									<div className="flex h-full min-h-[400px] items-center justify-center">
										<div className="text-center">
											<MapPin className="mx-auto mb-4 h-16 w-16 text-gray-300" />
											<p className="mb-2 text-xl leading-tight font-bold text-gray-500">
												Address Preview
											</p>
											<p className="max-w-xs text-base leading-relaxed font-normal text-gray-400">
												Fill in the address fields to see the location on the map
											</p>
										</div>
									</div>
								)}
							</div>

							{/* Address Summary */}
							{mapCoordinates && (
								<div className="mt-6 rounded-xl border border-gray-200 bg-white/90 p-4">
									<h4 className="mb-2 text-xl leading-tight font-bold text-[#396131]">
										Location Found:
									</h4>
									<p className="mb-2 text-base leading-relaxed font-normal text-[#396131]">
										{mapCoordinates.placeName}
									</p>
									<p className="text-xs leading-relaxed font-normal text-[#4a7c3a]">
										Coordinates: {mapCoordinates.lat.toFixed(6)}, {mapCoordinates.lng.toFixed(6)}
									</p>
								</div>
							)}

							{(formData.barangay || formData.municipality || formData.province) &&
								!mapCoordinates &&
								!isMapLoading && (
									<div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
										<h4 className="mb-2 text-xl leading-tight font-bold text-yellow-700">
											Searching for location...
										</h4>
										<p className="text-base leading-relaxed font-normal text-yellow-600">
											{[formData.barangay, formData.municipality, formData.province]
												.filter(Boolean)
												.join(', ')}
											{formData.barangay &&
												formData.municipality &&
												formData.province &&
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
			<main className="flex flex-col">
				<HeroSection
					title="Contact Us"
					subtitle=""
					description="Questions? Contact 1st Valley Bank anytime. By phone, email, or in person. We're here to help!"
					features={[]}
					image={carouselImg1}
					imageAlt="Contact Us"
				/>

				<section id="form">
					<ContactUsForm />
				</section>
			</main>
		</>
	);
}
