import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_PHOTO_TO_LOCAL_STORE, REMOVE_PHOTO_FROM_LOCAL_STORE } from 'graphql/mutations/local';
import Notification from './components/Notification';
import { Modal } from 'components';
import { Collection } from 'components/collections';

const NotificationList = ({ notifications, closeModal }) => {
	const [addPhotoToLocalStore] = useMutation(ADD_PHOTO_TO_LOCAL_STORE);
	const [removePhotoFromLocalStore] = useMutation(REMOVE_PHOTO_FROM_LOCAL_STORE);

	const handleNotificationClick = (photo) => {
		closeModal();
		addPhotoToLocalStore({ variables: { photo } });
		removePhotoFromLocalStore({ variables: { photo } });
	};
	const notificationItems = notifications.map((notification) => (
		<Notification
			handleNotificationClicked={handleNotificationClick}
			key={notification.id}
			notification={notification}
		/>
	));

	return (
		<Modal className="notifications-modal" title="Photos just shared by users, click to see">
			<Collection>{notificationItems}</Collection>
		</Modal>
	);
};

export default NotificationList;
