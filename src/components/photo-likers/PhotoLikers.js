import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Modal, Avatar } from 'components';

import { Flat } from 'components/buttons';

import { Collection, CollectionItem } from 'components/collections';
import { PHOTO_LIKERS } from 'graphql/queries/remote';
import { GET_AUTH_USER } from 'graphql/queries/local';

const styles = {
	user: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		marginTop: 10,
	},
};
const User = ({ user, visitProfile }) => {
	return (
		<div style={styles.user} onClick={visitProfile}>
			<Avatar src={user.profile ? user.profile.picture : '/img/cam1.jpeg'} />
			<p>
				<span>{user.username}</span>
			</p>
		</div>
	);
};

export default ({ closeModal, ids, photoId }) => {
	const history = useHistory();

	// console.log('ids', ids);

	const [photoLikers, setLikers] = useState([]);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const client = useApolloClient();

	useEffect(() => {
		client
			.query({
				query: PHOTO_LIKERS,
				variables: {
					ids,
				},
			})
			.then((res) => {
				// console.log('likers and photoId ', res.data, photoId);
				setLikers(res.data.photoLikers);
			})
			.catch((e) => {
				console.log('likers error', e);
			});
	}, [ids]);

	const visitProfile = (id) => {
		closeModal();
		if (authUser.userId === id) {
			return history.push('/profile');
		}
		history.push('/profile/' + id, { id });
	};
	return (
		<>
			<Modal title="Users who liked the photo" className={'likers-modal' + photoId}>
				{photoLikers.length > 0 && (
					<Collection>
						{photoLikers.map((liker, i) => (
							<CollectionItem key={liker.id + i} style={{ backgroundColor: 'inherit' }}>
								<User user={liker} visitProfile={() => visitProfile(liker.id)} />
							</CollectionItem>
						))}
					</Collection>
				)}
				<div className="right-align">
					<Flat className="btn-auth" onClick={() => closeModal(photoId)}>
						Close
					</Flat>
				</div>
			</Modal>
		</>
	);
};
