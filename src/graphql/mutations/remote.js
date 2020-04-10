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
	mutation createLike($like: CreateLikeData!) {
		createLike(like: $like) {
			likerId
		}
	}
`;
