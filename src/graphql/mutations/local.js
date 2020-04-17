import gql from 'graphql-tag';

export const SET_AUTH_USER = gql`
	mutation setAuthUser($user: AuthResponse!) {
		setAuthUser(user: $user) @client
	}
`;
export const SET_SIGNING_IN_OR_UP = gql`
	mutation setSigningInOrUp($state: Boolean!) {
		setSigningInOrUp(state: $state) @client
	}
`;
export const SET_GITHUB_CODE = gql`
	mutation setGithubCode($value: String!) {
		setGithubCode(value: $value) @client
	}
`;

export const UPDATE_TOTAL_COMMENT_COUNT = gql`
	mutation UpdateTotalCommentCount($id: ID!) {
		updateTotalCommentCount(id: $id) @client
	}
`;

export const UPDATE_TOTAL_LIKES = gql`
	mutation UpdateTotalLikes($photoId: ID!, $action: String!, $likerId: ID!) {
		updateTotalLikes(photoId: $photoId, action: $action, likerId: $likerId) @client
	}
`;
export const ADD_PHOTO_TO_LOCAL_STORE = gql`
	mutation AddPhotoToLocalStore($photo: Photo!, $userId: ID) {
		addPhotoToLocalStore(photo: $photo, userId: $userId) @client
	}
`;
export const REMOVE_PHOTO_FROM_LOCAL_STORE = gql`
	mutation RemovePhotoFromLocalStore($photo: Photo!) {
		removePhotoFromLocalStore(photo: $photo) @client
	}
`;

export const SET_PHOTO_NOTIFICATIONS = gql`
	mutation SetNotification($notification: Photo!) {
		setNotification(notification: $notification) @client
	}
`;
export const UPDATE_ME_PROFILE = gql`
	mutation UpdateMeProfile($profile: Profile!, $userId: ID!) {
		updateMeProfile(profile: $profile, userId: $userId) @client
	}
`;
