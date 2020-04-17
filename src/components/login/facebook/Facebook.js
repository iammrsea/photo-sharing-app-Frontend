import React from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useProviderSignin } from '../useProviderSignin';

export default () => {
	const [signInWithProvider, { signingInOrUp }] = useProviderSignin();

	const handleAuthorized = (response) => {
		const { accessToken } = response;
		signInWithProvider({ codeToken: accessToken, providerName: 'facebook' });
		// console.log('sign in success response', accessToken);
	};

	return (
		<FacebookLogin
			style={{ fontFamily: 'cursive', marginBottom: 10 }}
			appId="146820543436674"
			callback={handleAuthorized}
			render={(renderProps) => {
				return (
					<FacebookLoginButton
						disabled={renderProps.isDisabled || signingInOrUp}
						onClick={renderProps.onClick}
					>
						Sign In with Facebook
					</FacebookLoginButton>
				);
			}}
		/>
	);
};
