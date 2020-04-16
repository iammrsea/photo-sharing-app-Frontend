import gql from 'graphql-tag';

import { PHOTO_COMMENT, REPLY_DATA_FOR_SUB, REPLY_DATA, TIMELINE_PHOTO } from './fragments';

export const COMMENT_ADDED = gql`
	subscription onCommentAdded($photoId: ID!) {
		commentAdded(photoId: $photoId) {
			...PhotoComment
			replies {
				...ReplyData
			}
		}
	}
	${PHOTO_COMMENT}
	${REPLY_DATA}
`;

export const REPLY_ADDED = gql`
	subscription onReplyAdded {
		replyAdded {
			...ReplyDataSub
		}
	}
	${REPLY_DATA_FOR_SUB}
`;
export const PHOTOLIKEDORUNLIKED = gql`
	subscription onPhotoLikedOrUnliked($identifier: String!) {
		photoLikedOrUnliked(identifier: $identifier) {
			likerId
			action
		}
	}
`;
export const PHOTO_ADDED = gql`
	subscription onPhotoAdded {
		photoAdded {
			...TimelinePhoto
		}
	}
	${TIMELINE_PHOTO}
`;
