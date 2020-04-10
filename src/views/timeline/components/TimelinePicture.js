import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Card, CardBody, CardImage } from 'components/card';
import { Divider, Avatar } from 'components';

import { TIMELINE_DATA } from 'graphql/queries/remote';
import { LIKE_PHOTO } from 'graphql/mutations/remote';

import { Flat } from 'components/buttons';

import './TimelinePicture.css';
import { GridRow, GridItem } from 'components/grid';

import { ShowComment, AddComment } from 'components/comment';
import Comments from 'components/comment/Comments';

export default ({ photo }) => {
	const [likePhoto, { loading }] = useMutation(LIKE_PHOTO);
	// console.log('photo', photo);
	// const client = useApolloClient();
	// console.log('cache', client.cache);
	console.log('likes', photo.node.likes);
	const commentRef = React.useRef(null);

	const handleLike = () => {
		likePhoto({
			variables: {
				like: {
					photoId: photo.node.id,
					liker: '5e8f74d6ef27741e70ce5320',
				},
			},
			update(cache, { createLike }) {
				const { photos } = cache.readQuery(TIMELINE_DATA);
			},
		});
		console.log('about to like');
	};
	const hasUserLiked = () => {};
	return (
		<Card id="timeline-picture-card">
			<CardBody>
				<GridRow>
					<GridItem sm={12} className="timeline-picture-avatar-container">
						<Avatar src="/img/cam1.jpeg" />
						<span>Username: {photo.node.owner.username}</span>
					</GridItem>
				</GridRow>
				<GridRow>
					<GridItem sm={12}>
						<span>{photo.node.story}</span>
					</GridItem>
				</GridRow>
				<CardImage src="/img/cam4.jpeg" />
			</CardBody>
			<Divider />
			<CardBody style={{ paddingTop: 5, paddingBottom: 5 }}>
				<div className="like-comment-container">
					<span>{photo.node.totalLike} likes</span>
					<span>{photo.node.totalComment} comments</span>
				</div>
			</CardBody>
			<Divider />
			<CardBody style={{ paddingTop: 0, paddingBottom: 0 }}>
				<div className="like-comment-container">
					<Flat className="btn-auth" onClick={handleLike}>
						Like
					</Flat>
					<Flat className="btn-auth" onClick={() => commentRef.current.focus()}>
						Comment
					</Flat>
				</div>
			</CardBody>
			<Divider />
			<CardBody>
				{photo.node.id && <Comments photoId={photo.node.id} key={photo.node.cursor} />}

				<AddComment ref={commentRef} photoId={photo.node.id} />
			</CardBody>
		</Card>
	);
};
