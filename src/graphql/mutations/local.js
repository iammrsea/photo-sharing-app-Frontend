import gql from 'graphql-tag';

export const SET_AUTH_USER = gql`
	mutation setAuthUser($user: Object!) {
		setAuthUser(user: $user) @client
	}
`;
export const SET_SIGNING_IN_OR_UP = gql`
	mutation setSigningInOrUp($state: Boolean!) {
		setSigningInOrUp(state: $state) @client
	}
`;

export const UPDATE_TOTAL_COMMENT_COUNT = gql`
	mutation UpdateTotalCommentCount($id: ID!) {
		updateTotalCommentCount(id: $id) @client
	}
`;
