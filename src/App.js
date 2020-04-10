import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'materialize-css';

import './assets/app.scss';
import './App.css';

import { Timeline, Profile, Authentication, UserProfile } from 'views';

import GeneralLayout from 'layout/GeneralLayout';

function App() {
	return (
		<Router>
			<Switch>
				<Route
					path="/"
					exact
					render={() => (
						<GeneralLayout>
							<Timeline />
						</GeneralLayout>
					)}
				/>
				<Route path="/signin" exact component={Authentication} />
				<Route
					path="/profile"
					exact
					render={() => (
						<GeneralLayout>
							<Profile />
						</GeneralLayout>
					)}
				/>
				<Route
					path="/profile/:id"
					exact
					render={() => (
						<GeneralLayout>
							<UserProfile />
						</GeneralLayout>
					)}
				/>
			</Switch>
		</Router>
	);
}

export default App;
