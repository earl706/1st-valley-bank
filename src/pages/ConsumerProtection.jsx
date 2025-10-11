import React from 'react';
import {
	faFileSignature,
	faFingerprint,
	faGem,
	faTruck,
	faUnlock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import ConsumerProtectionPrivacyPolicy from './ConsumerProtectionPrivacyPolicy';

export default function ConsumerProtection() {
	return (
		<>
			<main className="flex flex-col">
				<ConsumerProtectionPrivacyPolicy />
			</main>
		</>
	);
}
