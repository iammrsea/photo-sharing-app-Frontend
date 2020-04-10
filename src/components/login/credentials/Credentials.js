import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { InputField } from 'components/material-fields';
import { Flat } from 'components/buttons';
import { Alert } from 'components';

export default ({ signUp }) => {
	const history = useHistory();

	const [emailOrUsername, setEmailOrUsername] = useState('');
	const [password, setPassword] = useState('');

	const signIn = () => {
		const errors = validateForm({ emailOrUsername, password });
		if (Object.keys(errors).length > 0) {
			const errorMsgs = [];
			for (let key in errors) {
				errorMsgs.push(errors[key]);
			}
			Alert({ message: errorMsgs.join(','), color: 'red' });
			return;
		}
		history.push('/');
	};
	const validateForm = (values) => {
		const errors = {};
		if (!values.emailOrUsername) {
			errors.email = 'Your email/username is required';
		} else if (!values.password) {
			errors.password = 'Password is required';
		}
		return errors;
	};
	return (
		<>
			<InputField
				value={emailOrUsername}
				onChange={(e) => setEmailOrUsername(e.target.value)}
				type="text"
				label="Email or Username"
				id="username"
				name="username"
				labelClassName="noactive"
			/>
			<InputField
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				label="Password"
				id="password"
				name="password"
				labelClassName="noactive"
			/>
			<div className="right-align">
				<Flat className="btn-auth" onClick={signIn}>
					Sign In
				</Flat>
				<Flat onClick={signUp} className="btn-auth">
					Sign Up
				</Flat>
			</div>
		</>
	);
};
