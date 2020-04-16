import React, { useState } from 'react';
import { Alert, LinearProgress } from 'components';
import { Flat } from 'components/buttons';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EDIT_USER_PROFILE } from 'graphql/mutations/remote';

import { UPDATE_ME_PROFILE } from 'graphql/mutations/local';
import { GET_AUTH_USER } from 'graphql/queries/local';

import { Card, CardBody } from 'components/card';

export default ({ about, profileId, showEditProfile }) => {
	const [editUserProfile, { loading }] = useMutation(EDIT_USER_PROFILE);
	const [updateMeProfile] = useMutation(UPDATE_ME_PROFILE);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const [description, setDescription] = useState(about);

	const submitProfile = () => {
		const errors = validateForm({ description });

		if (Object.keys(errors).length > 0) {
			const errorMsgs = [];
			for (let key in errors) {
				errorMsgs.push(errors[key]);
			}
			Alert({ message: errorMsgs.join(','), color: 'red' });
			return;
		}

		// console.log('submitting', { owner: authUser.userId, picture: file, description });

		editUserProfile({
			variables: {
				id: profileId,
				about: description,
			},
		})
			.then((res) => {
				setDescription('');
				showEditProfile(false);
				Alert({ message: 'Successfully Added', color: 'green' });
				const {
					data: { editProfile },
				} = res;
				// console.log('editProfile', editProfile);
				updateMeProfile({
					variables: {
						userId: authUser.userId,
						profile: editProfile,
					},
				});
				// console.log('response ', res);
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log('error adding user profile', e);
			});
	};

	const validateForm = (values) => {
		const errors = {};
		if (!values.description) {
			errors.description = 'Please do write a description about your photo';
		}
		return errors;
	};

	return (
		<>
			<Card>
				<CardBody>
					<div className="input-field ">
						<textarea
							id="profile-description"
							className="materialize-textarea"
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						></textarea>
						<label htmlFor="profile-description" className="active">
							Edit about yourself
						</label>
					</div>

					<div className="right-align">
						<Flat disabled={loading} className="btn-auth" onClick={submitProfile}>
							Save
						</Flat>

						{loading && <LinearProgress />}
					</div>
				</CardBody>
			</Card>
		</>
	);
};
