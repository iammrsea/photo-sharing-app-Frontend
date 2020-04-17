import React from 'react';
import { GithubLoginButton } from 'react-social-login-buttons';
import { useProviderSignin } from '../useProviderSignin';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_GITHUB_CODE } from 'graphql/queries/local';
import { SET_GITHUB_CODE } from 'graphql/mutations/local';

const clientID = 'a6839e36b9ca33f9324c';

export default () => {
	const [signInWithProvider, { signingInOrUp }] = useProviderSignin();
	const {
		data: { githubCode },
	} = useQuery(GET_GITHUB_CODE);
	const [setGithubCode] = useMutation(SET_GITHUB_CODE);

	React.useEffect(() => {
		if (githubCode) {
			signInWithProvider({ codeToken: githubCode, providerName: 'github' });
			setGithubCode({ variables: { value: '' } });
		}
	}, [githubCode]);

	const handleClick = () => {
		window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
	};
	return (
		<GithubLoginButton
			disabled={signingInOrUp}
			onClick={handleClick}
			style={{ fontFamily: 'cursive', marginBottom: 10 }}
		>
			Sign In with Github
		</GithubLoginButton>
	);
};
