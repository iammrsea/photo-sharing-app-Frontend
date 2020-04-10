import gql from 'graphql-tag';

export const TIMELINE_USER = gql`
	fragment TimelineUser on User {
		id
		username
		profile {
			picture
		}
	}
`;
export const PHOTO_COMMENT = gql`
	fragment PhotoComment on Comment {
		id
		content
		createdAt
		commentor {
			...TimelineUser
		}
		totalLike
		totalReply
	}
	${TIMELINE_USER}
`;
export const TIMELINE_PHOTO = gql`
	fragment TimelinePhoto on Photo {
		id
		story
		fileId
		photoUrl
		totalLike
		totalComment
		category
		createdAt
		owner {
			...TimelineUser
		}
		likes {
			id
		}
		comments {
			...PhotoComment
		}
	}

	${TIMELINE_USER}
	${PHOTO_COMMENT}
`;

export const PAGE_INFO = gql`
	fragment PageMetaData on PageInfo {
		hasNextPage
		endCursor
	}
`;
