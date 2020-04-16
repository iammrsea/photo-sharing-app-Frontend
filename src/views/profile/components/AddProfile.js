import React, { useState } from 'react';
import { Modal, Alert, LinearProgress } from 'components';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { InputField } from 'components/material-fields';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { ADD_A_PHOTO, ADD_USER_PROFILE } from 'graphql/mutations/remote';

import { ADD_PHOTO_TO_LOCAL_STORE, SET_PHOTO_NOTIFICATIONS, UPDATE_ME_PROFILE } from 'graphql/mutations/local';
import { GET_AUTH_USER } from 'graphql/queries/local';
import { PHOTO_ADDED } from 'graphql/subscriptions';

export default ({ closeModal }) => {
	const [addUserProfile, { loading }] = useMutation(ADD_USER_PROFILE);
	const [updateMeProfile] = useMutation(UPDATE_ME_PROFILE);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const [file, setFile] = useState(null);
	const [description, setDescription] = useState('');

	const submitProfile = () => {
		const errors = validateForm({ file, description });

		if (Object.keys(errors).length > 0) {
			const errorMsgs = [];
			for (let key in errors) {
				errorMsgs.push(errors[key]);
			}
			Alert({ message: errorMsgs.join(','), color: 'red' });
			return;
		}

		// console.log('submitting', { owner: authUser.userId, picture: file, description });

		addUserProfile({
			variables: {
				profileData: {
					owner: authUser.userId,
					picture: file,
					about: description,
				},
			},
		})
			.then((res) => {
				setFile(null);
				setDescription('');
				closeModal();
				Alert({ message: 'Successfully Added', color: 'green' });
				const {
					data: { createProfile },
				} = res;
				updateMeProfile({
					variables: {
						userId: authUser.userId,
						profile: createProfile,
					},
				});
				// console.log('response ', res);
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log('error adding user profile', e);
			});
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
		}
		return errors;
	};

	return (
		<>
			<Modal title="Select" className="add-profile-modal">
				<div className="file-field input-field">
					<Flat className="upload-btn">
						<MaterialIcon children="add_a_photo" />
						<input type="file" onInput={handleFileInput} />
					</Flat>
					<div className="file-path-wrapper">
						<input
							className="file-path validate"
							placeholder="Select Profile Picture"
							type="text"
							onInput={handleFileInput}
						/>
					</div>
				</div>
				<InputField
					id="description"
					name="description"
					type="text"
					label="A little description about yourself"
					labelClassName="noactive"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>
				<div className="right-align">
					<Flat disabled={loading} className="btn-auth" onClick={submitProfile}>
						Save
					</Flat>
					<Flat disabled={loading} className="btn-auth" onClick={closeModal}>
						Cancel
					</Flat>
					{loading && <LinearProgress />}
				</div>
			</Modal>
		</>
	);
};
