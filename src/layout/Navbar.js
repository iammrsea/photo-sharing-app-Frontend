import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { SET_AUTH_USER } from 'graphql/mutations/local';
import { MaterialIcon } from 'components/icons';
import { GET_PHOTO_NOTIFICATIONS } from 'graphql/queries/local';

export default () => {
	const [removeAuthUser] = useMutation(SET_AUTH_USER);
	const client = useApolloClient();

	const {
		data: { notifications },
	} = useQuery(GET_PHOTO_NOTIFICATIONS);
	const history = useHistory();

	const signOut = () => {
		localStorage.removeItem('auth_user');

		removeAuthUser({
			variables: {
				user: {
					userId: '',
					token: '',
					__typename: 'AuthResponse',
				},
			},
		})
			.then((res) => {
				client.resetStore();
				history.replace('/signin', { logout: true });
			})
			.catch((e) => {});
	};
	return (
		<div className="navbar-fixed">
			<nav className="nav-wrapper pink">
				<div className="container">
					<ul>
						<li className="right ">
							<span className="sign-out" id="notifications">
								<MaterialIcon children="notifications" />
								<span id="notifications-value">{notifications.length}</span>
							</span>
						</li>
						<li className="right">
							<span className="sign-out" onClick={signOut}>
								<i className="fas fa-sign-out-alt"></i>
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
