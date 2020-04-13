import { TIMELINE_DATA } from 'graphql/queries/remote';

export const unlikeStoreUpdate = ({ photo, cache, likerId }) => {
	const { photos, me } = cache.readQuery({ query: TIMELINE_DATA });

	photos.edges = photos.edges.map((photoItem) => {
		if (photoItem.node.id === photo.node.id) {
			return {
				...photoItem,
				node: {
					...photoItem.node,
					likes: photo.node.likes.filter((id) => id !== likerId),
				},
			};
		}
		return photoItem;
	});
	cache.writeQuery({
		query: TIMELINE_DATA,
		data: { photos, me },
	});
};
export const likeStoreUpdate = ({ photo, cache, likerId }) => {
	const { photos, me } = cache.readQuery({ query: TIMELINE_DATA });

	photos.edges = photos.edges.map((photoItem) => {
		if (photoItem.node.id === photo.node.id) {
			return {
				...photoItem,
				node: {
					...photoItem.node,
					likes: [...photoItem.node.likes, likerId],
				},
			};
		}
		return photoItem;
	});
	cache.writeQuery({
		query: TIMELINE_DATA,
		data: { photos, me },
	});
};
