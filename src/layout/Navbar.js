import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { SET_AUTH_USER } from 'graphql/mutations/local';
import { MaterialIcon } from 'components/icons';
import { GET_PHOTO_NOTIFICATIONS } from 'graphql/queries/local';

export default ({ openModal }) => {
	const [removeAuthUser] = useMutation(SET_AUTH_USER);
	const client = useApolloClient();

	const {
		data: { notifications },
	} = useQuery(GET_PHOTO_NOTIFICATIONS);
	const history = useHistory();

	const handleNotificationClick = () => {
		if (notifications.length === 0) return;
		openModal();
	};
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
						<li className="right sign-out" id="notifications" onClick={handleNotificationClick}>
							<MaterialIcon children="notifications" />
							<span id="notifications-value">{notifications.length}</span>
						</li>
						<li className="right sign-out" onClick={signOut}>
							<i className="fas fa-sign-out-alt"></i>
						</li>
						<li className="right">
							<NavLink to="/profile">
								<i className="fas fa-user-circle"></i>
							</NavLink>
						</li>
						<li className="right home">
							<NavLink to="/">
								<MaterialIcon children="home" />
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
