import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import img from '/src/assets/homepage/heroSectionImage.png';
import PageHeroSection from '../components/PageHeroSection';
import propertyService from '../services/propertyService';

export default function PropertiesForSaleVehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(true);

	const getVehicles = async () => {
		try {
			const response = await propertyService.getVehicles();
			setVehicles(response.data.results);
		} catch (error) {
			console.error('Failed to fetch vehicles:', error);
			setVehicles([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getVehicles();
	}, []);

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection pageSlug="properties-for-sale-vehicles" />
				<section id="vehicles" className="mx-[10px] mb-4 lg:mx-[80px]">
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
						{vehicles.map((vehicle, index) => (
							<VehicleCard key={index} vehicle={vehicle} />
						))}
					</div>
				</section>
			</main>
		</>
	);
}
