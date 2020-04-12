import React from 'react';
import { Avatar } from 'components';

const User = ({ user, visitProfile, ...rest }) => {
	const handleCompClick = () => {
		visitProfile();
	};
	return (
		<div onClick={handleCompClick} {...rest}>
			<Avatar src="/img/cam1.jpeg" />
			<p>
				<span>{user.username}</span>
			</p>
		</div>
	);
};

export default User;
