import React from 'react';
import InfinitScroll from 'react-infinite-scroll-component';

import TimelinePicture from './TimelinePicture';
import { LinearProgress } from 'components';

const Photos = ({ loadMorePhotos, photos, hasNextPage, reRender }) => {
	console.log('photos', photos);
	return (
		<InfinitScroll
			next={loadMorePhotos}
			dataLength={photos.length}
			hasMore={hasNextPage}
			loader={<LinearProgress />}
		>
			{photos.map((photo) => (
				<TimelinePicture photo={photo} key={photo.node.id} />
			))}
		</InfinitScroll>
	);
};

export default Photos;
