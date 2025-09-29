import React, { useEffect, useState } from 'react';
import img1 from '/src/assets/properties-for-sale/1.jpeg';
import img2 from '/src/assets/properties-for-sale/2.jpeg';
import { MapPin, Calendar, Hash, Eye, Heart, Share2, Home, Ruler } from 'lucide-react';
import {
	faHouseCircleCheck,
	faMoneyBillTrendUp,
	faTags,
	faTruck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import img from '/src/assets/homepage/heroSectionImage.png';
import HeroSection from '../components/HeroSection';

export default function PropertiesForSaleRealEstate() {
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

	return (
		<>
			<main className="flex flex-col gap-[120px] pb-[50px]">
				<HeroSection
					title="Properties for Sale"
					subtitle="Real Estate and Other Properties Acquired for Sale"
					description="Discover great-value real estate and properties for sale at 1st Valley Bank. Find your ideal lot, home, or space—affordable, trusted, and ready for you!"
					image={img}
					imageAlt="Properties for Sale"
					showCta={false}
					className="mx-[10px] rounded-[8px] drop-shadow-lg"
					backgroundColor="from-white via-white to-green-50"
					titleColor="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
				>
					{/* Optionally, you could pass a custom icon as image if HeroSection supports it */}
				</HeroSection>
				<section id="vehicles" className="mx-[10px] lg:mx-[80px]">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{sampleProperties.map((property, index) => (
							<PropertyCard key={index} property={property} />
						))}
					</div>
				</section>
			</main>
		</>
	);
}
