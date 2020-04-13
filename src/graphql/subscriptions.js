import gql from 'graphql-tag';

import { PHOTO_COMMENT, REPLY_DATA } from './fragments';

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
