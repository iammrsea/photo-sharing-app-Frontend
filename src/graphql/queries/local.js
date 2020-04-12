import gql from 'graphql-tag';

import { PHOTO_COMMENT } from '../fragments';

export const GET_AUTH_USER = gql`
	query getAuthUser {
		authUser @client {
			userId
			token
		}
	}
`;
export const GET_SIGNING_IN_OR_UP = gql`
	query getSigningInorUp {
		signingInOrUp @client
	}
`;

export const PHOTO_BY_ID = gql`
	query photoById($id: ID!) {
		photo(id: $id) {
			comment {
				...PhotoComment
			}
		}
	}
	${PHOTO_COMMENT}
`;
