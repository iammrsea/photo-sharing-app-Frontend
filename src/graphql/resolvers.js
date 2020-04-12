import { GET_AUTH_USER } from './queries/local';

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
	},
};
