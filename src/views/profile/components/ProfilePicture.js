import React from 'react';

const ProfilePicture = ({ profile }) => {
	return (
		<div className="profile">
			<img src={profile ? profile.picture : '/img/cam1.jpeg'} alt="" id="cover" />
			<img src={profile ? profile.picture : '/img/cam4.jpeg'} id="profile-avatar" />
		</div>
	);
};
export default ProfilePicture;
