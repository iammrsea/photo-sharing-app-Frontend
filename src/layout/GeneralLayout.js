import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default ({ children, openModal }) => {
	return (
		<>
			<Navbar openModal={openModal} />
			{children}
			<Footer />
		</>
	);
};
