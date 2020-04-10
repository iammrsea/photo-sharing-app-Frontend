import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Card, CardBody, CardImage } from 'components/card';
import { Divider, Avatar } from 'components';

import { Flat } from 'components/buttons';

import './TimelinePicture.css';
import { GridRow, GridItem } from 'components/grid';

import { ShowComment, AddComment } from 'components/comment';

export default ({ photo }) => {
	// console.log('photo', photo);
	// const client = useApolloClient();
	// console.log('cache', client.cache);
	const commentRef = React.useRef(null);

	const [pagedData, setPagedData] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(0);

	const perPage = 5;
	const totalPages = Math.ceil(photo.node.comments.length / perPage);

	const next = () => {
		let start = perPage * currentPage;
		let end = start + perPage;
		return photo.node.comments.slice(start, end);
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
		<Card id="timeline-picture-card">
			<CardBody>
				<GridRow>
					<GridItem sm={12} className="timeline-picture-avatar-container">
						<Avatar src="/img/cam1.jpeg" />
						<span>Username: Timothy Flair</span>
					</GridItem>
				</GridRow>
				<GridRow>
					<GridItem sm={12}>
						<span>Picture Description</span>
					</GridItem>
				</GridRow>
				<CardImage src="/img/cam4.jpeg" />
			</CardBody>
			<Divider />
			<CardBody style={{ paddingTop: 5, paddingBottom: 5 }}>
				<div className="like-comment-container">
					<span>20 likes</span>
					<span>200 comments</span>
				</div>
			</CardBody>
			<Divider />
			<CardBody style={{ paddingTop: 0, paddingBottom: 5 }}>
				<div className="like-comment-container">
					<Flat className="btn-auth">Like</Flat>
					<Flat className="btn-auth" onClick={() => commentRef.current.focus()}>
						Comment
					</Flat>
				</div>
			</CardBody>
			<Divider />
			<CardBody>
				{pagedData && (
					<div>
						{!showViewMore() && (
							<span className="view-more-comments" onClick={handleNext}>
								view more comments
							</span>
						)}
						{pagedData.map((comment, i) => (
							<ShowComment key={comment.id + i} comment={comment} />
						))}
					</div>
				)}

				<AddComment ref={commentRef} photoId={photo.node.id} />
			</CardBody>
		</Card>
	);
};
