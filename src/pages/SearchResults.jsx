import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import searchService from '../services/searchService';
import {
	Loader2,
	Banknote,
	CreditCard,
	Home,
	Building2,
	Landmark,
	CircleHelp,
	Newspaper,
	FileText
} from 'lucide-react';

// Static site pages for routes that don't have dynamic content
const SITE_PAGES = [
	{
		title: 'Home',
		path: '/',
		keywords: [
			'home',
			'homepage',
			'main',
			'landing page',
			'main page',
			'site entrance',
			'welcome',
			'start page',
			'home page',
			'dashboard',
			'1vb home',
			'main menu',
			'site home',
			'beginning'
		]
	},
	{
		title: 'About Us',
		path: '/about-us',
		keywords: [
			'about',
			'about us',
			'company',
			'company info',
			'team',
			'mission',
			'vision',
			'history',
			'background',
			'who we are',
			'organization',
			'story',
			'corporate profile',
			'founders',
			'profile',
			'company mission',
			'company vision',
			'values',
			'bank info',
			'institution overview',
			'leadership',
			'accreditations'
		]
	},
	{
		title: 'Contact Us',
		path: '/contact-us',
		keywords: [
			'contact',
			'contact us',
			'get in touch',
			'email',
			'phone',
			'customer service',
			'support',
			'reach',
			'inquire',
			'inquiry',
			'address',
			'location',
			'hotline',
			'branches contact',
			'branch contacts',
			'assistance',
			'inquiries',
			'contact support',
			'feedback',
			'helpdesk'
		]
	},
	{
		title: 'Branches',
		path: '/branches',
		keywords: [
			'branches',
			'branch list',
			'locations',
			'branches near me',
			'offices',
			'branch locations',
			'find branch',
			'nearest branch',
			'office locations',
			'bank branches',
			'satellite office',
			'ATMs',
			'branch contact',
			'visayan branches',
			'branch locator'
		]
	},
	{
		title: 'ATM Locator',
		path: '/atm-locator',
		keywords: [
			'atm',
			'atm locator',
			'atm locations',
			'find atm',
			'nearest atm',
			'cash machine',
			'automated teller machine',
			'atm finder',
			'atm map',
			'cash withdrawal',
			'atm network',
			'locate atm'
		]
	},
	{
		title: 'Consumer Protection',
		path: '/consumer-protection',
		keywords: [
			'consumer',
			'consumer protection',
			'consumer help',
			'protection',
			'rights',
			'consumer rights',
			'consumer policies',
			'regulations',
			'complaints',
			'resolution',
			'customer protections',
			'customer rights',
			'client rights',
			'consumer laws',
			'legal help'
		]
	},
	{
		title: 'Consumer Protection Hub',
		path: '/consumer-protection-hub',
		keywords: [
			'consumer protection hub',
			'consumer hub',
			'hub',
			'consumer center',
			'protection center',
			'help center',
			'support hub',
			'complaints hub',
			'customer helpdesk',
			'consumer support'
		]
	},
	{
		title: 'Privacy Policy',
		path: '/consumer-protection/privacy-policy',
		keywords: [
			'privacy',
			'policy',
			'privacy policy',
			'data protection',
			'confidentiality',
			'personal information',
			'data privacy',
			'information security',
			'privacy statement',
			'GDPR',
			'personal data',
			'data usage',
			'privacy regulation',
			'user data',
			'client privacy'
		]
	},
	{
		title: '1VB Products',
		path: '/consumer-protection/1vb-products',
		keywords: [
			'1vb products',
			'products',
			'bank products',
			'financial products',
			'services',
			'offerings',
			'product list',
			'banking services',
			'solutions',
			'available products',
			'products and services',
			'accounts',
			'bank offerings',
			'portfolio',
			'product suite'
		]
	},
	{
		title: 'Product Requirements',
		path: '/consumer-protection/product-requirements',
		keywords: [
			'requirements',
			'product requirements',
			'account requirements',
			'eligibility',
			'qualifications',
			'criteria',
			'documents needed',
			'documents required',
			'needed documents',
			'application requirements',
			'how to apply',
			'who can apply',
			'supporting documents'
		]
	},
	{
		title: '1VB Advisory',
		path: '/1vb-advisory',
		keywords: [
			'advisory',
			'1vb advisory',
			'announcements',
			'updates',
			'notices',
			'alerts',
			'advisories',
			'news and updates',
			'urgent notice',
			'public notice',
			'important info',
			'bank advisory',
			'bank notices',
			'official announcement',
			'press release'
		]
	},
	{
		title: 'Newsletter',
		path: '/newsletter',
		keywords: [
			'newsletter',
			'news',
			'updates',
			'publications',
			'bulletin',
			'articles',
			'bank news',
			'newsletter signup',
			'mailing list',
			'ezine',
			'1vb news',
			'recent news',
			'announcements',
			'news feed',
			'latest stories',
			'media',
			'newsletter archive'
		]
	},
	{
		title: 'Deposits',
		path: '/deposits',
		keywords: [
			'deposits',
			'deposit',
			'deposit products',
			'savings',
			'deposit accounts',
			'save',
			'save money',
			'deposit services',
			'account opening',
			'funds deposit',
			'deposit options',
			'make a deposit',
			'deposit programs',
			'deposit banking'
		]
	},
	{
		title: 'Regular Savings',
		path: '/deposits/regular-savings',
		keywords: [
			'regular savings',
			'savings',
			'regular account',
			'basic savings',
			'savings account',
			'standard savings',
			'interest savings',
			'open savings account',
			'personal savings',
			'saving scheme',
			'savings interest',
			'low balance savings'
		]
	},
	{
		title: 'Special Savings',
		path: '/deposits/special-savings',
		keywords: [
			'special savings',
			'special account',
			'premium savings',
			'high interest savings',
			'special deposit',
			'special rates',
			'long-term savings',
			'time-based savings',
			'promotional savings',
			'exclusive savings',
			'bonus interest'
		]
	},
	{
		title: 'Savings Account',
		path: '/deposits/savings-account',
		keywords: [
			'savings account',
			'savings',
			'open savings',
			'deposit account',
			'save',
			'open account',
			'saving',
			'personal savings',
			'individual savings',
			'interest account',
			'bank savings'
		]
	},
	{
		title: 'Checking Account',
		path: '/deposits/checking-account',
		keywords: [
			'checking account',
			'checking',
			'current account',
			'check account',
			'demand deposit',
			'checking services',
			'write checks',
			'commercial account',
			'personal checking',
			'bank checks',
			'cheque account'
		]
	},
	{
		title: 'Time Deposit',
		path: '/deposits/time-deposit',
		keywords: [
			'time deposit',
			'td',
			'fixed deposit',
			'term deposit',
			'certificate of deposit',
			'cd',
			'lock-in deposit',
			'deposit for term',
			'long term deposit',
			'high yield deposit',
			'fixed term savings',
			'fixed interest deposit'
		]
	},
	{
		title: 'Loans',
		path: '/loans',
		keywords: [
			'loans',
			'loan',
			'apply for loan',
			'borrow',
			'borrow money',
			'credit',
			'lending',
			'financing',
			'loan services',
			'personal loan',
			'business loan',
			'loan application',
			'loan products',
			'loan options'
		]
	},
	{
		title: 'Agriculture Loan',
		path: '/loans/agriculture',
		keywords: [
			'agriculture loan',
			'agriculture',
			'farm loan',
			'farmers',
			'agri-financing',
			'farming',
			'agricultural loan',
			'agri loan',
			'agricultural financing',
			'farm credit',
			'farm support',
			'loan for farmers',
			'farm equipment loan',
			'agri borrowers'
		]
	},
	{
		title: 'SME Loan',
		path: '/loans/small-and-medium-enterprises',
		keywords: [
			'sme',
			'small business',
			'medium enterprise',
			'business loan',
			'sme loan',
			'msme',
			'enterprise loan',
			'company loan',
			'corporate lending',
			'business credit',
			'business financing',
			'entrepreneur loan',
			'loan for business',
			'sme financing'
		]
	},
	{
		title: 'Microfinance Loan',
		path: '/loans/microfinance',
		keywords: [
			'microfinance',
			'microfinance loan',
			'micro loan',
			'small loan',
			'micro credit',
			'microfinancing',
			'microloan',
			'small business finance',
			'micro capital',
			'loan for micro enterprise',
			'microentrepreneurs'
		]
	},
	{
		title: 'SUCRE Loan',
		path: '/loans/supervised-credit',
		keywords: [
			'sucre',
			'sucre loan',
			'supervised credit',
			'supervised loan',
			'supervised credit for rural enterprise',
			'rural finance',
			'farmers supervised loan',
			'agrarian loan',
			'supervised rural lending',
			'enterprise loan',
			'supervised financing'
		]
	},
	{
		title: 'Gold and Gems Loan',
		path: '/loans/gold-and-gems',
		keywords: [
			'gold and gems loan',
			'gold',
			'gold loan',
			'jewelry',
			'pawn',
			'gems',
			'gem loan',
			'pawnshop',
			'collateral',
			'jewelry loan',
			'secured loan',
			'asset based loan',
			'loan against gold',
			'loan for jewelry',
			'gold financing'
		]
	},
	{
		title: 'Small Business Loan',
		path: '/loans/small-business-loan',
		keywords: [
			'sbl',
			'small business loan',
			'business loan',
			'small business',
			'business financing',
			'entrepreneur loan',
			'commercial loan',
			'enterprise finance',
			'loan for startup',
			'business support loan'
		]
	},
	{
		title: 'Salary Loan',
		path: '/loans/salary',
		keywords: [
			'salary loan',
			'personal loan',
			'employee loan',
			'payroll loan',
			'cash loan',
			'salary advance',
			'loan for employees',
			'instant loan',
			'emergency loan',
			'loan for salaried'
		]
	},
	{
		title: 'Loan Qualification',
		path: '/loan-qualification',
		keywords: [
			'loan qualification',
			'qualify',
			'loan eligibility',
			'eligibility',
			'loan requirements',
			'can i qualify',
			'who can apply',
			'qualifications for loan',
			'loan pre-approval',
			'credit score',
			'application process',
			'loan criteria'
		]
	},
	{
		title: 'Properties for Sale',
		path: '/properties-for-sale',
		keywords: [
			'properties for sale',
			'properties',
			'real estate',
			'for sale',
			'foreclosed',
			'acquired assets',
			'foreclosure',
			'auction',
			'bank sale',
			'acquired properties',
			'asset sale',
			'property listing',
			'available properties',
			'sale'
		]
	},
	{
		title: 'Vehicles for Sale',
		path: '/properties-for-sale/vehicles',
		keywords: [
			'vehicles',
			'vehicles for sale',
			'autos',
			'cars',
			'auto',
			'vehicle sale',
			'car sale',
			'foreclosed vehicles',
			'foreclosed cars',
			'bank repo',
			'car listings',
			'acquired cars',
			'auction vehicles',
			'used cars',
			'auto sales'
		]
	},
	{
		title: 'Real Estate for Sale',
		path: '/properties-for-sale/real-estate-and-other-properties-acquired-for-sale',
		keywords: [
			'real estate',
			'real estate for sale',
			'property',
			'land',
			'house',
			'foreclosed property',
			'foreclosed real estate',
			'acquired assets',
			'ropa',
			'residential property',
			'commercial property',
			'property auction',
			'realty',
			'property listings',
			'asset sale'
		]
	}
];

// Simple function for matching query with titles and keywords (for static pages).
function searchPages(query) {
	if (!query) return [];
	const normalizedQuery = query.trim().toLowerCase();
	return SITE_PAGES.filter(
		(page) =>
			page.title.toLowerCase().includes(normalizedQuery) ||
			page.keywords.some((k) => k.includes(normalizedQuery))
	);
}

const CATEGORY_INFO = {
	deposits: { label: 'Deposit Products', icon: Banknote, color: 'bg-blue-500/20' },
	loans: { label: 'Loan Products', icon: CreditCard, color: 'bg-green-500/20' },
	properties: { label: 'Properties for Sale', icon: Home, color: 'bg-purple-500/20' },
	branches: { label: 'Branches', icon: Building2, color: 'bg-orange-500/20' },
	atms: { label: 'ATM Locations', icon: Landmark, color: 'bg-cyan-500/20' },
	faqs: { label: 'FAQs', icon: CircleHelp, color: 'bg-yellow-500/20' },
	newsletters: { label: 'Newsletters', icon: Newspaper, color: 'bg-red-500/20' },
	pages: { label: 'Pages', icon: FileText, color: 'bg-gray-500/20' }
};

export default function SearchResults() {
	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);
	const searchTerm = queryParam.get('q') || '';
	const [results, setResults] = useState({
		deposits: [],
		loans: [],
		properties: [],
		branches: [],
		atms: [],
		faqs: [],
		newsletters: [],
		pages: []
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const performSearch = async () => {
			if (!searchTerm.trim()) {
				setResults({
					deposits: [],
					loans: [],
					properties: [],
					branches: [],
					atms: [],
					faqs: [],
					newsletters: [],
					pages: []
				});
				return;
			}

			setLoading(true);
			setError(null);

			try {
				// Perform dynamic search
				const searchResponse = await searchService.search(searchTerm);

				if (searchResponse.success) {
					// Also search static pages
					const staticPages = searchPages(searchTerm).map((page) => ({
						id: page.path,
						title: page.title,
						subtitle: '',
						description: '',
						type: 'page',
						path: page.path,
						keywords: page.keywords
					}));

					setResults({
						...searchResponse.data,
						pages: staticPages
					});
				} else {
					setError(searchResponse.error || 'Search failed');
				}
			} catch (err) {
				console.error('Search error:', err);
				setError('An error occurred while searching. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		performSearch();
	}, [searchTerm]);

	// Calculate total results count
	const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

	return (
		<div className="bg-gradient-to-l from-[#396131] to-[#4a7c3a]">
			<div className="mx-auto min-h-[60vh] max-w-7xl p-8 py-24">
				<div className="mb-16 text-center">
					<h1 className="mb-4 text-5xl leading-tight font-bold text-white md:text-6xl">
						SEARCH RESULTS
					</h1>
					<div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-white to-[#E9F2EA]"></div>
				</div>
				{searchTerm === '' && (
					<div className="flex flex-col items-center justify-center py-10">
						<span className="mb-3 text-5xl leading-tight text-white/70">🔎</span>
						<p className="text-center text-base leading-relaxed font-normal text-white">
							Please enter a search query above.
						</p>
					</div>
				)}

				{loading && (
					<div className="flex flex-col items-center justify-center py-10">
						<Loader2 className="mb-3 h-12 w-12 animate-spin text-white/70" />
						<p className="text-center text-base leading-relaxed font-normal text-white">
							Searching...
						</p>
					</div>
				)}

				{error && (
					<div className="flex flex-col items-center justify-center py-10">
						<span className="mb-3 text-5xl leading-tight text-white/70">⚠️</span>
						<p className="text-center text-base leading-relaxed font-normal text-white">{error}</p>
					</div>
				)}

				{!loading && !error && searchTerm !== '' && totalResults === 0 && (
					<div className="flex flex-col items-center justify-center py-10">
						<span className="mb-3 text-5xl leading-tight text-white/70">😕</span>
						<p className="text-center text-base leading-relaxed font-normal text-white">
							No results found for{' '}
							<span className="leading-tight font-bold">&quot;{searchTerm}&quot;</span>.
						</p>
						<p className="mt-2 text-center text-sm leading-relaxed font-normal text-white/80">
							Try different keywords or check your spelling.
						</p>
					</div>
				)}

				{!loading && !error && totalResults > 0 && (
					<>
						<div className="mb-6 text-center">
							<p className="text-lg leading-relaxed font-normal text-white/90">
								Found <span className="leading-tight font-bold text-white">{totalResults}</span>{' '}
								result
								{totalResults !== 1 ? 's' : ''} for{' '}
								<span className="leading-tight font-bold text-white">&quot;{searchTerm}&quot;</span>
							</p>
						</div>
						<div className="space-y-8">
							{Object.entries(results).map(([category, items]) => {
								if (items.length === 0) return null;
								const categoryInfo = CATEGORY_INFO[category] || {
									label: category,
									icon: FileText,
									color: 'bg-gray-500/20'
								};
								const IconComponent = categoryInfo.icon;

								return (
									<div key={category}>
										<div className="mb-4 flex items-center gap-2">
											<IconComponent className="h-6 w-6 text-white" />
											<h2 className="text-2xl leading-tight font-bold text-white">
												{categoryInfo.label}
											</h2>
											<span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white">
												{items.length}
											</span>
										</div>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
											{items.map((item) => (
												<Link
													to={item.path}
													key={`${category}-${item.id}`}
													className="flex h-full cursor-pointer flex-col rounded-lg border border-white/10 bg-white/10 p-5 shadow transition-all duration-200 hover:bg-white/20 hover:shadow-lg"
												>
													<div className="mb-2 flex items-start justify-between">
														<h3 className="flex-1 text-lg leading-tight font-bold text-white">
															{item.title}
														</h3>
														<span className="ml-2 text-base leading-relaxed font-normal text-white/70">
															→
														</span>
													</div>
													{item.subtitle && (
														<p className="mb-2 text-sm leading-relaxed font-medium text-white/80">
															{item.subtitle}
														</p>
													)}
													{item.description && (
														<p className="mb-3 line-clamp-2 text-sm leading-relaxed font-normal text-white/70">
															{item.description.replace(/<[^>]*>/g, '').substring(0, 100)}
															{item.description.length > 100 ? '...' : ''}
														</p>
													)}
													{item.keywords && item.keywords.length > 0 && (
														<div className="mt-auto flex flex-wrap gap-2">
															{item.keywords.slice(0, 3).map((keyword, idx) => (
																<span
																	key={`${item.id}-keyword-${idx}`}
																	className="rounded-[10px] bg-white/10 px-2 py-1 text-xs font-normal text-white/80"
																>
																	{keyword}
																</span>
															))}
														</div>
													)}
												</Link>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
