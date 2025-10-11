import React, { useState, useEffect } from 'react';
import img1 from '/src/assets/properties-for-sale/vehicles/1.jpeg';
import img2 from '/src/assets/properties-for-sale/vehicles/2.png';
import img3 from '/src/assets/properties-for-sale/vehicles/3.png';
import img4 from '/src/assets/properties-for-sale/vehicles/4.png';
import { MapPin, Calendar, Hash, Eye } from 'lucide-react';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VehicleCard from '../components/VehicleCard';
import img from '/src/assets/homepage/heroSectionImage.png';
import HeroSection from '../components/HeroSection';

export default function PropertiesForSaleVehicles() {
	const sampleVehicles = [
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		},
		{
			image: img1,
			additionalImages: [img1, img1, img1],
			location: 'Bacolod, Lanao Del Norte',
			year: 2017,
			plateNumber: 'JDO5067',
			price: 180000.0
		}
	];

	return (
		<>
			<main className="flex flex-col">
				<HeroSection
					title="Properties for Sale"
					subtitle="Vehicles"
					description="Find quality pre-owned vehicles at great prices from 1st Valley Bank. Browse our listings and drive home your next car today!"
					image={img}
				/>
				<section id="vehicles" className="mx-[10px] lg:mx-[80px]">
					<div className="my-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
							Vehicles
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#396131]/80"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-[#396131]/80">
							Discover a selection of quality pre-owned vehicles at affordable prices, available
							exclusively from 1st Valley Bank.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{sampleVehicles.map((vehicle, index) => (
							<VehicleCard key={index} vehicle={vehicle} />
						))}
					</div>
				</section>
			</main>
		</>
	);
}
