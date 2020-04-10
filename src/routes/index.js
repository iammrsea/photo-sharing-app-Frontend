import React from 'react';
import { Timeline, Profile, Authentication } from 'views';

export default [
	{
		url: '/',
		component: <Timeline />,
	},
	{
		url: '/signin',
		component: <Authentication />,
	},
	{
		url: '/profile',
		component: <Profile />,
	},
];
