import React from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';

import { ADD_COMMENT } from 'graphql/mutations/remote';
import { COMMENTS_ON_PHOTO } from 'graphql/queries/remote';
import { UPDATE_TOTAL_COMMENT_COUNT } from 'graphql/mutations/local';
import { GET_AUTH_USER, GET_ME_PROFILE } from 'graphql/queries/local';

import { Avatar } from 'components';
import { Flat } from 'components/buttons';

import './AddComment.css';
import { GridRow, GridItem } from 'components/grid';
import { InputField } from 'components/material-fields';
import Alert from 'components/alert/Alert';

const AddComment = React.forwardRef(({ photoId }, ref) => {
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const [updateTotalComment] = useMutation(UPDATE_TOTAL_COMMENT_COUNT);

	const { data: meProfileData } = useQuery(GET_ME_PROFILE, { variables: { userId: authUser.userId } });

	// console.log('me profile data', meProfileData);
	const [addComment, { loading }] = useMutation(ADD_COMMENT, {
		update(cache, { data: { createComment } }) {
			const { commentsByPhotoId } = cache.readQuery({ query: COMMENTS_ON_PHOTO, variables: { photoId } });
			cache.writeQuery({
				query: COMMENTS_ON_PHOTO,
				variables: { photoId },
				data: { commentsByPhotoId: [...commentsByPhotoId, createComment] },
			});
			updateTotalComment({ variables: { id: photoId } });
		},
	});

	const [comment, setComment] = React.useState('');

	const handleSend = (e) => {
		if (!comment) return;

		if (e.keyCode === 13 || e.type === 'click') {
			const newComment = {
				photoId,
				commentor: authUser.userId,
				content: comment,
			};
			addComment({ variables: { comment: { ...newComment } } }).catch((e) => {
				Alert({ message: e.message, color: 'red' });
			});
			setComment('');
		} else return;
	};

	return (
		<>
			<div className="avatar-comment-container2">
				<GridRow>
					<GridItem sm={2} md={1}>
						<Avatar
							src={
								meProfileData && meProfileData.getMeProfile.profile
									? meProfileData.getMeProfile.profile.picture
									: '/img/cam1.jpeg'
							}
						/>
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
							className="write-comment-field"
						/>
					</GridItem>
				</GridRow>
				<div className="right-align">
					<Flat disabled={loading} className="btn-auth" onClick={handleSend}>
						Send
					</Flat>
				</div>
			</div>
		</>
	);
});
export default AddComment;
