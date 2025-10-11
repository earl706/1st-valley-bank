import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Shield,
	Lock,
	Fingerprint,
	Database,
	FileText,
	QrCode,
	Laptop,
	Upload,
	Server,
	Baby,
	Star,
	Info,
	ChevronRight,
	Eye,
	UserCheck,
	Globe,
	Users,
	ArrowUp,
	CheckCircle,
	ArrowRight
} from 'lucide-react';
import img1 from '/src/assets/consumer-protection/privacy-policy/1.jpg';
import img2 from '/src/assets/consumer-protection/privacy-policy/2.jpg';
import img from '/src/assets/homepage/heroSectionImage.png';
import HeroSection from '../components/HeroSection';

function FeedbackForm({ onClose, onSuccess, onError }) {
	const [form, setForm] = useState({
		name: '',
		contactNumber: '',
		email: '',
		date: new Date().toISOString().split('T')[0],
		branch: '',
		serviceType: '',
		otherService: '',
		satisfaction: '',
		likes: '',
		issues: '',
		suggestions: '',
		repContact: '',
		recommend: ''
	});
	const [submitting, setSubmitting] = useState(false);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({
			...f,
			[name]: value,
			// If changing away from "Others", reset otherService
			...(name === 'serviceType' && value !== 'Others' ? { otherService: '' } : {})
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		// Use otherService if applicable
		const resolvedServiceType =
			form.serviceType === 'Others' && form.otherService
				? `Others: ${form.otherService}`
				: form.serviceType;

		const body = `
Customer Feedback Form Submission

Name: ${form.name}
Contact Number: ${form.contactNumber}
Email Address: ${form.email}
Date: ${form.date}
Branch: ${form.branch}
Service Type: ${resolvedServiceType}
Satisfaction Rating: ${form.satisfaction}
What did you like about our service?: ${form.likes}
Were there any issues or challenges?: ${form.issues}
Suggestions for improvement: ${form.suggestions}
Would you like a representative to contact you regarding your feedback?: ${form.repContact}
Would you recommend 1st Valley Bank to Others?: ${form.recommend}
		`.trim();

		try {
			window.open(
				`mailto:consumercare@1vb.com.ph?subject=Customer Feedback Form&body=${encodeURIComponent(body)}`
			);
			setTimeout(() => {
				setSubmitting(false);
				onSuccess();
			}, 500);
		} catch (e) {
			setSubmitting(false);
			onError();
		}
	};

	return (
		<div className="mb-8 rounded-lg border border-gray-200 bg-white px-4 py-6 text-left shadow-md">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="text-lg font-bold text-[#396131]">Feedback Form</h3>
				<button
					onClick={onClose}
					className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
					type="button"
					aria-label="Close Form"
				>
					×
				</button>
			</div>
			<form className="grid gap-4" onSubmit={handleSubmit}>
				<div className="flex gap-4">
					<input
						name="name"
						value={form.name}
						onChange={handleInput}
						required
						type="text"
						placeholder="Name"
						className="w-1/2 rounded border px-3 py-2"
					/>
					<input
						name="contactNumber"
						value={form.contactNumber}
						onChange={handleInput}
						type="tel"
						placeholder="Contact Number"
						className="w-1/2 rounded border px-3 py-2"
						pattern="[0-9+\-()\s]*"
					/>
				</div>
				<div className="flex gap-4">
					<input
						name="email"
						value={form.email}
						onChange={handleInput}
						type="email"
						placeholder="Email Address"
						className="w-1/2 rounded border px-3 py-2"
					/>
					<input
						name="date"
						value={form.date}
						onChange={handleInput}
						type="date"
						max={new Date().toISOString().split('T')[0]}
						className="w-1/2 rounded border px-3 py-2"
						required
					/>
				</div>
				<input
					name="branch"
					value={form.branch}
					onChange={handleInput}
					type="text"
					placeholder="Branch"
					className="w-full rounded border px-3 py-2"
				/>
				<div>
					<label className="mb-1 block text-sm font-medium text-[#396131]">
						Type of Service Availed
					</label>
					<select
						name="serviceType"
						required
						value={form.serviceType}
						onChange={handleInput}
						className="w-full rounded border px-3 py-2"
					>
						<option value="">-- Select --</option>
						<option value="Deposit/Withdrawal">Branch Visit</option>
						<option value="Loan">ATM</option>
						<option value="Remittance">Loan Application</option>
						<option value="Account Opening">Customer Service</option>
						<option value="Others">Others</option>
					</select>
					{form.serviceType === 'Others' && (
						<input
							name="otherService"
							value={form.otherService}
							onChange={handleInput}
							required
							type="text"
							placeholder="Please specify the service"
							className="mt-2 w-full rounded border px-3 py-2"
						/>
					)}
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-[#396131]">
						How satisfied are you with our service?
					</label>
					<div className="mb-2 text-xs text-gray-500">
						<span className="mr-4">
							<span className="font-medium text-[#396131]">5</span> = Very Satisfied
						</span>
						<span className="mr-4">
							<span className="font-medium text-[#396131]">1</span> = Very Dissatisfied
						</span>
					</div>
					<select
						name="satisfaction"
						required
						value={form.satisfaction}
						onChange={handleInput}
						className="w-full rounded border px-3 py-2"
					>
						<option value="">-- Select --</option>
						<option value="5 - Very Satisfied">5 - Very Satisfied</option>
						<option value="4 - Satisfied">4 - Satisfied</option>
						<option value="3 - Neutral">3 - Neutral</option>
						<option value="2 - Unsatisfied">2 - Unsatisfied</option>
						<option value="1 - Very Unsatisfied">1 - Very Unsatisfied</option>
					</select>
				</div>
				<textarea
					name="likes"
					value={form.likes}
					onChange={handleInput}
					placeholder="What did you like about our service?"
					rows={2}
					className="w-full rounded border px-3 py-2"
				/>
				<textarea
					name="issues"
					value={form.issues}
					onChange={handleInput}
					placeholder="Were there any issues or concerns you'd like to raise?"
					rows={2}
					className="w-full rounded border px-3 py-2"
				/>
				<textarea
					name="suggestions"
					value={form.suggestions}
					onChange={handleInput}
					placeholder="Do you have any suggestions on how we can improve?"
					rows={2}
					className="w-full rounded border px-3 py-2"
				/>
				<div>
					<label className="mb-1 block text-sm font-medium text-[#396131]">
						Would you recommend 1st Valley Bank to Others?
					</label>
					<select
						name="recommend"
						required
						value={form.recommend}
						onChange={handleInput}
						className="w-full rounded border px-3 py-2"
					>
						<option value="">-- Select --</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-[#396131]">
						Would you like a representative to contact you regarding your feedback?
					</label>
					<select
						name="repContact"
						required
						value={form.repContact}
						onChange={handleInput}
						className="w-full rounded border px-3 py-2"
					>
						<option value="">-- Select --</option>
						<option value="Yes (Please ensure contact details are provided above)">
							Yes (Please ensure contact details are provided above)
						</option>
						<option value="No">No</option>
					</select>
				</div>
				<div className="mt-4 flex justify-end gap-2">
					<button
						type="button"
						onClick={onClose}
						disabled={submitting}
						className="rounded bg-gray-100 px-4 py-2 font-semibold text-gray-600 hover:bg-gray-200"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={submitting}
						className={`rounded px-6 py-2 font-semibold text-white ${submitting ? 'bg-gray-400' : 'bg-[#396131] hover:bg-[#20411b]'}`}
					>
						{submitting ? 'Sending...' : 'Send Feedback'}
					</button>
				</div>
			</form>
		</div>
	);
}

function ComplaintForm({ onClose, onSuccess, onError }) {
	const [form, setForm] = useState({
		name: '',
		contactNumber: '',
		email: '',
		date: new Date().toISOString().split('T')[0],
		branch: '',
		details: '',
		resolution: ''
	});
	const [submitting, setSubmitting] = useState(false);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const body = `
Customer Complaint Form Submission

Name: ${form.name}
Contact Number: ${form.contactNumber}
Email Address: ${form.email}
Date: ${form.date}
Branch: ${form.branch}
Complaint / Issue Details: ${form.details}
Suggested Resolution/Action: ${form.resolution}
		`.trim();

		try {
			window.open(
				`mailto:consumercare@1vb.com.ph?subject=Customer Complaint Form&body=${encodeURIComponent(body)}`
			);
			setTimeout(() => {
				setSubmitting(false);
				onSuccess();
			}, 500);
		} catch (e) {
			setSubmitting(false);
			onError();
		}
	};

	return (
		<div className="mb-8 rounded-lg border border-gray-200 bg-white px-4 py-6 text-left shadow-md">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="text-lg font-bold text-[#396131]">Customer Complaint Form</h3>
				<button
					onClick={onClose}
					className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100"
					type="button"
					aria-label="Close Form"
				>
					×
				</button>
			</div>
			<form className="grid gap-4" onSubmit={handleSubmit}>
				<div className="flex gap-4">
					<input
						name="name"
						value={form.name}
						onChange={handleInput}
						required
						type="text"
						placeholder="Name"
						className="w-1/2 rounded border px-3 py-2"
					/>
					<input
						name="contactNumber"
						value={form.contactNumber}
						onChange={handleInput}
						type="tel"
						placeholder="Contact Number"
						className="w-1/2 rounded border px-3 py-2"
						pattern="[0-9+\-()\s]*"
					/>
				</div>
				<div className="flex gap-4">
					<input
						name="email"
						value={form.email}
						onChange={handleInput}
						type="email"
						placeholder="Email Address"
						className="w-1/2 rounded border px-3 py-2"
					/>
					<input
						name="date"
						value={form.date}
						onChange={handleInput}
						type="date"
						max={new Date().toISOString().split('T')[0]}
						className="w-1/2 rounded border px-3 py-2"
						required
					/>
				</div>
				<input
					name="branch"
					value={form.branch}
					onChange={handleInput}
					type="text"
					placeholder="Branch"
					className="w-full rounded border px-3 py-2"
				/>
				<textarea
					name="details"
					value={form.details}
					onChange={handleInput}
					required
					placeholder="What happened to cause you to be dissatisfied?"
					rows={4}
					className="w-full rounded border px-3 py-2"
				/>
				<textarea
					name="resolution"
					value={form.resolution}
					onChange={handleInput}
					placeholder="How can we make this right?"
					rows={2}
					className="w-full rounded border px-3 py-2"
				/>
				<div className="mt-4 flex justify-end gap-2">
					<button
						type="button"
						onClick={onClose}
						disabled={submitting}
						className="rounded bg-gray-100 px-4 py-2 font-semibold text-gray-600 hover:bg-gray-200"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={submitting}
						className={`rounded px-6 py-2 font-semibold text-white ${submitting ? 'bg-gray-400' : 'bg-[#396131] hover:bg-[#20411b]'}`}
					>
						{submitting ? 'Sending...' : 'Submit Complaint'}
					</button>
				</div>
			</form>
		</div>
	);
}

export default function ConsumerProtectionPrivacyPolicy() {
	const [scrollY, setScrollY] = useState(0);
	const [activeSection, setActiveSection] = useState('');
	const [readingProgress, setReadingProgress] = useState(0);
	const [showFeedbackForm, setShowFeedbackForm] = useState(false);
	const [showComplaintForm, setShowComplaintForm] = useState(false);
	const [formStatus, setFormStatus] = useState(''); // '', 'success', 'error'

	// Scroll tracking
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const progress = Math.min((scrollTop / docHeight) * 100, 100);

			setScrollY(scrollTop);
			setReadingProgress(progress);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Intersection observer for active section tracking
	useEffect(() => {
		const observers = [];
		const elements = document.querySelectorAll('[data-section]');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.3, rootMargin: '-100px 0px' }
		);

		elements.forEach((el) => observer.observe(el));
		observers.push(observer);

		return () => observers.forEach((obs) => obs.disconnect());
	}, []);

	// Table of contents data
	const tableOfContents = [
		{ id: 'hero', title: 'Privacy Policy Overview', icon: Shield },
		{ id: 'application-privacy', title: 'Application Privacy Statement', icon: Lock },
		{ id: 'user-data', title: 'User Data Collection', icon: Database },
		{ id: 'information-usage', title: 'Information Usage', icon: FileText },
		{ id: 'partner-treatment', title: 'Partner Information Treatment', icon: QrCode },
		{ id: 'information-sharing', title: 'Information Sharing Policy', icon: Users },
		{ id: 'conditions-of-use', title: 'Conditions of Use', icon: Star },
		{ id: 'third-party', title: 'Third Party Applications', icon: Laptop },
		{ id: 'personal-access', title: 'Personal Information Access', icon: Eye },
		{ id: 'children-policy', title: 'Children Usage Policy', icon: Baby },
		{ id: 'privacy-changes', title: 'Privacy Statement Changes', icon: Upload }
	];

	// Scroll to section
	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<>
			<main className="relative">
				<HeroSection
					title="Consumer Protection"
					subtitle="Privacy Policy"
					description="Your privacy matters at 1st Valley Bank. Through our comprehensive Consumer
									Protection & Privacy Policy, we safeguard your personal data with the highest
									standards of security, transparency, and integrity."
					features={[]}
					image={img}
					imageAlt="Gold & Gems"
				/>
				<section
					id="application-privacy"
					data-section
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
									<Lock className="h-20 w-20 text-white" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Info className="h-4 w-4 text-white" />
									<span className="text-sm leading-tight font-semibold text-white">
										Legal Framework
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-white md:text-5xl">
									Application Privacy Statement
								</h2>
								<p className="mb-4 text-base leading-relaxed font-normal text-white/80">
									This statement covers how we handle your personal information in connection with
									our application services.
								</p>
								<div className="rounded-lg border-l-4 border-white bg-white/10 p-4">
									<p className="text-base leading-relaxed font-normal text-white">
										By using our services, you accept the practices in this Privacy Statement.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* User Data Collection */}
				<section id="user-data" data-section className="bg-[#396131]/5 py-24">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Database className="h-4 w-4 text-[#396131]" />
									<span className="text-sm leading-tight font-semibold text-[#396131]">
										Data Collection
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-[#396131] md:text-5xl">
									User Data
								</h2>
								<div className="space-y-6">
									<div className="rounded-lg border border-[#396131]/10 p-4">
										<h3 className="mb-2 flex items-center gap-2 text-xl leading-tight font-bold text-[#396131]">
											<UserCheck className="h-5 w-5" />
											Personal Information You Provide
										</h3>
										<p className="text-base leading-relaxed font-normal text-gray-700">
											We collect and store information you provide, such as your name, email, and
											other details needed to deliver our services.
										</p>
									</div>
									<div className="rounded-lg border border-[#396131]/10 p-4">
										<h3 className="mb-2 flex items-center gap-2 text-xl leading-tight font-bold text-[#396131]">
											<Globe className="h-5 w-5" />
											Information Collected Automatically
										</h3>
										<p className="text-base leading-relaxed font-normal text-gray-700">
											We automatically collect usage data (such as IP address, browser info, and
											visited URLs) when you use our application. This may be shared in aggregate
											with partners.
										</p>
									</div>
								</div>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<Database className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Information Usage */}
				<section
					id="information-usage"
					data-section
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
									<FileText className="h-20 w-20 text-white" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<FileText className="h-4 w-4 text-white" />
									<span className="text-sm leading-tight font-semibold text-white">Data Usage</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-white md:text-5xl">
									How We Use Your Information
								</h2>
								<p className="mb-4 text-base leading-relaxed font-normal text-white/80">
									1st Valley Bank uses the collected information in the following ways:
								</p>
								<div className="space-y-4">
									{[
										{
											icon: <FileText className="h-5 w-5 text-white" />,
											title: 'Internal Analysis',
											description: 'To analyze, develop and improve our products and services'
										},
										{
											icon: <Users className="h-5 w-5 text-white" />,
											title: 'Customer Contact',
											description:
												'To contact you regarding offers and services that may interest you'
										},
										{
											icon: <Shield className="h-5 w-5 text-white" />,
											title: 'Legal Compliance',
											description: 'As outlined in our information sharing policies below'
										}
									].map((item, index) => (
										<div key={index} className="flex gap-3 p-3">
											<div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white">
												{item.icon}
											</div>
											<div>
												<h3 className="mb-1 text-xl leading-tight font-bold text-white">
													{item.title}
												</h3>
												<p className="text-base leading-relaxed font-normal text-white/80">
													{item.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Partner Treatment */}
				<section id="partner-treatment" data-section className="bg-[#396131]/5 py-24">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<QrCode className="h-4 w-4 text-[#396131]" />
									<span className="text-sm leading-tight font-semibold text-[#396131]">
										Partnership Policy
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-[#396131] md:text-5xl">
									Application Partner Treatment
								</h2>
								<p className="mb-4 text-base leading-relaxed font-normal text-gray-700">
									1st Valley Bank may provide personal information to applicable Application
									Partners. Each partner's use of your personal information is subject to their
									separate privacy policy, not this Privacy Statement.
								</p>
								<div className="rounded-lg border border-[#396131]/10 bg-white p-4">
									<p className="text-base leading-relaxed font-normal text-[#396131]">
										Application Partner privacy policies are linked from within their respective
										applications and platforms.
									</p>
								</div>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<QrCode className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Information Sharing */}
				<section
					id="information-sharing"
					data-section
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-10 text-center">
							<div className="mb-3 flex items-center justify-center gap-2">
								<Users className="h-4 w-4 text-white" />
								<span className="text-sm leading-tight font-semibold text-white">
									Sharing Policy
								</span>
							</div>
							<h2 className="mb-3 text-3xl leading-tight font-bold text-white md:text-5xl">
								Information Sharing Policy
							</h2>
							<p className="mx-auto max-w-2xl text-base leading-relaxed font-normal text-white/80">
								Personal information about our users is integral to our business. We neither rent
								nor sell your personal information to anyone, with limited exceptions as described
								below.
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-2">
							{[
								{
									icon: <Shield className="h-6 w-6 text-white" />,
									title: 'Protection of 1st Valley Bank and Others',
									description:
										'We may share information to comply with laws or protect rights and safety.'
								},
								{
									icon: <FileText className="h-6 w-6 text-white" />,
									title: 'Business Transfers',
									description: 'Customer information may be transferred in business transactions.'
								},
								{
									icon: <Users className="h-6 w-6 text-white" />,
									title: 'Service Agents',
									description: 'We share information with agents who help us provide services.'
								},
								{
									icon: <CheckCircle className="h-6 w-6 text-white" />,
									title: 'With Your Consent',
									description:
										'You will be notified and can opt out before we share your information.'
								}
							].map((item, index) => (
								<div key={index} className="flex flex-col items-start p-4">
									<div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-white/10 text-white">
										{item.icon}
									</div>
									<h3 className="mb-1 text-xl leading-tight font-bold text-white">{item.title}</h3>
									<p className="text-base leading-relaxed font-normal text-white/80">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* Third Party Applications */}
				<section id="third-party" data-section className="bg-[#396131]/5 py-24">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<Laptop className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Laptop className="h-4 w-4 text-[#396131]" />
									<span className="text-sm leading-tight font-semibold text-[#396131]">
										External Links
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-[#396131] md:text-5xl">
									Third Party Applications/Websites
								</h2>
								<p className="text-base leading-relaxed font-normal text-gray-700">
									The Application may link to third party sites not controlled by 1st Valley Bank.
									We are not responsible for their content or privacy practices.
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* Personal Information Access */}
				<section
					id="personal-access"
					data-section
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Eye className="h-4 w-4 text-white" />
									<span className="text-sm leading-tight font-semibold text-white">
										Data Access
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-white md:text-5xl">
									What Personal Information Can I Access?
								</h2>
								<p className="mb-4 text-base leading-relaxed font-normal text-white">
									You can view and update the following personal information. This list may change
									as the Application evolves.
								</p>
								<ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
									{[
										'Account/profile info',
										'Email address',
										'Facebook info',
										'Preferences',
										'App data'
									].map((item, index) => (
										<li
											key={index}
											className="flex items-center gap-2 text-base leading-relaxed font-normal text-white"
										>
											<CheckCircle className="h-4 w-4 text-white" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
									<Server className="h-20 w-20 text-white" />
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Children Policy */}
				<section id="children-policy" data-section className="bg-[#396131]/5 py-24">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-[#396131]/20 bg-white">
									<Baby className="h-20 w-20 text-[#396131]" />
								</div>
							</div>
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Baby className="h-4 w-4 text-[#396131]" />
									<span className="text-sm leading-tight font-semibold text-[#396131]">
										Child Protection
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-[#396131] md:text-5xl">
									Can Children Use The Application?
								</h2>
								<p className="text-base leading-relaxed font-normal text-gray-700">
									1st Valley Bank does not knowingly collect information from children under 13.
									Parental consent is advised for minors.
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* Privacy Statement Changes */}
				<section
					id="privacy-changes"
					data-section
					className="bg-gradient-to-l from-[#396131] to-[#4a7c3a] py-24"
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center gap-8 lg:flex-row">
							<div className="flex-1">
								<div className="mb-4 flex items-center gap-2">
									<Upload className="h-4 w-4 text-white" />
									<span className="text-sm leading-tight font-semibold text-white">
										Updates & Changes
									</span>
								</div>
								<h2 className="mb-4 text-3xl leading-tight font-bold text-white md:text-5xl">
									Changes To This Privacy Statement
								</h2>
								<p className="text-base leading-relaxed font-normal text-white">
									1st Valley Bank may update this Privacy Statement at any time. Changes will be
									posted here or emailed to you. Continued use of our services means you accept the
									updated policy.
								</p>
							</div>
							<div className="flex w-full flex-shrink-0 items-center justify-center lg:w-1/3">
								<div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
									<Upload className="h-20 w-20 text-white" />
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Client Interface Section: Feedback & Complaint */}
				<section className="bg-white py-12" id="client-interface">
					<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
						<h2 className="mb-4 text-2xl font-bold text-[#396131]">We Value Your Input</h2>
						<p className="mb-6 text-base text-gray-700">
							Send us your feedback or file a complaint using the forms below. Your voice helps us
							improve and serve you better.
						</p>
						<div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<button
								className={`inline-flex min-w-[170px] items-center justify-center rounded-lg bg-[#396131] px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#20411b]`}
								onClick={() => {
									setShowComplaintForm(false);
									setShowFeedbackForm(true);
									setFormStatus('');
								}}
							>
								Send Feedback
							</button>
							<button
								className={`inline-flex min-w-[170px] items-center justify-center rounded-lg border-2 border-[#396131] px-6 py-3 text-base font-semibold text-[#396131] transition-all duration-200 hover:bg-[#396131] hover:text-white`}
								onClick={() => {
									setShowComplaintForm(true);
									setShowFeedbackForm(false);
									setFormStatus('');
								}}
							>
								File a Complaint
							</button>
						</div>
						{formStatus === 'success' && (
							<div className="mb-8 rounded-lg border border-green-200 bg-green-50 px-6 py-4 text-center text-green-800">
								Thank you! Your submission has been sent. We appreciate your input and will act on
								your message as soon as possible.
							</div>
						)}
						{formStatus === 'error' && (
							<div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-center text-red-800">
								There was an error sending your form. Please try again or contact us directly at{' '}
								<a className="underline" href="mailto:consumercare@1vb.com.ph">
									consumercare@1vb.com.ph
								</a>
							</div>
						)}

						{/* Feedback Form */}
						{showFeedbackForm && formStatus === '' && (
							<FeedbackForm
								onClose={() => setShowFeedbackForm(false)}
								onSuccess={() => {
									setFormStatus('success');
									setShowFeedbackForm(false);
								}}
								onError={() => setFormStatus('error')}
							/>
						)}

						{/* Complaint Form */}
						{showComplaintForm && formStatus === '' && (
							<ComplaintForm
								onClose={() => setShowComplaintForm(false)}
								onSuccess={() => {
									setFormStatus('success');
									setShowComplaintForm(false);
								}}
								onError={() => setFormStatus('error')}
							/>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
