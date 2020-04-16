import React from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { TIMELINE_DATA } from 'graphql/queries/remote';

import { LinearProgress, Alert } from 'components';
import { GridRow, GridItem } from 'components/grid';
import SharePicture from './components/SharePicture';
import { Photos } from 'components';

export default () => {
	const { data, loading, error, fetchMore } = useQuery(TIMELINE_DATA);
	const client = useApolloClient();

	const [photoList, setPhotoList] = React.useState([]);

	// if (data) {
	// 	console.log('timeline data', data);
	// }

	React.useEffect(() => {
		//Observes the query TIMELINE_DATA for changes when a photo is  liked or unliked
		const observable = client
			.watchQuery({
				query: TIMELINE_DATA,
			})
			.subscribe(({ data: { photos } }) => {
				if (photoList.length !== photos.edges.length) {
					setPhotoList(photos.edges);
				}
			});
		return function cleanup() {
			observable.unsubscribe();
		};
	}, []);

	return (
		<>
			{error && Alert({ message: error.message, color: 'red' })}
			{loading && <LinearProgress />}
			{data && data.me && (
				<GridRow>
					<GridItem sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
						<SharePicture me={data.me} />
					</GridItem>
				</GridRow>
			)}
			{data && data.photos && (
				<GridRow>
					<GridItem sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
						<Photos
							photos={photoList}
							hasNextPage={data.photos.pageInfo.hasNextPage || false}
							loadMorePhotos={() => {
								fetchMore({
									variables: {
										after: data.photos.pageInfo.endCursor,
									},
									updateQuery: (previousResult, { fetchMoreResult }) => {
										const newEdges = fetchMoreResult.photos.edges;
										const pageInfo = fetchMoreResult.photos.pageInfo;
										return newEdges.length
											? {
													photos: {
														__typename: previousResult.photos.__typename,
														edges: [...previousResult.photos.edges, ...newEdges],
														pageInfo,
													},
													me: previousResult.me,
											  }
											: previousResult;
									},
								});
							}}
						/>
					</GridItem>
				</GridRow>
			)}
		</>
	);
};
