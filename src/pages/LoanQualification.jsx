import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function LoanQualification() {
	const { loanType } = useParams();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState({});
	const [showResults, setShowResults] = useState(false);
	const [qualificationResult, setQualificationResult] = useState(null);

	// Loan qualification questions based on loan type
	const getQuestions = (type) => {
		const baseQuestions = [
			{
				id: 'age',
				question: 'What is your age?',
				type: 'select',
				options: [
					{ value: '18-25', label: '18-25 years old' },
					{ value: '26-35', label: '26-35 years old' },
					{ value: '36-45', label: '36-45 years old' },
					{ value: '46-55', label: '46-55 years old' },
					{ value: '56-65', label: '56-65 years old' },
					{ value: '65+', label: '65+ years old' }
				],
				required: true
			},
			{
				id: 'employment_status',
				question: 'What is your employment status?',
				type: 'select',
				options: [
					{ value: 'employed', label: 'Employed (Regular)' },
					{ value: 'self_employed', label: 'Self-Employed' },
					{ value: 'business_owner', label: 'Business Owner' },
					{ value: 'ofw', label: 'Overseas Filipino Worker (OFW)' },
					{ value: 'retired', label: 'Retired' },
					{ value: 'unemployed', label: 'Unemployed' }
				],
				required: true
			},
			{
				id: 'monthly_income',
				question: 'What is your monthly income range?',
				type: 'select',
				options: [
					{ value: 'below_15k', label: 'Below ₱15,000' },
					{ value: '15k_25k', label: '₱15,000 - ₱25,000' },
					{ value: '25k_50k', label: '₱25,000 - ₱50,000' },
					{ value: '50k_100k', label: '₱50,000 - ₱100,000' },
					{ value: '100k_200k', label: '₱100,000 - ₱200,000' },
					{ value: 'above_200k', label: 'Above ₱200,000' }
				],
				required: true
			},
			{
				id: 'employment_duration',
				question: 'How long have you been in your current employment?',
				type: 'select',
				options: [
					{ value: 'less_6months', label: 'Less than 6 months' },
					{ value: '6months_1year', label: '6 months - 1 year' },
					{ value: '1year_2years', label: '1-2 years' },
					{ value: '2years_5years', label: '2-5 years' },
					{ value: 'above_5years', label: 'Above 5 years' }
				],
				required: true
			},
			{
				id: 'existing_loans',
				question: 'Do you have any existing loans?',
				type: 'select',
				options: [
					{ value: 'none', label: 'No existing loans' },
					{ value: '1_loan', label: '1 existing loan' },
					{ value: '2_loans', label: '2 existing loans' },
					{ value: '3_loans', label: '3 existing loans' },
					{ value: 'more_than_3', label: 'More than 3 loans' }
				],
				required: true
			},
			{
				id: 'credit_score',
				question: 'What is your credit score range?',
				type: 'select',
				options: [
					{ value: 'excellent', label: 'Excellent (750-850)' },
					{ value: 'good', label: 'Good (700-749)' },
					{ value: 'fair', label: 'Fair (650-699)' },
					{ value: 'poor', label: 'Poor (600-649)' },
					{ value: 'very_poor', label: 'Very Poor (Below 600)' },
					{ value: 'unknown', label: "I don't know my credit score" }
				],
				required: true
			}
		];

		// Add loan-specific questions
		if (type === 'agricultural' || type === 'agri-secured') {
			baseQuestions.push(
				{
					id: 'farm_size',
					question: 'What is the size of your farm/agricultural land?',
					type: 'select',
					options: [
						{ value: 'less_1hectare', label: 'Less than 1 hectare' },
						{ value: '1_5hectares', label: '1-5 hectares' },
						{ value: '5_10hectares', label: '5-10 hectares' },
						{ value: '10_20hectares', label: '10-20 hectares' },
						{ value: 'above_20hectares', label: 'Above 20 hectares' }
					],
					required: true
				},
				{
					id: 'crop_type',
					question: 'What type of crops do you grow?',
					type: 'select',
					options: [
						{ value: 'rice', label: 'Rice' },
						{ value: 'corn', label: 'Corn' },
						{ value: 'vegetables', label: 'Vegetables' },
						{ value: 'fruits', label: 'Fruits' },
						{ value: 'livestock', label: 'Livestock' },
						{ value: 'mixed', label: 'Mixed farming' }
					],
					required: true
				}
			);
		}

		if (type === 'microfinance') {
			baseQuestions.push(
				{
					id: 'business_type',
					question: 'What type of business do you operate?',
					type: 'select',
					options: [
						{ value: 'retail', label: 'Retail/Sari-sari store' },
						{ value: 'food', label: 'Food business' },
						{ value: 'services', label: 'Services' },
						{ value: 'manufacturing', label: 'Small manufacturing' },
						{ value: 'agriculture', label: 'Agricultural business' },
						{ value: 'other', label: 'Other' }
					],
					required: true
				},
				{
					id: 'business_duration',
					question: 'How long have you been operating your business?',
					type: 'select',
					options: [
						{ value: 'less_6months', label: 'Less than 6 months' },
						{ value: '6months_1year', label: '6 months - 1 year' },
						{ value: '1year_2years', label: '1-2 years' },
						{ value: '2years_5years', label: '2-5 years' },
						{ value: 'above_5years', label: 'Above 5 years' }
					],
					required: true
				}
			);
		}

		return baseQuestions;
	};

	const questions = getQuestions(loanType);
	const currentQuestion = questions[currentStep];

	const handleAnswer = (value) => {
		setAnswers((prev) => ({
			...prev,
			[currentQuestion.id]: value
		}));
	};

	const nextStep = () => {
		if (currentStep < questions.length - 1) {
			setCurrentStep((prev) => prev + 1);
		} else {
			// Calculate qualification result
			const result = calculateQualification(answers, loanType);
			setQualificationResult(result);
			setShowResults(true);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const calculateQualification = (answers, type) => {
		let score = 0;
		let maxScore = 0;

		// Age scoring
		if (answers.age) {
			maxScore += 10;
			switch (answers.age) {
				case '26-35':
				case '36-45':
					score += 10;
					break;
				case '46-55':
					score += 8;
					break;
				case '18-25':
				case '56-65':
					score += 6;
					break;
				case '65+':
					score += 4;
					break;
			}
		}

		// Employment status scoring
		if (answers.employment_status) {
			maxScore += 15;
			switch (answers.employment_status) {
				case 'employed':
					score += 15;
					break;
				case 'business_owner':
					score += 12;
					break;
				case 'self_employed':
					score += 10;
					break;
				case 'ofw':
					score += 8;
					break;
				case 'retired':
					score += 6;
					break;
				case 'unemployed':
					score += 0;
					break;
			}
		}

		// Monthly income scoring
		if (answers.monthly_income) {
			maxScore += 20;
			switch (answers.monthly_income) {
				case 'above_200k':
					score += 20;
					break;
				case '100k_200k':
					score += 18;
					break;
				case '50k_100k':
					score += 15;
					break;
				case '25k_50k':
					score += 12;
					break;
				case '15k_25k':
					score += 8;
					break;
				case 'below_15k':
					score += 4;
					break;
			}
		}

		// Employment duration scoring
		if (answers.employment_duration) {
			maxScore += 10;
			switch (answers.employment_duration) {
				case 'above_5years':
					score += 10;
					break;
				case '2years_5years':
					score += 8;
					break;
				case '1year_2years':
					score += 6;
					break;
				case '6months_1year':
					score += 4;
					break;
				case 'less_6months':
					score += 2;
					break;
			}
		}

		// Existing loans scoring
		if (answers.existing_loans) {
			maxScore += 10;
			switch (answers.existing_loans) {
				case 'none':
					score += 10;
					break;
				case '1_loan':
					score += 8;
					break;
				case '2_loans':
					score += 6;
					break;
				case '3_loans':
					score += 4;
					break;
				case 'more_than_3':
					score += 2;
					break;
			}
		}

		// Credit score scoring
		if (answers.credit_score) {
			maxScore += 15;
			switch (answers.credit_score) {
				case 'excellent':
					score += 15;
					break;
				case 'good':
					score += 12;
					break;
				case 'fair':
					score += 8;
					break;
				case 'poor':
					score += 4;
					break;
				case 'very_poor':
					score += 1;
					break;
				case 'unknown':
					score += 5;
					break;
			}
		}

		const percentage = (score / maxScore) * 100;

		if (percentage >= 80) {
			return {
				qualified: true,
				score: percentage,
				message: 'Congratulations! You are highly qualified for this loan.',
				recommendations: [
					'You meet all the primary requirements',
					'Consider applying for the maximum loan amount',
					'You may be eligible for preferential interest rates'
				]
			};
		} else if (percentage >= 60) {
			return {
				qualified: true,
				score: percentage,
				message: 'You are qualified for this loan with some conditions.',
				recommendations: [
					'You meet most of the requirements',
					'Consider providing additional documentation',
					'You may need a co-signer for higher amounts'
				]
			};
		} else if (percentage >= 40) {
			return {
				qualified: false,
				score: percentage,
				message: 'You may qualify with additional requirements.',
				recommendations: [
					'Improve your credit score',
					'Increase your income stability',
					'Consider a smaller loan amount',
					'Provide additional collateral'
				]
			};
		} else {
			return {
				qualified: false,
				score: percentage,
				message: 'You currently do not meet the minimum requirements.',
				recommendations: [
					'Work on improving your credit score',
					'Establish stable employment',
					'Reduce existing debt',
					'Consider alternative loan products'
				]
			};
		}
	};

	const resetAssessment = () => {
		setCurrentStep(0);
		setAnswers({});
		setShowResults(false);
		setQualificationResult(null);
	};

	if (showResults && qualificationResult) {
		return (
			<div className="min-h-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-12">
				<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-10 text-center">
						<button
							onClick={() => navigate(-1)}
							className="mb-4 inline-flex items-center gap-2 text-sm leading-tight font-normal text-white transition hover:underline"
						>
							<ArrowLeft size={20} />
							<span className="font-normal">Back to Loans</span>
						</button>
						<h1 className="text-3xl leading-tight font-bold text-white md:text-5xl">
							Loan Qualification Results
						</h1>
						<p className="mt-3 text-base leading-relaxed font-normal text-white opacity-80">
							Assessment for {loanType?.replace('-', ' ').toUpperCase()} Loan
						</p>
					</div>

					{/* Results Card */}
					<div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow">
						<div className="text-center">
							{qualificationResult.qualified ? (
								<CheckCircle size={72} className="mx-auto text-white" />
							) : (
								<XCircle size={72} className="mx-auto text-white opacity-40" />
							)}

							<h2
								className={`mt-4 text-2xl leading-tight font-bold md:text-3xl ${
									qualificationResult.qualified ? 'text-white' : 'text-white opacity-60'
								}`}
							>
								{qualificationResult.qualified ? 'QUALIFIED' : 'NOT QUALIFIED'}
							</h2>

							<div className="mt-4">
								<div className="text-5xl leading-tight font-bold text-white">
									{Math.round(qualificationResult.score)}%
								</div>
								<div className="text-xs leading-tight font-normal text-white opacity-60">
									Qualification Score
								</div>
							</div>

							<p className="mt-6 text-base leading-relaxed font-normal text-white opacity-90">
								{qualificationResult.message}
							</p>
						</div>

						{/* Recommendations */}
						<div className="mt-10">
							<h3 className="mb-4 text-xl leading-tight font-bold text-white">Recommendations</h3>
							<ul className="space-y-2">
								{qualificationResult.recommendations.map((rec, index) => (
									<li key={index} className="flex items-start gap-3">
										<AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-white opacity-70" />
										<span className="text-base leading-relaxed font-normal text-white opacity-90">
											{rec}
										</span>
									</li>
								))}
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
							{qualificationResult.qualified ? (
								<>
									<button
										onClick={() => navigate('/contact-us')}
										className="rounded-lg bg-white/90 px-8 py-3 text-base leading-tight font-bold text-[#396131] transition-all hover:bg-white focus:ring-2 focus:ring-white focus:outline-none"
									>
										Apply for Loan
									</button>
									<button
										onClick={resetAssessment}
										className="rounded-lg border border-white bg-transparent px-8 py-3 text-base leading-tight font-bold text-white transition-all hover:bg-white/10 focus:ring-2 focus:ring-white focus:outline-none"
									>
										Retake Assessment
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => navigate('/contact-us')}
										className="cursor-pointer rounded-lg bg-white/90 px-8 py-3 text-base leading-tight font-bold text-[#396131] transition-all hover:bg-white focus:ring-2 focus:ring-white focus:outline-none"
									>
										Consult with Expert
									</button>
									<button
										onClick={resetAssessment}
										className="cursor-pointer rounded-lg border border-white bg-transparent px-8 py-3 text-base leading-tight font-bold text-white transition-all hover:bg-white/10 focus:ring-2 focus:ring-white focus:outline-none"
									>
										Retake Assessment
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-10 text-center">
					<button
						onClick={() => navigate(-1)}
						className="mb-4 inline-flex cursor-pointer items-center gap-2 text-sm leading-tight font-normal text-white transition hover:underline"
					>
						<ArrowLeft size={20} />
						<span className="font-normal">Back to Loans</span>
					</button>
					<h1 className="text-3xl leading-tight font-bold text-white md:text-5xl">
						Loan Qualification Assessment
					</h1>
					<p className="mt-3 text-base leading-relaxed font-normal text-white opacity-80">
						Answer a few questions to determine your eligibility for{' '}
						{loanType?.replace('-', ' ').toUpperCase()} Loan
					</p>
				</div>

				{/* Progress Bar */}
				<div className="mb-8">
					<div className="mb-2 flex items-center justify-between text-xs leading-tight font-normal text-white opacity-80">
						<span>
							Question {currentStep + 1} of {questions.length}
						</span>
						<span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
					</div>
					<div className="h-2 w-full rounded-full bg-white/20">
						<div
							className="h-2 rounded-full bg-white transition-all duration-300"
							style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
						></div>
					</div>
				</div>

				{/* Question Card */}
				<div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow">
					<h2 className="mb-6 text-2xl leading-tight font-bold text-white">
						{currentQuestion.question}
					</h2>

					<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
						{currentQuestion.options.map((option) => (
							<button
								key={option.value}
								onClick={() => handleAnswer(option.value)}
								className={`w-full cursor-pointer rounded-lg border-2 p-4 text-left text-base leading-relaxed font-normal transition-all ${
									answers[currentQuestion.id] === option.value
										? 'border-white bg-white/20 font-bold text-white'
										: 'border-white/20 text-white hover:border-white hover:bg-white/10'
								}`}
							>
								{option.label}
							</button>
						))}
					</div>

					{/* Navigation Buttons */}
					<div className="mt-8 flex justify-between">
						<button
							onClick={prevStep}
							disabled={currentStep === 0}
							className="cursor-pointer rounded-lg border border-white/20 bg-transparent px-6 py-3 text-base leading-tight font-bold text-white transition-all hover:bg-white/10 focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							Previous
						</button>

						<button
							onClick={nextStep}
							disabled={!answers[currentQuestion.id]}
							className="cursor-pointer rounded-lg bg-white/90 px-6 py-3 text-base leading-tight font-bold text-[#396131] transition-all hover:bg-white focus:ring-2 focus:ring-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							{currentStep === questions.length - 1 ? 'Get Results' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
