import gql from 'graphql-tag';

export const TIMELINE_USER = gql`
	fragment TimelineUser on User {
		id
		username
		profile {
			picture
			about
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
		createdAt
		replier {
			...TimelineUser
		}
	}
	${TIMELINE_USER}
`;
export const REPLY_DATA_FOR_SUB = gql`
	fragment ReplyDataSub on Reply {
		id
		content
		commentId
		createdAt
		replier {
			...TimelineUser
		}
	}
	${TIMELINE_USER}
`;
export const TIMELINE_PHOTO = gql`
	fragment TimelinePhoto on Photo {
		id
		description

		photoUrl

		totalComment
		category
		createdAt
		owner {
			...TimelineUser
		}
		likes
	}

	${TIMELINE_USER}
`;

export const PAGE_INFO = gql`
	fragment PageMetaData on PageInfo {
		hasNextPage
		endCursor
	}
`;
