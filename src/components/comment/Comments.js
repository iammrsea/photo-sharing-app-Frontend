import React, { useEffect } from 'react';

import { useApolloClient } from '@apollo/react-hooks';
import { COMMENTS_ON_PHOTO } from 'graphql/queries/remote';

import ShowComment from './ShowComment';

const Comments = ({ photoId }) => {
	const client = useApolloClient();

	const [pagedData, setPagedData] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(0);
	const [comments, setComments] = React.useState([]);
	const [totalPages, setTotalPages] = React.useState(0);

	const perPage = 5;

	useEffect(() => {
		client
			.query({
				query: COMMENTS_ON_PHOTO,
				variables: {
					photoId,
				},
			})
			.then((res) => {
				// console.log('res', res);
				setTotalPages(Math.ceil(res.data.commentsByPhotoId.length / perPage));
				let start = perPage * currentPage;
				let end = start + perPage;
				setPagedData(res.data.commentsByPhotoId.slice(start, end));
				setComments((comments) => [...comments, ...res.data.commentsByPhotoId]);
			})
			.catch((e) => {
				console.log('error from Comments', e);
			});
		const observable = client
			.watchQuery({
				query: COMMENTS_ON_PHOTO,
				variables: {
					photoId,
				},
			})
			.subscribe(({ data }) => {
				setTotalPages(Math.ceil(data.commentsByPhotoId.length / perPage));
				setPagedData(data.commentsByPhotoId);
				setComments(data.commentsByPhotoId);
			});

		return function cleanup() {
			observable.unsubscribe();
		};
	}, [photoId]);

	const deDuplicate = (list) => {
		return list.reduce((previous, current) => {
			let accumulator = previous;
			if (previous.indexOf(current) > -1) {
				return previous;
			}
			accumulator.push(current);
			return accumulator;
		}, []);
	};
	const next = () => {
		let start = perPage * currentPage;
		let end = start + perPage;
		return comments.slice(start, end);
	};

	React.useEffect(() => {
		let values = next();
		setPagedData((data) => [...data, ...values]);
	}, [currentPage]);

	const handleNext = () => {
		setCurrentPage((state) => state + 1);
	};
	const handlePrevious = () => {
		setCurrentPage((state) => state - 1);
	};
	const showViewMore = () => {
		return currentPage >= totalPages - 1;
	};
	return (
		<>
			{pagedData.length > 0 && (
				<div>
					{!showViewMore() && (
						<span className="view-more-comments" onClick={handleNext}>
							view more comments
						</span>
					)}
					{deDuplicate(pagedData).map((comment, i) => (
						<ShowComment key={comment.id} comment={comment} photoId={photoId} />
					))}
				</div>
			)}
		</>
	);
};

export default Comments;
