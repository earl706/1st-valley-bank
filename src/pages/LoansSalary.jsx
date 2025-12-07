import React, { useState, useEffect } from 'react';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import CarouselSection from '../components/CarouselSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';
import loanService from '../services/loanService';
import PageHeroSection from '../components/PageHeroSection';

export default function LoansSalary() {
	const [salaryLoanTypes, setSalaryLoanTypes] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSalaryLoanTypes = async () => {
		try {
			const response = await loanService.getByType('salary');
			console.log(response);
			setSalaryLoanTypes(response.results);
		} catch (error) {
			console.error('Failed to fetch salary loan types:', error);
			setSalaryLoanTypes([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getSalaryLoanTypes();
	}, []);

	// Success stories data for Salary Loans
	const salarySuccessStories = [
		{
			img: img3,
			alt: 'Teacher Maria',
			name: 'Maria Dela Cruz',
			location: 'Government Teacher, Misamis Oriental',
			description:
				"Maria was able to renovate her home and pay for her children's school expenses comfortably with a Government Teacher's Loan.",
			route: '/success-stories/teacher-maria',
			paragraphs: [
				"As a dedicated public school teacher, Maria found it hard to cover both home improvements and her children's needs. Through the Government Teacher's Loan at 1st Valley Bank, she received the support she needed with affordable terms.",
				'"The application was easy and my monthly deduction fit my salary. It was such a relief!"',
				"Now, Maria's children are in school, and their house is safer and more comfortable."
			]
		},
		{
			img: img4,
			alt: 'LGU Employee Ramon',
			name: 'Ramon Santos',
			location: 'LGU Employee, Cagayan de Oro',
			description:
				'Ramon managed an unexpected medical emergency in his family with quick financial support from the LGU Loan.',
			route: '/success-stories/ramon-santos',
			paragraphs: [
				"Ramon, an LGU staffer, faced a family medical emergency. He needed funds fast, but couldn't wait for payday.",
				'With the LGU Loan from 1st Valley Bank, Ramon received approval within the same day and settled hospital bills on time.',
				'"I appreciated the bank’s understanding and the way they treated government employees," Ramon said.'
			]
		},
		{
			img: img5,
			alt: 'Elsa from Barangay',
			name: 'Elsa Mendoza',
			location: 'Barangay Secretary, Lanao del Norte',
			description: 'Elsa expanded her small sari-sari store with a convenient Barangay Loan.',
			route: '/success-stories/elsa-mendoza',
			paragraphs: [
				"Elsa wanted to grow her barangay store to supplement her family's income, but needed capital. The Barangay Loan helped make this possible.",
				'She secured funds with simple requirements, and was able to buy more inventory and increase her income.',
				'"Salamat 1st Valley Bank! Now I can support my family better and serve my community."'
			]
		}
	];

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
					stories={salarySuccessStories}
					brandColor="#396131"
				/>
			</main>
		</>
	);
}
