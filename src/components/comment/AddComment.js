import React from 'react';

import { useMutation } from '@apollo/react-hooks';

import { ADD_COMMENT } from 'graphql/mutations/remote';
import { TIMELINE_DATA } from 'graphql/queries/remote';

import { Card, CardBody, CardHeader, CardAction, CardReveal, CardImage } from 'components/card';
import { Divider, Avatar } from 'components';
import { MaterialIcon } from 'components/icons';
import { Flat } from 'components/buttons';

import './AddComment.css';
import { GridRow, GridItem } from 'components/grid';
import { InputField } from 'components/material-fields';
import LinearProgress from 'components/linear-progress/LinearProgress';
import Alert from 'components/alert/Alert';

const AddComment = React.forwardRef(({ photoId }, ref) => {
	console.log('rendering addcomment component');
	const [addComment, { loading, error }] = useMutation(ADD_COMMENT, {
		update(cache, { data: { createComment } }) {
			console.log('addComment', createComment);
			const { photos } = cache.readQuery({ query: TIMELINE_DATA });

			const edges = photos.edges;
			const newEdges = photos.edges.map((photo) => {
				if (photo.node.id === photoId) {
					return {
						...photo,
						node: { ...photo.node, comments: [...photo.node.comments, createComment] },
					};
				}
				return photo;
			});
			photos.edges = newEdges;

			console.log('photos ', photos);

			cache.writeQuery({
				query: TIMELINE_DATA,
				data: { photos },
			});
		},
	});

	const [comment, setComment] = React.useState('');

	const handleSend = () => {
		if (!comment) return;

		const newComment = {
			photoId,
			commentor: '5e8fa889c789240b2824275c',
			content: comment,
		};
		addComment({ variables: { comment: { ...newComment } } });
		setComment('');
	};
	return (
		<>
			{error && Alert({ message: error.message, color: 'red' })}
			{loading && <LinearProgress />}
			<div className="avatar-comment-container2">
				<GridRow>
					<GridItem sm={2} md={1}>
						<Avatar src="/img/cam1.jpeg" />
					</GridItem>
					<GridItem sm={10} md={11}>
						<InputField
							value={loading ? 'Sending...' : comment}
							onChange={(e) => setComment(e.target.value)}
							name="comment"
							labelClassName="noactive"
							placeholder="Write a comment"
							ref={ref}
						/>
					</GridItem>
					<div className="right-align">
						<Flat disabled={loading} className="btn-auth" onClick={handleSend}>
							Send
						</Flat>
					</div>
				</GridRow>
			</div>
		</>
	);
});
export default AddComment;
