import gql from 'graphql-tag';

import { PHOTO_COMMENT } from '../fragments';

export const ADD_COMMENT = gql`
	mutation createComment($comment: CreateCommentData!) {
		createComment(comment: $comment) {
			...PhotoComment
		}
	}
	${PHOTO_COMMENT}
`;
