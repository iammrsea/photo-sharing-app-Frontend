import React, { useState } from 'react';
import { Modal, Alert, LinearProgress } from 'components';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { InputField } from 'components/material-fields';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { ADD_A_PHOTO } from 'graphql/mutations/remote';

import { ADD_PHOTO_TO_LOCAL_STORE, SET_PHOTO_NOTIFICATIONS } from 'graphql/mutations/local';
import { GET_AUTH_USER } from 'graphql/queries/local';
import { PHOTO_ADDED } from 'graphql/subscriptions';

export default ({ closeModal }) => {
	const [addPhoto, { loading }] = useMutation(ADD_A_PHOTO);

	const [addPhotoToLocalStore] = useMutation(ADD_PHOTO_TO_LOCAL_STORE);

	const [notifyUsers] = useMutation(SET_PHOTO_NOTIFICATIONS);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const [file, setFile] = useState(null);
	const [description, setDescription] = useState('');

	const [category, setCategory] = useState('');

	useSubscription(PHOTO_ADDED, {
		onSubscriptionData({
			client: { cache },
			subscriptionData: {
				data: { photoAdded },
			},
		}) {
			if (photoAdded.owner.id === authUser.userId) return;

			notifyUsers({ variables: { notification: photoAdded } });
		},
	});

	const submitPhoto = () => {
		const errors = validateForm({ file, description, category });

		if (Object.keys(errors).length > 0) {
			const errorMsgs = [];
			for (let key in errors) {
				errorMsgs.push(errors[key]);
			}
			Alert({ message: errorMsgs.join(','), color: 'red' });
			return;
		}

		addPhoto({
			variables: {
				photoData: {
					owner: authUser.userId,
					photo: file,
					description,
					taggedUsers: [],
					category,
				},
			},
		})
			.then((res) => {
				setCategory('');
				setFile(null);
				setDescription('');
				closeModal();
				Alert({ message: 'Successfully Added', color: 'green' });

				addPhotoToLocalStore({ variables: { photo: res.data.createPhoto, userId: authUser.userId } });
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log('error sharing photo', e);
			});

		// console.log('submitting', { file, description, category, tags });
	};
	const handleFileInput = (e) => {
		setFile(e.target.files[0]);
	};

	const validateForm = (values) => {
		const errors = {};
		if (!values.file) {
			errors.file = 'You need to select a photo';
		} else if (!values.description) {
			errors.description = 'Please do write a description about your photo';
		} else if (!values.category) {
			errors.category = 'Select a category of your photo';
		}
		return errors;
	};

	return (
		<>
			<Modal title="Select">
				<div className="file-field input-field">
					<Flat className="upload-btn">
						<MaterialIcon children="add_a_photo" />
						<input type="file" onInput={handleFileInput} />
					</Flat>
					<div className="file-path-wrapper">
						<input className="file-path validate" type="text" onInput={handleFileInput} />
					</div>
				</div>
				<InputField
					id="description"
					name="description"
					type="text"
					label="A little description of your picture"
					labelClassName="noactive"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>
				<div className="input-field ">
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						id="category"
						name="category"
						style={{ display: 'block', background: 'inherit' }}
					>
						<option value="">Select Category</option>
						<option value="ACTION">Action</option>
						<option value="FUN">Fun</option>
						<option value="GRAPHIC">Graphic</option>
						<option value="OTHER">Other</option>
					</select>
				</div>

				<div className="right-align">
					<Flat disabled={loading} className="btn-auth" onClick={submitPhoto}>
						Share
					</Flat>
					<Flat disabled={loading} className="btn-auth" onClick={closeModal}>
						Close
					</Flat>
					{loading && <LinearProgress />}
				</div>
			</Modal>
		</>
	);
};
