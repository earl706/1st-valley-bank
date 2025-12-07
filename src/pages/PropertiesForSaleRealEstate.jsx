import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import img from '/src/assets/homepage/heroSectionImage.png';
import PageHeroSection from '../components/PageHeroSection';
import propertyService from '../services/propertyService';

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

	/*
	const sampleProperties = [
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		},
		{
			image: img2,
			additionalImages: [img2, img2, img2],
			location: 'Residential Land, Napoloan Pagadian City, Zamboanga del Sur',
			date: '2018-12-4',
			number: 'TCT#1372020004737 / TCT#1372020004738',
			price: 1950000.0,
			area: 1262,
			propertyCode: 'K05-03'
		}
	];
	*/
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
