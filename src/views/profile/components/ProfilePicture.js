import React from 'react';

const ProfilePicture = ({ profile }) => {
	return (
		<div className="profile">
			<img src={profile ? profile.picture : '/img/cam1.jpeg'} alt="some profile" id="cover" />
			<img src={profile ? profile.picture : '/img/cam4.jpeg'} alt="some profile" id="profile-avatar" />
		</div>
	);
};
export default ProfilePicture;
