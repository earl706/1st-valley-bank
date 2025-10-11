import React from 'react';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import CarouselSection from '../components/CarouselSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import img from '/src/assets/homepage/heroSectionImage.png';
import carouselImg1 from '/src/assets/carousel/1.png';
import carouselImg2 from '/src/assets/carousel/2.png';
import carouselImg3 from '/src/assets/carousel/3.png';
import carouselImg4 from '/src/assets/carousel/4.png';
import carouselImg5 from '/src/assets/carousel/5.png';
import carouselImg6 from '/src/assets/carousel/6.png';
import carouselImg7 from '/src/assets/carousel/7.png';

export default function LoansSalary() {
	const salaryLoanTypes = [
		{
			id: 1,
			title: "Government Teacher's Loan",
			description:
				'Specially designed for government teachers with competitive rates and flexible terms tailored to the teaching profession.',
			features: [],
			image: carouselImg4,
			route: '/contact-us'
		},
		{
			id: 2,
			title: 'ATM and Bonus Loans',
			description:
				'Access funds through your ATM and secure loans against your expected bonuses with convenient withdrawal options.',
			features: [],
			image: carouselImg5,
			route: '/contact-us'
		},
		{
			id: 3,
			title: 'LGU Loan',
			description:
				'Designed for Local Government Unit employees with specialized terms and conditions that cater to public sector workers.',
			features: [],
			image: carouselImg6,
			route: '/contact-us'
		},
		{
			id: 4,
			title: 'Barangay Loan',
			description:
				'Community-focused loans for barangay officials and employees, supporting local governance with accessible financing options.',
			features: [],
			image: carouselImg7,
			route: '/contact-us'
		}
	];

	// Carousel slides combining hero and salary loan types
	const salaryLoanSlides = [
		{
			title: 'Salary Loans',
			subtitle: 'Cash when you need it',
			description:
				"Need extra funds before payday? 1st Valley Bank's Salary Loan offers fast, convenient, and affordable financing for employed individuals. Enjoy low interest rates, quick approval, and flexible payment terms. Whether it's for bills, emergencies, or personal needs—get the support you need, right when you need it.",
			features: [],
			image: carouselImg1,
			showButton: false,
			imageAlt: 'Salary Loans Overview',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: "Government Teacher's Loan",
			subtitle: 'Specially designed for educators',
			description:
				'Specially designed for government teachers with competitive rates and flexible terms tailored to the teaching profession. Get the financial support you need with terms that understand your unique employment structure.',
			features: [],
			image: carouselImg2,
			imageAlt: "Government Teacher's Loan",
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'ATM and Bonus Loans',
			subtitle: 'Convenient access to funds',
			description:
				'Access funds through your ATM and secure loans against your expected bonuses with convenient withdrawal options. Perfect for immediate cash needs with easy repayment.',
			features: [],
			image: carouselImg3,
			imageAlt: 'ATM and Bonus Loans',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'LGU Loan',
			subtitle: 'For local government employees',
			description:
				'Designed for Local Government Unit employees with specialized terms and conditions that cater to public sector workers. Supporting those who serve the community.',
			features: [],
			image: carouselImg4,
			imageAlt: 'LGU Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		},
		{
			title: 'Barangay Loan',
			subtitle: 'Community-focused financing',
			description:
				'Community-focused loans for barangay officials and employees, supporting local governance with accessible financing options. Empowering grassroots leadership.',
			features: [],
			image: carouselImg5,
			imageAlt: 'Barangay Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
		}
	];

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
				<CarouselSection
					id="salary-loans-carousel"
					slides={salaryLoanSlides}
					autoPlay={true}
					autoPlayInterval={7000}
					backgroundColor="from-blue-50 via-white to-indigo-50"
					brandColor="#396131"
					brandGradient="from-[#396131] via-[#4a7c3a] to-[#5a8c4a]"
					minHeight="min-h-[600px] lg:min-h-[700px]"
					showLearnMoreButton={true}
					learnMoreText="Apply Now"
				/>
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
