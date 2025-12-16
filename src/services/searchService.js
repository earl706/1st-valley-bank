/**
 * Search Service
 * Handles global search functionality across all site content
 */

import depositService from './depositService';
import loanService from './loanService';
import propertyService from './propertyService';
import locationService from './locationService';
import landingService from './landingService';
import newsletterService from './newsletterService';

// Helper function to normalize search query
const normalizeQuery = (query) => query.trim().toLowerCase();

// Helper function to check if text matches query
const matchesQuery = (text, query) => {
	if (!text || !query) return false;
	return normalizeQuery(text).includes(normalizeQuery(query));
};

// Helper function to search in object fields
const searchInObject = (obj, query, searchFields) => {
	return searchFields.some((field) => {
		const value = obj[field];
		if (typeof value === 'string') {
			return matchesQuery(value, query);
		}
		if (Array.isArray(value)) {
			return value.some((item) => matchesQuery(String(item), query));
		}
		return false;
	});
};

// Map deposit product_type to frontend route
const getDepositRoute = (productType) => {
	const routeMap = {
		savings: '/deposits/regular-savings',
		regular_savings: '/deposits/regular-savings',
		special_savings: '/deposits/special-savings',
		checking: '/deposits/checking-account',
		checking_account: '/deposits/checking-account',
		savings_account: '/deposits/savings-account',
		time_deposit: '/deposits/time-deposit',
		td: '/deposits/time-deposit'
	};
	return routeMap[productType?.toLowerCase()] || '/deposits';
};

// Map loan loan_type to frontend route
const getLoanRoute = (loanType) => {
	const routeMap = {
		agriculture: '/loans/agriculture',
		sme: '/loans/small-and-medium-enterprises',
		small_and_medium_enterprises: '/loans/small-and-medium-enterprises',
		microfinance: '/loans/microfinance',
		supervised_credit: '/loans/supervised-credit',
		sucre: '/loans/supervised-credit',
		gold_and_gems: '/loans/gold-and-gems',
		small_business: '/loans/small-business-loan',
		sbl: '/loans/small-business-loan',
		salary: '/loans/salary'
	};
	return routeMap[loanType?.toLowerCase()] || '/loans';
};

// Format operating hours for display
const formatOperatingHours = (hours) => {
	if (!hours || typeof hours !== 'object') return '';
	const entries = Object.entries(hours).slice(0, 2); // Show first 2 days
	return entries.map(([day, time]) => `${day}: ${time}`).join(', ');
};

const searchService = {
	/**
	 * Perform global search across all content types
	 * @param {string} query - Search query
	 * @returns {Promise<Object>} Search results grouped by category
	 */
	async search(query) {
		if (!query || !query.trim()) {
			return {
				success: true,
				data: {
					deposits: [],
					loans: [],
					properties: [],
					branches: [],
					atms: [],
					faqs: [],
					newsletters: [],
					pages: []
				}
			};
		}

		const normalizedQuery = normalizeQuery(query);
		const results = {
			deposits: [],
			loans: [],
			properties: [],
			branches: [],
			atms: [],
			faqs: [],
			newsletters: [],
			pages: []
		};

		try {
			// Search deposits
			try {
				const depositsResponse = await depositService.getDepositProducts({
					search: query,
					pageSize: 20,
					isActive: true
				});
				if (depositsResponse?.results) {
					results.deposits = depositsResponse.results.map((deposit) => ({
						id: deposit.id,
						title: deposit.name,
						subtitle: deposit.subtitle || '',
						description: deposit.description || '',
						type: 'deposit',
						path: getDepositRoute(deposit.product_type),
						keywords: [
							deposit.name,
							deposit.subtitle,
							deposit.product_type,
							...(deposit.features || [])
						].filter(Boolean),
						metadata: {
							product_type: deposit.product_type,
							interest_rate: deposit.interest_rate_above || deposit.interest_rate_below,
							initial_deposit: deposit.required_initial_deposit
						}
					}));
				}
			} catch (err) {
				console.error('Error searching deposits:', err);
			}

			// Search loans
			try {
				const loanTypes = [
					'agriculture',
					'sme',
					'microfinance',
					'supervised_credit',
					'gold_and_gems',
					'small_business',
					'salary'
				];
				const allLoans = [];
				for (const loanType of loanTypes) {
					try {
						const loansResponse = await loanService.getByType(loanType, {
							search: query,
							is_active: true
						});
						if (loansResponse?.results) {
							allLoans.push(...loansResponse.results);
						}
					} catch (err) {
						// Continue with other loan types
					}
				}
				results.loans = allLoans.map((loan) => ({
					id: loan.id,
					title: loan.name,
					subtitle: loan.subtitle || '',
					description: loan.description || '',
					type: 'loan',
					path: getLoanRoute(loan.loan_type),
					keywords: [loan.name, loan.subtitle, loan.loan_type, ...(loan.features || [])].filter(
						Boolean
					),
					metadata: {
						loan_type: loan.loan_type,
						interest_rate: loan.interest_rate,
						max_amount: loan.max_amount
					}
				}));
			} catch (err) {
				console.error('Error searching loans:', err);
			}

			// Search properties
			try {
				const propertiesResponse = await propertyService.getProperties({
					search: query,
					status: 'available',
					page_size: 20
				});
				if (propertiesResponse?.success && propertiesResponse?.data?.results) {
					results.properties = propertiesResponse.data.results.map((property) => ({
						id: property.id,
						title: property.title || property.property_type,
						subtitle: property.location || '',
						description: property.description || '',
						type: 'property',
						path: `/properties-for-sale/${property.property_type === 'vehicle' ? 'vehicles' : 'real-estate-and-other-properties-acquired-for-sale'}/${property.id}`,
						keywords: [
							property.title,
							property.location,
							property.property_type,
							property.status
						].filter(Boolean)
					}));
				}
			} catch (err) {
				console.error('Error searching properties:', err);
			}

			// Search branches
			try {
				const branchesResponse = await locationService.getBranches({
					is_active: true
				});
				if (branchesResponse?.success && branchesResponse?.data) {
					const branches = Array.isArray(branchesResponse.data)
						? branchesResponse.data
						: branchesResponse.data.results || [];
					results.branches = branches
						.filter((branch) =>
							searchInObject(branch, query, [
								'name',
								'branch_name',
								'address',
								'city',
								'province',
								'region',
								'phone_number',
								'email'
							])
						)
						.map((branch) => {
							const branchName = branch.name || branch.branch_name || 'Branch';
							const address = branch.address || '';
							const region = branch.region || '';
							const phone = branch.phone_number || '';
							const email = branch.email || '';
							const hours = formatOperatingHours(branch.operating_hours);
							const hasATM = branch.has_atm ? 'Has ATM' : '';
							const isMain = branch.is_main_office ? 'Main Office' : '';

							// Build detailed description
							const details = [
								address,
								region ? `Region: ${region}` : '',
								phone ? `Phone: ${phone}` : '',
								email ? `Email: ${email}` : '',
								hours ? `Hours: ${hours}` : '',
								hasATM,
								isMain
							].filter(Boolean);

							return {
								id: branch.id,
								title: branchName,
								subtitle: address || region || '',
								description: details.join(' • ') || 'Branch location',
								type: 'branch',
								path: '/branches',
								keywords: [
									branchName,
									address,
									region,
									phone,
									email,
									...(branch.city ? [branch.city] : []),
									...(branch.province ? [branch.province] : [])
								].filter(Boolean),
								metadata: {
									phone: phone,
									email: email,
									region: region,
									has_atm: branch.has_atm,
									is_main_office: branch.is_main_office,
									operating_hours: hours
								}
							};
						});
				}
			} catch (err) {
				console.error('Error searching branches:', err);
			}

			// Search ATMs
			try {
				const atmsResponse = await locationService.getATMs({
					is_24_hours: undefined // Get all ATMs
				});
				if (atmsResponse?.success && atmsResponse?.data) {
					const atms = Array.isArray(atmsResponse.data)
						? atmsResponse.data
						: atmsResponse.data.results || [];
					results.atms = atms
						.filter((atm) =>
							searchInObject(atm, query, ['name', 'location', 'address', 'city', 'province'])
						)
						.map((atm) => {
							const atmName = atm.name || atm.location || 'ATM';
							const address = atm.address || '';
							const hours = formatOperatingHours(atm.operating_hours);
							const is24Hours = atm.is_24_hours ? '24/7 Available' : '';
							const branchName = atm.branch?.name || atm.branch_name || '';

							// Build detailed description
							const details = [
								address,
								branchName ? `At: ${branchName}` : '',
								is24Hours || (hours ? `Hours: ${hours}` : '')
							].filter(Boolean);

							return {
								id: atm.id,
								title: atmName,
								subtitle: address || branchName || '',
								description: details.join(' • ') || 'ATM location',
								type: 'atm',
								path: '/atm-locator',
								keywords: [
									atmName,
									address,
									branchName,
									...(atm.city ? [atm.city] : []),
									...(atm.province ? [atm.province] : [])
								].filter(Boolean),
								metadata: {
									is_24_hours: atm.is_24_hours,
									operating_hours: hours,
									branch: branchName
								}
							};
						});
				}
			} catch (err) {
				console.error('Error searching ATMs:', err);
			}

			// Search FAQs
			try {
				const faqsResponse = await landingService.getFaqs();
				if (faqsResponse?.data) {
					const faqs = Array.isArray(faqsResponse.data)
						? faqsResponse.data
						: faqsResponse.data.results || [];
					results.faqs = faqs
						.filter((faq) => searchInObject(faq, query, ['question', 'answer', 'category']))
						.map((faq) => ({
							id: faq.id,
							title: faq.question,
							subtitle: faq.category || '',
							description: faq.answer || '',
							type: 'faq',
							path: '/about-us#faqs',
							keywords: [faq.question, faq.answer, faq.category].filter(Boolean)
						}));
				}
			} catch (err) {
				console.error('Error searching FAQs:', err);
			}

			// Search newsletters
			try {
				const newslettersResponse = await newsletterService.getNewsletters({
					search: query,
					status: 'published',
					page_size: 10
				});
				if (newslettersResponse?.results) {
					results.newsletters = newslettersResponse.results.map((newsletter) => ({
						id: newsletter.id,
						title: newsletter.subject || newsletter.title,
						subtitle: newsletter.created_at
							? new Date(newsletter.created_at).toLocaleDateString()
							: '',
						description: newsletter.content || newsletter.html_content || '',
						type: 'newsletter',
						path: `/newsletter/${newsletter.id}`,
						keywords: [newsletter.subject, newsletter.title, newsletter.content].filter(Boolean)
					}));
				}
			} catch (err) {
				console.error('Error searching newsletters:', err);
			}

			return { success: true, data: results };
		} catch (error) {
			console.error('Global search error:', error);
			return { success: false, error: error.message || 'Search failed' };
		}
	},

	/**
	 * Get search suggestions for autocomplete
	 * @param {string} query - Search query
	 * @param {number} limit - Maximum number of suggestions per category
	 * @returns {Promise<Array>} Array of suggestion objects
	 */
	async getSuggestions(query, limit = 5) {
		if (!query || !query.trim() || query.trim().length < 2) {
			return [];
		}

		const normalizedQuery = normalizeQuery(query);
		const suggestions = [];

		try {
			// Search deposits (limited)
			try {
				const depositsResponse = await depositService.getDepositProducts({
					search: query,
					pageSize: limit,
					isActive: true
				});
				if (depositsResponse?.results) {
					depositsResponse.results.slice(0, limit).forEach((deposit) => {
						suggestions.push({
							id: `deposit-${deposit.id}`,
							title: deposit.name,
							subtitle: deposit.subtitle || 'Deposit Product',
							type: 'deposit',
							path: getDepositRoute(deposit.product_type),
							icon: 'Banknote'
						});
					});
				}
			} catch (err) {
				// Continue
			}

			// Search loans (limited)
			try {
				const loanTypes = ['salary', 'sbl', 'sme', 'agriculture', 'microfinance'];
				for (const loanType of loanTypes) {
					if (suggestions.length >= limit * 2) break;
					try {
						const loansResponse = await loanService.getByType(loanType, {
							search: query,
							is_active: true
						});
						if (loansResponse?.results) {
							loansResponse.results.slice(0, 2).forEach((loan) => {
								if (suggestions.length < limit * 2) {
									suggestions.push({
										id: `loan-${loan.id}`,
										title: loan.title,
										subtitle: getLoanRoute(loanType).replace('/loans/', '').replace(/-/g, ' '),
										type: 'loan',
										path: getLoanRoute(loanType),
										icon: 'CreditCard'
									});
								}
							});
						}
					} catch (err) {
						// Continue
					}
				}
			} catch (err) {
				// Continue
			}

			// Search branches (limited)
			try {
				const branchesResponse = await locationService.getBranches({
					page: 1,
					page_size: limit
				});
				if (branchesResponse?.success && branchesResponse.data) {
					const branches = Array.isArray(branchesResponse.data)
						? branchesResponse.data
						: [];
					branches
						.filter((branch) => matchesQuery(branch.name, query) || matchesQuery(branch.address, query))
						.slice(0, limit)
						.forEach((branch) => {
							suggestions.push({
								id: `branch-${branch.id}`,
								title: branch.name,
								subtitle: branch.address || 'Branch Location',
								type: 'branch',
								path: '/branches',
								icon: 'Building2'
							});
						});
				}
			} catch (err) {
				// Continue
			}

			// Add common page suggestions
			const commonPages = [
				{ title: 'About Us', path: '/about-us', keywords: ['about', 'company', 'history'] },
				{ title: 'Contact Us', path: '/contact-us', keywords: ['contact', 'support', 'help'] },
				{ title: 'Branches', path: '/branches', keywords: ['branch', 'location', 'atm'] },
				{ title: 'Deposits', path: '/deposits', keywords: ['deposit', 'savings', 'account'] },
				{ title: 'Loans', path: '/loans', keywords: ['loan', 'credit', 'finance'] }
			];

			commonPages.forEach((page) => {
				if (matchesQuery(page.title, query) || page.keywords.some((kw) => matchesQuery(kw, query))) {
					if (suggestions.length < limit * 3) {
						suggestions.push({
							id: `page-${page.path}`,
							title: page.title,
							subtitle: 'Page',
							type: 'page',
							path: page.path,
							icon: 'FileText'
						});
					}
				}
			});
		} catch (err) {
			console.error('Error getting suggestions:', err);
		}

		// Return limited suggestions, prioritizing exact matches
		return suggestions.slice(0, limit * 2);
	}
};

export default searchService;
