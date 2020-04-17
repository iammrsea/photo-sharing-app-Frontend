import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'materialize-css';

import './assets/app.scss';
import './App.css';

import { GET_AUTH_USER, GET_PHOTO_NOTIFICATIONS } from 'graphql/queries/local';
import { Timeline, Profile, Authentication, UserProfile, SearchPhotoList } from 'views';

import GeneralLayout from 'layout/GeneralLayout';
import NotificationList from 'views/notifications/NotificationList';

function App() {
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);
	const {
		data: { notifications },
	} = useQuery(GET_PHOTO_NOTIFICATIONS);

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
						render={() => {
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
						render={({ history: { location } }) => {
							// console.log('authUser', authUser);
							if (location.state && location.state.logout) {
								return <Authentication />;
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
