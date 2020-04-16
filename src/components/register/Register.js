import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { SET_SIGNING_IN_OR_UP } from 'graphql/mutations/local';
import { GET_SIGNING_IN_OR_UP } from 'graphql/queries/local';

import { InputField } from 'components/material-fields';
import { CardHeader, CardBody } from 'components/card';
import { Flat } from 'components/buttons';
import { SIGN_UP_USING_FORM } from 'graphql/mutations/remote';
import Alert from 'components/alert/Alert';

export default ({ signIn }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [password, setPassword] = useState('');

	const [setLoading] = useMutation(SET_SIGNING_IN_OR_UP);
	const [formSignUp, { loading }] = useMutation(SIGN_UP_USING_FORM);

	const {
		data: { signingInOrUp },
	} = useQuery(GET_SIGNING_IN_OR_UP);

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
		setLoading({
			variables: { state: loading },
		});
		formSignUp({
			variables: {
				signupData: {
					username: username.trim(),
					email: email.trim(),
					password: password.trim(),
				},
			},
		})
			.then((res) => {
				Alert({ message: 'You can now sign in', color: 'green' });
				setLoading({
					variables: { state: false },
				});
				signIn();
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log('error signing up', e);
			});
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
					<Flat disabled={signingInOrUp} className="btn-auth" onClick={signUp}>
						Sign Up
					</Flat>
					<Flat disabled={signingInOrUp} onClick={signIn} className="btn-auth">
						Sign In
					</Flat>
				</div>
			</CardBody>
		</>
	);
};
