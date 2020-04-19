import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { InputField } from 'components/material-fields';
import { Flat } from 'components/buttons';
import { Alert } from 'components';
import { GET_SIGNING_IN_OR_UP, GET_AUTH_USER } from 'graphql/queries/local';

import { SIGN_IN_WITH_CREDENTIALS } from 'graphql/mutations/remote';
import { SET_SIGNING_IN_OR_UP } from 'graphql/mutations/local';

export default ({ signUp }) => {
	const {
		data: { signingInOrUp },
	} = useQuery(GET_SIGNING_IN_OR_UP);
	const history = useHistory();

	const [formSignIn, { loading }] = useMutation(SIGN_IN_WITH_CREDENTIALS);
	const [setLoading] = useMutation(SET_SIGNING_IN_OR_UP);

	const [emailOrUsername, setEmailOrUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		setLoading({
			variables: { state: loading },
		});
	}, [loading]);
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

		formSignIn({
			variables: {
				signinData: {
					emailOrUsername: emailOrUsername.trim(),
					password: password.trim(),
				},
			},
			update(cache, { data: { formSignIn } }) {
				const { authUser } = cache.readQuery({
					query: GET_AUTH_USER,
				});

				cache.writeData({
					data: { authUser: { ...authUser, ...formSignIn } },
				});
				localStorage.setItem('auth_user', JSON.stringify(formSignIn));
				setTimeout(() => {
					history.push('/');
				}, 0);
			},
		}).catch((e) => {
			if (e.graphQLErrors.length > 0) {
				Alert({ message: e.graphQLErrors[0].message, color: 'red' });
			} else Alert({ message: e.message, color: 'red' });
		});
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
				<Flat disabled={signingInOrUp} className="btn-auth" onClick={signIn}>
					Sign In
				</Flat>
				<Flat disabled={signingInOrUp} onClick={signUp} className="btn-auth">
					Sign Up
				</Flat>
			</div>
		</>
	);
};
