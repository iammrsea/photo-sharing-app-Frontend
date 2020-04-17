import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { GoogleLogin } from 'react-google-login';
import { useProviderSignin } from '../useProviderSignin';

export default () => {
	const [signInWithProvider, { signingInOrUp }] = useProviderSignin();

	const handleAuthorized = (response) => {
		const { tokenId } = response;
		signInWithProvider({ codeToken: tokenId, providerName: 'google' });
	};

	return (
		<GoogleLogin
			style={{ fontFamily: 'cursive', marginBottom: 10 }}
			clientId="204663574116-rt4gef32f4vb9a3preg0a9b8mqdm41is.apps.googleusercontent.com"
			onSuccess={handleAuthorized}
			cookiePolicy={'single_host_origin'}
			render={(renderProps) => {
				return (
					<GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled || signingInOrUp}>
						Sign In with Google
					</GoogleLoginButton>
				);
			}}
		></GoogleLogin>
	);
};
