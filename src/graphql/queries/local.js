import gql from 'graphql-tag';

import { PHOTO_COMMENT } from '../fragments';

export const PHOTO_BY_ID = gql`
	query photoById($id: ID!) {
		photo(id: $id) {
			comment {
				...PhotoComment
			}
		}
	}
	${PHOTO_COMMENT}
`;
