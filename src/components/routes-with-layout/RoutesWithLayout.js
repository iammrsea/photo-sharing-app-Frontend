import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

export default ({ routes }) => {
	const allowedRoutes = routes.map((route, i) => (
		<Route key={route.name + i} path={route.url} exact component={route.component} />
	));
	return <>{allowedRoutes}</>;
};
