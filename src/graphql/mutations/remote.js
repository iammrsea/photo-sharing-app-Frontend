import gql from 'graphql-tag';

import { PHOTO_COMMENT, REPLY_DATA } from '../fragments';

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
			story
		}
	}
`;
export const UNLIKE_PHOTO = gql`
	mutation unlikePhoto($unlikePhotoData: UnlikePhoto!) {
		unlikePhoto(unlikePhotoData: $unlikePhotoData) {
			story
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
