import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'materialize-css';

import './assets/app.scss';
import './App.css';

import { GET_AUTH_USER } from 'graphql/queries/local';
import { Timeline, Profile, Authentication, UserProfile } from 'views';

import GeneralLayout from 'layout/GeneralLayout';

function App() {
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);
	return (
		<Router>
			<Switch>
				<Route
					path="/"
					exact
					render={() => {
						if (authUser.token) {
							return (
								<GeneralLayout>
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
						console.log('authUser', authUser);
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
								<GeneralLayout>
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
								<GeneralLayout>
									<UserProfile />
								</GeneralLayout>
							);
						}
						return <Redirect to="/signin" />;
					}}
				/>
				<Redirect to="/signin" />
			</Switch>
		</Router>
	);
}

export default App;
