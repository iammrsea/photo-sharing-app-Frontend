import gql from 'graphql-tag';

import { TIMELINE_PHOTO, PHOTO_COMMENT, TIMELINE_USER, PAGE_INFO, REPLY_DATA } from '../fragments';

export const TIMELINE_DATA = gql`
	query getTimelineData($first: Int, $after: String, $sorting: PhotoSortData, $filter: PhotoFilter) {
		photos(first: $first, after: $after, sorting: $sorting, filter: $filter) {
			pageInfo {
				...PageMetaData
			}
			edges {
				cursor
				node {
					... on Photo {
						...TimelinePhoto
					}
				}
			}
		}
	}
	${TIMELINE_PHOTO}

	${PAGE_INFO}
`;

export const USER_INFO = gql`
	query getUserInfo {
		me {
			...TimelineUser
		}
	}
	${TIMELINE_USER}
`;
export const COMMENTS_ON_PHOTO = gql`
	query getComments($photoId: ID!) {
		commentsByPhotoId(photoId: $photoId) {
			...PhotoComment
			replies {
				...ReplyData
			}
		}
	}
	${PHOTO_COMMENT}
	${REPLY_DATA}
`;
