import gql from 'graphql-tag';

import { PHOTO_COMMENT, TIMELINE_PHOTO } from '../fragments';

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
export const GET_GITHUB_CODE = gql`
	query getGithubCode {
		githubCode @client
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

export const GET_PHOTO_NOTIFICATIONS = gql`
	query getNotifications {
		notifications @client {
			...TimelinePhoto
		}
	}
	${TIMELINE_PHOTO}
`;

export const GET_ME_PROFILE = gql`
	query getMeProfile($userId: ID!) {
		getMeProfile(userId: $userId) @client {
			profile {
				picture
			}
		}
	}
`;
