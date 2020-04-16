import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Login from 'components/login/Login';
import { GET_SIGNING_IN_OR_UP } from 'graphql/queries/local';
import { LinearProgress } from 'components';

export default () => {
	const {
		data: { signingInOrUp },
	} = useQuery(GET_SIGNING_IN_OR_UP);

	return (
		<>
			{signingInOrUp && <LinearProgress />}
			<Login />
		</>
	);
};
