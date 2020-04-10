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
export const REPLY_DATA = gql`
	fragment ReplyData on Reply {
		id
		content
		replier {
			...TimelineUser
		}
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
			likerId
		}
	}

	${TIMELINE_USER}
`;

export const PAGE_INFO = gql`
	fragment PageMetaData on PageInfo {
		hasNextPage
		endCursor
	}
`;
