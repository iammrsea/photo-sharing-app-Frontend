import React from 'react';
import { useLocation } from 'react-router-dom';

import Profile from 'views/profile/Profile';

const UserProfile = () => {
	const location = useLocation();

	return <Profile userId={location.state.id} />;
};

export default UserProfile;
