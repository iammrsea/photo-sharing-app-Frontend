import { GET_AUTH_USER } from './queries/local';
import gql from 'graphql-tag';

export const resolvers = {
	Mutation: {
		setAuthUser: (parent, { user }, { cache }) => {
			const { authUser } = cache.readQuery({ query: GET_AUTH_USER });
			cache.writeData({
				data: { authUser: { authUser, ...user } },
			});
			return null;
		},
		setSigningInOrUp: (parent, { state }, { cache }) => {
			cache.writeData({
				data: { signingInOrUp: state },
			});
			return null;
		},
		updateTotalCommentCount: (_, variables, { cache, getCacheKey }) => {
			const id = getCacheKey({ __typename: 'Photo', id: variables.id });
			const fragment = gql`
				fragment updateTotalCount on Photo {
					totalComment
				}
			`;
			const photo = cache.readFragment({ fragment, id });
			const data = { ...photo, totalComment: photo.totalComment + 1 };
			cache.writeData({ id, data });
			return null;
		},
	},
};
