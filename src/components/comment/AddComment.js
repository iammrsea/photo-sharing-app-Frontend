import React from 'react';

import { useMutation } from '@apollo/react-hooks';

import { ADD_COMMENT } from 'graphql/mutations/remote';
import { TIMELINE_DATA, COMMENTS_ON_PHOTO } from 'graphql/queries/remote';

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
	const [addComment, { loading, error }] = useMutation(ADD_COMMENT, {
		update(cache, { data: { createComment } }) {
			console.log('addComment', createComment);
			const { commentsByPhotoId } = cache.readQuery({ query: COMMENTS_ON_PHOTO, variables: { photoId } });

			cache.writeQuery({
				query: COMMENTS_ON_PHOTO,
				variables: { photoId },
				data: { commentsByPhotoId: [...commentsByPhotoId, createComment] },
			});
		},
	});

	const [comment, setComment] = React.useState('');

	const handleSend = (e) => {
		if (e.keyCode !== 13) return;
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
							onKeyUp={handleSend}
							style={{ marginLeft: 10 }}
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
