import React, { useState } from 'react';

import { InputField } from 'components/material-fields';
import { CardHeader, CardBody } from 'components/card';
import { Flat } from 'components/buttons';
import { LinearProgress, Alert } from 'components';

export default ({ signIn }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const signUp = () => {
		const errors = validateForm({ email, username, confirmPass, password });

		if (Object.keys(errors).length > 0) {
			const errorMsgs = [];
			for (let key in errors) {
				errorMsgs.push(errors[key]);
			}
			Alert({ message: errorMsgs.join(','), color: 'red' });
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		console.log('values', { email, username, password, confirmPass });
		return;
	};

	const validateForm = (values) => {
		const errors = {};
		if (!values.email) {
			errors.email = 'Your email is required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Your email is invalid';
		} else if (!values.username) {
			errors.username = 'Your username is required';
		} else if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 8) {
			errors.password = 'Password length must be greater than 7';
		} else if (!values.confirmPass) {
			errors.confirmPass = 'Re-enter password to confirm';
		} else if (values.confirmPass !== values.password) {
			errors.confirmPass = 'Password and confirm password fields must be the same';
		}
		return errors;
	};
	return (
		<>
			{loading && <LinearProgress />}
			<CardBody>
				<CardHeader className="pink-text center-align" style={{ marginBottom: 20 }}>
					<span style={{ fontWeight: 600 }}>Sign Up</span>
				</CardHeader>
				<InputField
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					label="Email "
					id="email"
					name="email"
					labelClassName="noactive"
				/>
				<InputField
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					label="Username"
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
				<InputField
					type="password"
					label="Confirm Password"
					id="confirmPass"
					name="confirmPass"
					labelClassName="noactive"
					value={confirmPass}
					onChange={(e) => setConfirmPass(e.target.value)}
				/>
				<div className="right-align">
					<Flat className="btn-auth" onClick={signUp}>
						Sign Up
					</Flat>
					<Flat onClick={signIn} className="btn-auth">
						Sign In
					</Flat>
				</div>
			</CardBody>
		</>
	);
};
