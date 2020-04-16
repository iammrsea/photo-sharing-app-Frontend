import gql from 'graphql-tag';

import { PHOTO_COMMENT, REPLY_DATA, TIMELINE_PHOTO } from '../fragments';

export const ADD_COMMENT = gql`
	mutation createComment($comment: CreateCommentData!) {
		createComment(comment: $comment) {
			...PhotoComment
			replies {
				...ReplyData
			}
		}
	}
	${PHOTO_COMMENT}
	${REPLY_DATA}
`;

export const LIKE_PHOTO = gql`
	mutation likePhoto($likePhotoData: LikePhoto!) {
		likePhoto(likePhotoData: $likePhotoData) {
			description
		}
	}
`;
export const UNLIKE_PHOTO = gql`
	mutation unlikePhoto($unlikePhotoData: UnlikePhoto!) {
		unlikePhoto(unlikePhotoData: $unlikePhotoData) {
			description
		}
	}
`;
export const REPLY_COMMENT = gql`
	mutation createReply($reply: CreateReplyData!) {
		createReply(reply: $reply) {
			...ReplyData
		}
	}
	${REPLY_DATA}
`;

export const SIGN_IN_WITH_CREDENTIALS = gql`
	mutation signInUsingForm($signinData: FormSigninUserData!) {
		formSignIn(signinData: $signinData) {
			userId
			token
		}
	}
`;

export const SIGN_UP_USING_FORM = gql`
	mutation signUpUsingForm($signupData: CreateUserData) {
		formSignUp(newUser: $signupData) {
			id
		}
	}
`;

export const ADD_A_PHOTO = gql`
	mutation createPhoto($photoData: CreatePhotoData!) {
		createPhoto(photoData: $photoData) {
			...TimelinePhoto
		}
	}
	${TIMELINE_PHOTO}
`;

export const ADD_USER_PROFILE = gql`
	mutation createProfile($profileData: CreateProfileData!) {
		createProfile(profileData: $profileData) {
			picture
			about
		}
	}
`;

export const EDIT_USER_PROFILE = gql`
	mutation editProfile($id: ID!, $about: String!) {
		editProfile(id: $id, about: $about) {
			id
			about
		}
	}
`;
export const EDIT_USER_PROFILE_PICTURE = gql`
	mutation editProfilePicture($id: ID!, $picture: Upload!) {
		editProfilePicture(id: $id, picture: $picture) {
			id
			picture
		}
	}
`;
