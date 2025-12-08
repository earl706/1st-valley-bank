import React, { useState, useEffect } from 'react';
import CarouselSection from '../components/CarouselSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import RequirementsSection from '../components/RequirementsSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';
import loanService from '../services/loanService';
import successStoriesService from '../services/successStoriesService';
import PageHeroSection from '../components/PageHeroSection';

export default function LoansSalary() {
	const [salaryLoanTypes, setSalaryLoanTypes] = useState([]);
	const [successStories, setSuccessStories] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSalaryLoanTypes = async () => {
		try {
			const response = await loanService.getByType('salary');
			console.log(response.results[0]);
			setSalaryLoanTypes(response.results);
		} catch (error) {
			setSalaryLoanTypes([]);
		} finally {
			setLoading(false);
		}
	};

	const getSuccessStories = async () => {
		try {
			const response = await successStoriesService.getByLoanType('salary');
			if (response.success && response.data.results) {
				// Transform API response to match component format
				const transformed = response.data.results.map((story) => ({
					img: story.image || carouselImg3,
					alt: story.alt_text || story.name,
					name: story.name,
					location: story.location,
					description: story.description,
					route: story.route,
					pdf_file: story.pdf_file || null
				}));
				setSuccessStories(transformed);
			}
		} catch (error) {
			console.error('Failed to fetch success stories:', error);
			setSuccessStories([]);
		}
	};

	useEffect(() => {
		getSalaryLoanTypes();
		getSuccessStories();
	}, []);

	return (
		<>
			<main className="flex flex-col pb-[50px]">
				<PageHeroSection pageSlug="loans-salary" />
				<LoanSubcategoriesSection
					id="salary-loan-types"
					sectionTitle="Salary Loan Types"
					sectionSubtitle="Choose the salary loan that best fits your employment status and needs"
					tagText="Loan Categories"
					loanTypes={salaryLoanTypes}
					ctaTitle="Need help choosing the right salary loan for you?"
					ctaPrimaryText="Get Expert Consultation"
					ctaSecondaryText="View All Loans"
				/>
				<SuccessStoriesSection
					id="salary-success-stories"
					title="Salary Loan Success Stories"
					subtitle="Hear from our clients how salary loans made a difference."
					stories={successStories}
					brandColor="#396131"
				/>
			</main>
		</>
	);
}
