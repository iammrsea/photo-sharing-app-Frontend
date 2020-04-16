import React from 'react';
import { CollectionItem } from 'components/collections';
import { Avatar } from 'components';

const styles = {
	user: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		marginTop: 10,
	},
};

const Notification = ({ notification, handleNotificationClicked }) => {
	return (
		<CollectionItem onClick={() => handleNotificationClicked(notification)}>
			<div style={styles.user}>
				<Avatar src={notification.owner.profile ? notification.owner.profile.picture : '/img/cam1.jpeg'} />
				<p>
					<span>{notification.description ? notification.description : 'Blablablablaalbbla'}</span>
				</p>
			</div>
		</CollectionItem>
	);
};

export default Notification;
