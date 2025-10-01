import React from 'react';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from '../components/Carousel';
import HeroSection from '../components/HeroSection';
import carouselImg1 from '/src/assets/carousel/1.png';

export default function OneVBAdvisory() {
	return (
		<>
			<main className="flex flex-col gap-[40px] pb-[50px] lg:gap-[80px]">
				<HeroSection
					title="1VB Advisory"
					subtitle=""
					description="Navigate your financial journey with confidence through 1VB Advisory! Our expert team
							is here to guide you with personalized advice, smart strategies, and tailored
							solutions. Whether planning investments, managing loans, or growing your wealth, 1VB
							Advisory empowers you to make informed decisions and secure a brighter financial
							future. Your success, our mission!"
					features={[]}
					image={carouselImg1}
					imageAlt="1VB Advisory"
				/>

				<section id="carousel" className="lg:mx-auto">
					<Carousel />
				</section>
			</main>
		</>
	);
}
