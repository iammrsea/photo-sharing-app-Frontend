import React, { useState } from 'react';
import { Alert, LinearProgress } from 'components';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EDIT_USER_PROFILE_PICTURE } from 'graphql/mutations/remote';

import { UPDATE_ME_PROFILE } from 'graphql/mutations/local';
import { GET_AUTH_USER } from 'graphql/queries/local';

import { Card } from 'components/card';

export default ({ profileId, showChangeProfilePic }) => {
	const [editUserProfilePicture, { loading }] = useMutation(EDIT_USER_PROFILE_PICTURE);
	const [updateMeProfile] = useMutation(UPDATE_ME_PROFILE);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const [file, setFile] = useState(null);

	const submitProfile = () => {
		const errors = validateForm({ file });

		if (Object.keys(errors).length > 0) {
			const errorMsgs = [];
			for (let key in errors) {
				errorMsgs.push(errors[key]);
			}
			Alert({ message: errorMsgs.join(','), color: 'red' });
			return;
		}

		// console.log('submitting', { owner: authUser.userId, picture: file, description });

		editUserProfilePicture({
			variables: {
				id: profileId,
				picture: file,
			},
		})
			.then((res) => {
				setFile(null);
				showChangeProfilePic(false);
				Alert({ message: 'Successfully Added', color: 'green' });
				const {
					data: { editProfilePicture },
				} = res;
				// console.log('new profile picture', editProfilePicture);
				updateMeProfile({
					variables: {
						userId: authUser.userId,
						profile: editProfilePicture,
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
		}
		return errors;
	};

	return (
		<Card>
			<div className="file-field input-field">
				<Flat className="upload-btn">
					<MaterialIcon children="add_a_photo" />
					<input type="file" onInput={handleFileInput} />
				</Flat>
				<div className="file-path-wrapper">
					<input
						className="file-path validate"
						placeholder="Select Another Profile Picture"
						type="text"
						onInput={handleFileInput}
					/>
				</div>
			</div>

			<div className="right-align">
				<Flat disabled={loading} className="btn-auth" onClick={submitProfile}>
					Save
				</Flat>

				{loading && <LinearProgress />}
			</div>
		</Card>
	);
};
