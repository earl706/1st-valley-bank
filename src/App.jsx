import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import ChatBox from './components/ChatBox';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import AboutUs from './pages/AboutUs';
import ConsumerProtection from './pages/ConsumerProtection';
import ConsumerProtectionPrivacyPolicy from './pages/ConsumerProtectionPrivacyPolicy';
import ConsumerProtection1VBProducts from './pages/ConsumerProtection1VBProducts';
import ConsumerProtectionProductRequirements from './pages/ConsumerProtectionProductRequirements';
import ConsumerProtectionHub from './pages/ConsumerProtectionHub';
import OneVBAdvisory from './pages/OneVBAdvisory';
import Newsletter from './pages/Newsletter';
import NewsletterDetail from './pages/NewsletterDetail';
import Footer from './components/Footer';
import Deposits from './pages/Deposits';
import Loans from './pages/Loans';
import PropertiesForSale from './pages/PropertiesForSale';
import ContactUs from './pages/ContactUs';
import DepositsRegularSavings from './pages/DepositsRegularSavings';
import DepositsSpecialSavings from './pages/DepositsSpecialSavings';
import SavingsAccount from './pages/SavingsAccount';
import CheckingAccount from './pages/CheckingAccount';
import TimeDeposit from './pages/TimeDeposit';
import LoansAgriculture from './pages/LoansAgriculture';
import LoansSME from './pages/LoansSME';
import LoansMicrofinance from './pages/LoansMicrofinance';
import LoansSUCRE from './pages/LoansSUCRE';
import LoansGoldAndGems from './pages/LoansGoldAndGems';
import LoansSBL from './pages/LoansSBL';
import LoansSalary from './pages/LoansSalary';
import PropertiesForSaleVehicles from './pages/PropertiesForSaleVehicles';
import PropertiesForSaleRealEstate from './pages/PropertiesForSaleRealEstate';
import LoanQualification from './pages/LoanQualification';
import Branches from './pages/Branches';
import ATMLocator from './pages/ATMLocator';
import SearchResults from './pages/SearchResults';
import FAQPage from './pages/FAQPage';

// Newly imported pages for additional routes
import Sustainability from './pages/about-us/Sustainability';
import Careers from './pages/about-us/Careers';
import Overview from './pages/about-us/Overview';
import History from './pages/about-us/History';
import WhyChooseUs from './pages/about-us/WhyChooseUs';
import Services from './pages/about-us/Services';
import Awards from './pages/about-us/Awards';
import VisionMission from './pages/about-us/VisionMission';
import Leadership from './pages/about-us/Leadership';
import AnnualReports from './pages/about-us/AnnualReports';
import { trackPageView } from './analytics/ga4';

function AnalyticsListener() {
	const location = useLocation();

	useEffect(() => {
		trackPageView(`${location.pathname}${location.search}`);
	}, [location.pathname, location.search]);

	return null;
}

function App() {
	const [showSplash, setShowSplash] = useState(false);
	const [isFirstVisit, setIsFirstVisit] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsFirstVisit(true);
		setShowSplash(true);
	}, []);

	const handleSplashComplete = () => {
		setShowSplash(false);
	};

	const routes = [
		{ component: <HomePage />, route: '/' },
		{ component: <ConsumerProtection />, route: '/consumer-protection' },
		{
			component: <ConsumerProtectionPrivacyPolicy />,
			route: '/consumer-protection/privacy-policy'
		},
		{
			component: <ConsumerProtection1VBProducts />,
			route: '/consumer-protection/1vb-products'
		},
		{
			component: <ConsumerProtectionProductRequirements />,
			route: '/consumer-protection/product-requirements'
		},
		{
			component: <AboutUs />,
			route: '/about-us'
		},
		{
			component: <OneVBAdvisory />,
			route: '/1vb-advisory'
		},
		{
			component: <Newsletter />,
			route: '/newsletter'
		},
		{
			component: <NewsletterDetail />,
			route: '/newsletter/:id'
		},
		{
			component: <Deposits />,
			route: '/deposits'
		},
		{
			component: <DepositsRegularSavings />,
			route: '/deposits/regular-savings'
		},
		{
			component: <DepositsSpecialSavings />,
			route: '/deposits/special-savings'
		},
		{
			component: <SavingsAccount />,
			route: '/deposits/savings-account'
		},
		{
			component: <CheckingAccount />,
			route: '/deposits/checking-account'
		},
		{
			component: <TimeDeposit />,
			route: '/deposits/time-deposit'
		},
		{ component: <Loans />, route: '/loans' },
		{
			component: <LoansAgriculture />,
			route: '/loans/agriculture'
		},
		{
			component: <LoansSME />,
			route: '/loans/small-and-medium-enterprises'
		},
		{
			component: <LoansMicrofinance />,
			route: '/loans/microfinance'
		},
		{
			component: <LoansSUCRE />,
			route: '/loans/supervised-credit'
		},
		{
			component: <LoansGoldAndGems />,
			route: '/loans/gold-and-gems'
		},
		{
			component: <LoansSBL />,
			route: '/loans/small-business-loan'
		},
		{
			component: <LoansSalary />,
			route: '/loans/salary'
		},
		{
			component: <PropertiesForSale />,
			route: '/properties-for-sale'
		},
		{
			component: <PropertiesForSaleVehicles />,
			route: '/properties-for-sale/vehicles'
		},
		{
			component: <PropertiesForSaleRealEstate />,
			route: '/properties-for-sale/real-estate-and-other-properties-acquired-for-sale'
		},
		{
			component: <ContactUs />,
			route: '/contact-us'
		},
		{ component: <LoanQualification />, route: '/loan-qualification/:loanType' },
		{ component: <ConsumerProtectionHub />, route: '/consumer-protection-hub' },
		{ component: <Branches />, route: '/branches' },
		{ component: <ATMLocator />, route: '/atm-locator' },
		{ component: <SearchResults />, route: '/search' },
		{ component: <FAQPage />, route: '/faqs' },
		{ component: <Footer />, route: '/footer' },
		// About Us section routes
		{ component: <Overview />, route: '/about-us/overview' },
		{ component: <History />, route: '/about-us/history' },
		{ component: <WhyChooseUs />, route: '/about-us/why-choose-us' },
		{ component: <Services />, route: '/about-us/services' },
		{ component: <Awards />, route: '/about-us/awards' },
		{ component: <VisionMission />, route: '/about-us/vision-mission' },
		{ component: <Leadership />, route: '/about-us/leadership' },
		{ component: <AnnualReports />, route: '/about-us/annual-reports' },
		{ component: <Sustainability />, route: '/about-us/sustainability' },
		{ component: <Careers />, route: '/about-us/careers' }
	];

	return (
		<>
			{showSplash && <SplashScreen onComplete={handleSplashComplete} />}
			<Router>
				<AnalyticsListener />
				<Routes>
					{routes.map((route, index) => (
						<Route key={index} path={route.route} element={<Navbar>{route.component}</Navbar>} />
					))}
				</Routes>
			</Router>
		</>
	);
}

export default App;
