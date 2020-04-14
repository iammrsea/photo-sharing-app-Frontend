import React, { useState } from 'react';
import { Modal, Alert, LinearProgress } from 'components';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { InputField } from 'components/material-fields';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_A_PHOTO } from 'graphql/mutations/remote';

import { SET_SIGNING_IN_OR_UP } from 'graphql/mutations/local';
import { GET_SIGNING_IN_OR_UP, GET_AUTH_USER } from 'graphql/queries/local';

export default ({ closeModal }) => {
	const [addPhoto, { loading }] = useMutation(ADD_A_PHOTO);

	const [setLoading] = useMutation(SET_SIGNING_IN_OR_UP);

	const {
		data: { signingInOrUp },
	} = useQuery(GET_SIGNING_IN_OR_UP);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const [file, setFile] = useState(null);
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState('');
	const [category, setCategory] = useState('');

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

		setLoading({
			variables: { state: loading },
		});

		addPhoto({
			variables: {
				photoData: {
					ownerId: authUser.userId,
					photo: file,
					story: description,
					taggedUsers: !tags ? [] : tags.split('@').filter((v) => v !== ''),
					category,
				},
			},
		})
			.then((res) => {
				closeModal();
				console.log('response from server', res);
				Alert({ message: 'Successfully Added', color: 'green' });
				setLoading({
					variables: { state: false },
				});
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log('error sharing photo', e);
			});

		console.log('submitting', { file, description, category, tags });
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
			{signingInOrUp && <LinearProgress />}
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
						<option value="ACTION">ACTION</option>
						<option value="FUN">FUN</option>
						<option value="GRAPHIC">GRAPHIC</option>
						<option value="OTHER">OTHER</option>
					</select>
				</div>
				<InputField
					id="tags"
					name="tages"
					type="text"
					label="Tag others using @username"
					labelClassName="noactive"
					value={tags}
					onChange={(e) => setTags(e.target.value)}
				/>
				<div className="right-align">
					<Flat disabled={signingInOrUp} className="btn-auth" onClick={submitPhoto}>
						Share
					</Flat>
					<Flat disabled={signingInOrUp} className="btn-auth" onClick={closeModal}>
						Close
					</Flat>
				</div>
			</Modal>
		</>
	);
};
