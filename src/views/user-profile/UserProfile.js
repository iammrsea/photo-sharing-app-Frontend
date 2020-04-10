import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'components';

const UserProfile = () => {
	const location = useLocation();
	console.log('location', location);
	return (
		<Container>
			<h2>Welcome to user profile ID is {location.state.id}</h2>
		</Container>
	);
};

export default UserProfile;
