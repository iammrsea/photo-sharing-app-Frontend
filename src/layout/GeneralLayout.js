import React from 'react';
import Navbar from './Navbar';

export default ({ children, openModal }) => {
	return (
		<>
			<Navbar openModal={openModal} />
			{children}
		</>
	);
};
