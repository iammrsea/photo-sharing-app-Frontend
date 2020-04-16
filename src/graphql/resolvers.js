import { GET_AUTH_USER, GET_PHOTO_NOTIFICATIONS } from './queries/local';
import gql from 'graphql-tag';
import { TIMELINE_DATA, USER_SHARED_PHOTOS } from './queries/remote';

export const resolvers = {
	Mutation: {
		setAuthUser: (_, { user }, { cache }) => {
			const { authUser } = cache.readQuery({ query: GET_AUTH_USER });
			cache.writeData({
				data: { authUser: { ...authUser, ...user } },
			});
			return null;
		},
		setSigningInOrUp: (_, { state }, { cache }) => {
			cache.writeData({
				data: { signingInOrUp: state },
			});
			return null;
		},
		setNotification: (_, variables, { cache }) => {
			const { notifications } = cache.readQuery({ query: GET_PHOTO_NOTIFICATIONS });

			cache.writeData({
				data: { notifications: [...notifications, variables.notification] },
			});

			return variables.notification;
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
		updateTotalLikes: (_, variables, { cache, getCacheKey }) => {
			const id = getCacheKey({ __typename: 'Photo', id: variables.photoId });
			const fragment = gql`
				fragment updateTotalLikes on Photo {
					likes
				}
			`;
			const photo = cache.readFragment({ fragment, id });
			let data;
			if (variables.action === 'like') {
				data = { ...photo, likes: [...photo.likes, variables.likerId] };
			}
			if (variables.action === 'unlike') {
				data = { ...photo, likes: photo.likes.filter((id) => id !== variables.likerId) };
			}
			cache.writeData({ id, data });
			return;
		},
		addPhotoToLocalStore(_, { photo, userId }, { cache }) {
			const { photos, me } = cache.readQuery({ query: TIMELINE_DATA });

			const edgeElem = {
				node: {
					...photo,
				},
				__typename: 'Edge',
			};
			photos.edges = [edgeElem, ...photos.edges];

			cache.writeQuery({
				query: TIMELINE_DATA,
				data: { photos, me },
			});

			if (userId) {
				updateSharedPhotos({ cache, photo, userId });
			}
		},
		removePhotoFromLocalStore(_, { photo }, { cache }) {
			const { notifications } = cache.readQuery({ query: GET_PHOTO_NOTIFICATIONS });

			cache.writeQuery({
				query: GET_PHOTO_NOTIFICATIONS,
				data: { notifications: notifications.filter((picture) => picture.id !== photo.id) },
			});
		},
		updateMeProfile(_, { userId, profile }, { cache, getCacheKey }) {
			const id = getCacheKey({ __typename: 'User', id: userId });
			const fragment = gql`
				fragment UpdateMeProfile on User {
					profile {
						about
						picture
					}
				}
			`;
			const user = cache.readFragment({ fragment, id });

			const data = { ...user, profile: { ...profile } };
			cache.writeData({ id, data });
			return null;
		},
	},
	Query: {
		getMeProfile(_, __, { cache }) {
			const { me } = cache.readQuery({ query: TIMELINE_DATA });
			return me;
		},
	},
};

function updateSharedPhotos({ cache, photo, userId }) {
	try {
		const { user, me } = cache.readQuery({ query: USER_SHARED_PHOTOS, variables: { id: userId } });
		const edgeElem = {
			node: {
				...photo,
			},
			__typename: 'Edge',
		};
		user.sharedPhotos.edges = [edgeElem, ...user.sharedPhotos.edges];
		cache.writeQuery({
			query: USER_SHARED_PHOTOS,
			variables: { id: userId },
			data: { user, me },
		});
	} catch (e) {
		// console.log('error occured updating shared photos', e);
	}
}
