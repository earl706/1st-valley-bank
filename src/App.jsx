import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import ChatBox from './components/ChatBox';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Effects from './pages/Effects';
import LoanQualification from './pages/LoanQualification';
import Branches from './pages/Branches';
import ATMLocator from './pages/ATMLocator';
import SearchResults from './pages/SearchResults';
import FAQPage from './pages/FAQPage';

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
		{
			component: <Effects />,
			route: '/effects'
		},
		{ component: <LoanQualification />, route: '/loan-qualification/:loanType' },
		{ component: <ConsumerProtectionHub />, route: '/consumer-protection-hub' },
		{ component: <Branches />, route: '/branches' },
		{ component: <ATMLocator />, route: '/atm-locator' },
		{ component: <SearchResults />, route: '/search' },
		{ component: <FAQPage />, route: '/faqs' },
		{ component: <Footer />, route: '/footer' }
	];

	return (
		<>
			{showSplash && <SplashScreen onComplete={handleSplashComplete} />}
			<Router>
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
