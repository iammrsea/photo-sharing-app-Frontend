import React from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'materialize-css';

import './assets/app.scss';
import './App.css';

import { GET_AUTH_USER, GET_PHOTO_NOTIFICATIONS } from 'graphql/queries/local';
import { Timeline, Profile, Authentication, UserProfile, SearchPhotoList } from 'views';

import GeneralLayout from 'layout/GeneralLayout';
import NotificationList from 'views/notifications/NotificationList';
import { SET_GITHUB_CODE } from 'graphql/mutations/local';

function App() {
	const client = useApolloClient();
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);
	const {
		data: { notifications },
	} = useQuery(GET_PHOTO_NOTIFICATIONS);

	const setCode = (code) => {
		client
			.mutate({
				mutation: SET_GITHUB_CODE,
				variables: { value: code },
			})
			.catch((e) => {
				console.log('error', e);
			});
	};
	const modal = React.useRef(null);

	const openModal = () => {
		const elems = document.querySelectorAll('.notifications-modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);
		modal.current = instances[0];

		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};
	return (
		<>
			<Router>
				<Switch>
					<Route
						path="/"
						exact
						render={({ history }) => {
							if (authUser.token) {
								return (
									<GeneralLayout openModal={openModal}>
										<Timeline />
									</GeneralLayout>
								);
							}
							return <Redirect to="/signin" />;
						}}
					/>
					<Route
						path="/signin"
						exact
						render={({ history }) => {
							if (history.location.state && history.location.state.logout) {
								history.location.state.logout = false;
								return <Authentication />;
							}
							if (history.location.search.match(/code=/)) {
								const code = history.location.search.replace('?code=', '');
								setCode(code);
								history.replace('/signin');
							}
							if (authUser.token) {
								return <Redirect to="/" />;
							}
							return <Authentication />;
						}}
					/>
					<Route
						path="/profile"
						exact
						render={() => {
							if (authUser.token) {
								return (
									<GeneralLayout openModal={openModal}>
										<Profile />
									</GeneralLayout>
								);
							}
							return <Redirect to="/signin" />;
						}}
					/>
					<Route
						path="/profile/:id"
						exact
						render={() => {
							if (authUser.token) {
								return (
									<GeneralLayout openModal={openModal}>
										<UserProfile />
									</GeneralLayout>
								);
							}
							return <Redirect to="/signin" />;
						}}
					/>
					<Route
						path="/search-results"
						exact
						render={() => {
							if (authUser.token) {
								return (
									<GeneralLayout openModal={openModal}>
										<SearchPhotoList />
									</GeneralLayout>
								);
							}
							return <Redirect to="/signin" />;
						}}
					/>

					<Redirect to="/signin" />
				</Switch>
			</Router>
			<NotificationList notifications={notifications} closeModal={closeModal} />
		</>
	);
}

export default App;
