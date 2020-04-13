import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TIMELINE_DATA } from 'graphql/queries/remote';

import { LinearProgress, Alert } from 'components';
import { GridRow, GridItem } from 'components/grid';
import SharePicture from './components/SharePicture';
import { Photos } from 'components';
import { GET_AUTH_USER } from 'graphql/queries/local';

export default () => {
	const { data, loading, error, fetchMore } = useQuery(TIMELINE_DATA);

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	if (data) {
		console.log('timeline data', data);
	}

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
							photos={data.photos.edges || []}
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
