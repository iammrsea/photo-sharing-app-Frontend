import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SET_AUTH_USER } from 'graphql/mutations/local';

export default () => {
	const [removeAuthUser] = useMutation(SET_AUTH_USER);
	const history = useHistory();

	const signOut = () => {
		removeAuthUser({
			variables: {
				user: {
					userId: '',
					token: '',
					__typename: 'AuthResponse',
				},
			},
		}).then((res) => {
			localStorage.removeItem('auth_user');
			history.replace('/signin');
		});
	};
	return (
		<div className="navbar-fixed">
			<nav className="nav-wrapper pink">
				<div className="container">
					<ul>
						<li className="right">
							<span className="sign-out" onClick={signOut}>
								Sign Out
							</span>
						</li>
						<li className="right">
							<NavLink to="/profile">Profile</NavLink>
						</li>
						<li className="right">
							<NavLink to="/">Timeline</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
