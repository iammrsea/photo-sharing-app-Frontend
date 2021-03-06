import React from 'react';
import Credentials from './credentials/Credentials';
import Facebook from './facebook/Facebook';
import { useQuery } from '@apollo/react-hooks';
// import Google from './google/Google';
import Github from './github/Github';
import { GridRow, GridItem } from 'components/grid';
import { Card, CardBody, CardHeader } from 'components/card';
import { GET_SIGNING_IN_OR_UP } from 'graphql/queries/local';
import { LinearProgress } from 'components';

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

			<Github />
			<Facebook />
			<CardHeader className="pink-text center-align" style={{ marginTop: 20 }}>
				<span style={{ fontWeight: 600 }}>OR</span>
			</CardHeader>
			<Credentials signUp={signUp} />
		</CardBody>
	);
};
export default () => {
	const [showSignUp, setShowSignUp] = React.useState(false);
	const {
		data: { signingInOrUp },
	} = useQuery(GET_SIGNING_IN_OR_UP);

	return (
		<GridRow style={styles.loginContainer} className="login-container">
			<GridItem sm={12} md={7} mdOffset={2} lg={4} lgOffset={4}>
				<Card className="grey lighten-4 ">
					{!showSignUp && <SignIn signUp={() => setShowSignUp(true)} />}
					{showSignUp && <SignUp signIn={() => setShowSignUp(false)} />}
					{signingInOrUp && <LinearProgress />}
				</Card>
			</GridItem>
		</GridRow>
	);
};
