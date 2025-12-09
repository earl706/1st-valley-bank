import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import img from '/src/assets/homepage/heroSectionImage.png';
import PageHeroSection from '../components/PageHeroSection';
import propertyService from '../services/propertyService';
import { ProductListingPageSkeleton } from '../components/PageSkeleton';

export default function PropertiesForSaleRealEstate() {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	const getProperties = async () => {
		try {
			const response = await propertyService.getRealEstate();
			setProperties(response.data.results);
		} catch (error) {
			console.error('Failed to fetch properties:', error);
			setProperties([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProperties();
	}, []);

	// Show skeleton on initial load
	if (loading && properties.length === 0) {
		return (
			<ProductListingPageSkeleton
				showHero={true}
				showCarousel={false}
				showProductGrid={true}
				productColumns={3}
				productRows={3}
				variant="light"
			/>
		);
	}

	return (
		<>
			<main className="flex flex-col">
				<PageHeroSection pageSlug="properties-for-sale-real-estate-and-other-properties-acquired-for-sale" />
				<section id="vehicles" className="mx-[10px] mb-4 lg:mx-[80px]">
					<div className="my-16 text-center">
						<h2 className="mb-4 text-4xl font-bold text-[#396131] md:text-5xl lg:text-6xl">
							Real Estate & Properties
						</h2>
						<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#396131] to-[#396131]/80"></div>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-[#396131]/80">
							Explore our assortment of prime real estate, residential, commercial, and foreclosed
							properties for sale, opportunities offered only by 1st Valley Bank.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{properties.map((property, index) => (
							<PropertyCard key={index} property={property} />
						))}
					</div>
				</section>
			</main>
		</>
	);
}
