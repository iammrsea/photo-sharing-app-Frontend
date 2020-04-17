import React from 'react';
import { GridRow, GridItem } from 'components/grid';
import { Photos, LinearProgress, Container } from 'components';
import { useQuery } from '@apollo/react-hooks';
import { SEARCH_PHOTOS } from 'graphql/queries/remote';
import { useLocation } from 'react-router-dom';

const SearchedPhotoList = () => {
	const location = useLocation();

	const { data, loading, fetchMore } = useQuery(SEARCH_PHOTOS, {
		variables: { searchText: location.state ? location.state.searchText : '' },
	});

	return (
		<>
			<h4 className="center pink-text">Search Results</h4>
			{loading && <LinearProgress />}
			{data && data.searchPhotos.edges.length === 0 && (
				<Container>
					<h5 style={{ marginTop: 60 }}>No results found</h5>
				</Container>
			)}
			<GridRow>
				<GridItem sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
					<Photos
						photos={(data && data.searchPhotos.edges) || []}
						hasNextPage={(data && data.searchPhotos.pageInfo.hasNextPage) || false}
						loadMorePhotos={() => {
							fetchMore({
								variables: {
									after: data && data.searchPhotos.pageInfo.endCursor,
								},
								updateQuery: (previousResult, { fetchMoreResult }) => {
									const newEdges = fetchMoreResult.searchPhotos.edges;
									const pageInfo = fetchMoreResult.searchPhotos.pageInfo;
									return newEdges.length
										? {
												searchPhotos: {
													__typename: previousResult.searchPhotos.__typename,
													edges: [...previousResult.searchPhotos.edges, ...newEdges],
													pageInfo,
												},
										  }
										: previousResult;
								},
							});
						}}
					/>
				</GridItem>
			</GridRow>
		</>
	);
};

export default SearchedPhotoList;
