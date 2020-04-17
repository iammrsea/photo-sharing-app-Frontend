import React from 'react';
import InfinitScroll from 'react-infinite-scroll-component';

import Photo from './components/Photo';
import { LinearProgress } from 'components';

const Photos = ({ loadMorePhotos, photos, hasNextPage, userIdForSharedPhotos }) => {
	// console.log('photos', photos);
	return (
		<InfinitScroll
			next={loadMorePhotos}
			dataLength={photos.length}
			hasMore={hasNextPage}
			loader={<LinearProgress />}
		>
			{photos.map((photo) => (
				<Photo userIdForSharedPhotos={userIdForSharedPhotos} photo={photo} key={photo.node.id} />
			))}
		</InfinitScroll>
	);
};

export default Photos;
