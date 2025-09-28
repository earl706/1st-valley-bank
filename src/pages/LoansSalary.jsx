import React from 'react';
import img3 from '/src/assets/homepage/3.png';
import img4 from '/src/assets/homepage/4.png';
import img5 from '/src/assets/homepage/5.png';
import img6 from '/src/assets/homepage/6.png';
import CarouselSection from '../components/CarouselSection';
import LoanSubcategoriesSection from '../components/LoanSubcategoriesSection';

export default function LoansSalary() {
	const salaryLoanTypes = [
		{
			id: 1,
			title: "Government Teacher's Loan",
			description:
				'Specially designed for government teachers with competitive rates and flexible terms tailored to the teaching profession.',
			features: [],
			image: img4,
			route: '/loans/salary/government-teachers'
		},
		{
			id: 2,
			title: 'ATM and Bonus Loans',
			description:
				'Access funds through your ATM and secure loans against your expected bonuses with convenient withdrawal options.',
			features: [],
			image: img5,
			route: '/loans/salary/atm-bonus'
		},
		{
			id: 3,
			title: 'LGU Loan',
			description:
				'Designed for Local Government Unit employees with specialized terms and conditions that cater to public sector workers.',
			features: [],
			image: img6,
			route: '/loans/salary/lgu'
		},
		{
			id: 4,
			title: 'Barangay Loan',
			description:
				'Community-focused loans for barangay officials and employees, supporting local governance with accessible financing options.',
			features: [],
			image: img3,
			route: '/loans/salary/barangay'
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
			image: img3,
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
			image: img4,
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
			image: img5,
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
			image: img6,
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
			image: img3,
			imageAlt: 'Barangay Loan',
			route: '/contact-us',
			buttonText: 'Apply Now'
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

				{/* <section id="eligibility-requirements" className="px-[15px]">
					<div className="flex flex-col gap-[40px] rounded-[8px] bg-white p-[30px] text-[#396131] drop-shadow-lg lg:px-[80px] lg:py-[60px]">
						<div className="text-center">
							<span className="text-[1.5rem]/[1.5rem] font-bold lg:text-[3rem]/[3rem]">
								Eligibility Requirements
							</span>
						</div>
						<div className="grid grid-cols-1 gap-[40px] lg:grid-cols-2">
							<div className="flex flex-col gap-[20px] rounded-[8px] bg-slate-50 p-[30px]">
								<div className="flex items-center gap-[20px]">
									<IdentificationCardIcon weight="duotone" size={48} />
									<span className="text-[1.2rem]/[1.2rem] font-bold lg:text-[1.5rem]/[1.5rem]">
										Who Can Apply?
									</span>
								</div>
								<div className="flex flex-col gap-[10px] text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
									<span>• Employees with a regular income</span>
									<span>• Minimum of 1 year employment with current employer</span>
									<span>• Government employees and private sector workers</span>
									<span>• Teachers, nurses, and other professionals</span>
									<span>• Must be 21-65 years old</span>
								</div>
							</div>
							<div className="flex flex-col gap-[20px] rounded-[8px] bg-slate-50 p-[30px]">
								<div className="flex items-center gap-[20px]">
									<HandArrowDownIcon weight="duotone" size={48} />
									<span className="text-[1.2rem]/[1.2rem] font-bold lg:text-[1.5rem]/[1.5rem]">
										Requirements
									</span>
								</div>
								<div className="flex flex-col gap-[10px] text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
									<span>• Valid government-issued ID</span>
									<span>• Certificate of employment with compensation</span>
									<span>• Recent payslips (last 3 months)</span>
									<span>• Bank statements (last 3 months)</span>
									<span>• Filled out loan application form</span>
								</div>
							</div>
						</div>
					</div>
				</section> */}
				{/* <section id="features" className="px-[15px] text-white">
					<div className="flex flex-col gap-[20px] rounded-[8px] bg-[#396131] p-[30px] drop-shadow-lg lg:flex-row lg:gap-[80px] lg:px-[80px] lg:py-[60px]">
						<div className="flex flex-col gap-[20px] lg:w-3/5">
							<span className="text-[1.5rem]/[1.5rem] font-bold lg:text-[3rem]/[3rem]">
								Why Choose Our Salary Loan?
							</span>
							<div className="flex flex-col gap-[15px] text-[0.8rem]/[1.6rem] lg:text-[1rem]/[2rem]">
								<div className="flex items-start gap-[15px]">
									<div className="mt-[8px] h-[8px] w-[8px] rounded-full bg-white"></div>
									<span>
										<strong>Quick Processing:</strong> Get approved in as little as 24 hours with
										minimal requirements
									</span>
								</div>
								<div className="flex items-start gap-[15px]">
									<div className="mt-[8px] h-[8px] w-[8px] rounded-full bg-white"></div>
									<span>
										<strong>Competitive Rates:</strong> Enjoy low interest rates that won't break
										your budget
									</span>
								</div>
								<div className="flex items-start gap-[15px]">
									<div className="mt-[8px] h-[8px] w-[8px] rounded-full bg-white"></div>
									<span>
										<strong>Flexible Terms:</strong> Choose repayment terms that work with your
										salary schedule
									</span>
								</div>
								<div className="flex items-start gap-[15px]">
									<div className="mt-[8px] h-[8px] w-[8px] rounded-full bg-white"></div>
									<span>
										<strong>No Collateral:</strong> Your steady employment is your guarantee
									</span>
								</div>
								<div className="flex items-start gap-[15px]">
									<div className="mt-[8px] h-[8px] w-[8px] rounded-full bg-white"></div>
									<span>
										<strong>Automatic Deduction:</strong> Hassle-free payments through payroll
										deduction
									</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center lg:w-2/5">
							<img
								src={img2}
								alt=""
								className="h-auto w-full rounded-[12px] object-cover lg:w-[80%]"
							/>
						</div>
					</div>
				</section> */}
			</main>
		</>
	);
}
