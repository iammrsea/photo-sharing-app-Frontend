import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'materialize-css';

import './assets/app.scss';
import './App.css';

import { Timeline, Profile, Authentication } from 'views';

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
			</Switch>
		</Router>
	);
}

export default App;
