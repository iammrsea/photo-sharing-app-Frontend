import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { SIGN_IN_WITH_PROVIDER } from 'graphql/mutations/remote';
import { GET_SIGNING_IN_OR_UP, GET_AUTH_USER } from 'graphql/queries/local';
import { SET_SIGNING_IN_OR_UP } from 'graphql/mutations/local';
import { useHistory } from 'react-router-dom';
import { Alert } from 'components';

export const useProviderSignin = () => {
	const [signIn, { loading }] = useMutation(SIGN_IN_WITH_PROVIDER);
	const {
		data: { signingInOrUp },
	} = useQuery(GET_SIGNING_IN_OR_UP);
	const [setLoading] = useMutation(SET_SIGNING_IN_OR_UP);

	const history = useHistory();

	React.useEffect(() => {
		setLoading({
			variables: { state: loading },
		});
	}, [loading]);

	const signInWithProvider = ({ codeToken, providerName }) => {
		signIn({
			variables: {
				signinData: { codeToken, providerName },
			},
			update(cache, { data: { providerSignIn } }) {
				const { authUser } = cache.readQuery({
					query: GET_AUTH_USER,
				});
				cache.writeData({
					data: { authUser: { ...authUser, ...providerSignIn } },
				});
				localStorage.setItem('auth_user', JSON.stringify(providerSignIn));
				setTimeout(() => {
					history.push('/');
				}, 0);
			},
		}).catch((e) => {
			if (e.graphQLErrors.length > 0) {
				Alert({ message: e.graphQLErrors[0].message, color: 'red' });
			} else Alert({ message: e.message, color: 'red' });
		});
	};
	return [signInWithProvider, { signingInOrUp }];
};
