import React from 'react';
import Navbar from './Navbar';

export default ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};
