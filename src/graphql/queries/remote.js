import gql from 'graphql-tag';

import { TIMELINE_PHOTO, TIMELINE_USER, PAGE_INFO } from '../fragments';

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
