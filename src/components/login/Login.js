import React from 'react';
import Credentials from './credentials/Credentials';
import Facebook from './facebook/Facebook';
import Google from './google/Google';
import Github from './github/Github';
import { GridRow, GridItem } from 'components/grid';
import { Card, CardBody, CardHeader } from 'components/card';

import SignUp from 'components/register/Register';

const styles = {
	loginContainer: {
		height: '100vh',
		margin: 0,

		display: 'flex',

		alignItems: 'center',
	},
};
const SignIn = ({ signUp }) => {
	return (
		<CardBody>
			<CardHeader className="pink-text center-align" style={{ marginBottom: 20 }}>
				<span style={{ fontWeight: 600 }}>Sign In</span>
			</CardHeader>
			<Facebook />
			<Github />
			<Google />
			<CardHeader className="pink-text center-align" style={{ marginTop: 20 }}>
				<span style={{ fontWeight: 600 }}>OR</span>
			</CardHeader>
			<Credentials signUp={signUp} />
		</CardBody>
	);
};
export default () => {
	const [showSignUp, setShowSignUp] = React.useState(false);
	return (
		<GridRow style={styles.loginContainer} className="login-container">
			<GridItem sm={12} md={6} mdOffset={3} lg={4} lgOffset={4}>
				<Card className="grey lighten-4">
					{!showSignUp && <SignIn signUp={() => setShowSignUp(true)} />}
					{showSignUp && <SignUp signIn={() => setShowSignUp(false)} />}
				</Card>
			</GridItem>
		</GridRow>
	);
};
