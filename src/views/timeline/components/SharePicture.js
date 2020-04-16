import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER_INFO } from 'graphql/queries/remote';

import { Card, CardBody, CardHeader, CardAction } from 'components/card';
import { Avatar } from 'components';
import { MaterialIcon } from 'components/icons';
import { Flat } from 'components/buttons';

import './SharePicture.css';

import SelectPicture from './SelectPicture';

export default ({ me }) => {
	// console.log('me', me);

	const modal = React.useRef(null);

	React.useEffect(() => {
		const elems = document.querySelectorAll('.modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);
		modal.current = instances[0];
	});
	const openModal = () => {
		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};
	return (
		<>
			<Card id="share-picture-card">
				<CardHeader className="grey lighten-5" id="share-picture-header">
					<span>Share a picture</span>
				</CardHeader>

				<CardBody>
					<div className="avatar-container">
						<Avatar src={me.profile ? me.profile.picture : '/img/cam1.jpeg'} />
						<span>Would you like to share a picture?</span>
					</div>
				</CardBody>
				<CardAction className="center" id="share-picture-action">
					<Flat className=" btn-auth" onClick={openModal}>
						<MaterialIcon children="add_a_photo" style={{ fontSize: 30 }} />
					</Flat>
				</CardAction>
				<SelectPicture closeModal={closeModal} />
			</Card>
		</>
	);
};
