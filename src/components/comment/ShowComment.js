import React, { useState } from 'react';

import { Avatar } from 'components';
import moment from 'moment';

import { Flat } from 'components/buttons';
import { useHistory } from 'react-router-dom';

import './ShowComment.css';
import { InputField } from 'components/material-fields';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { REPLY_COMMENT } from 'graphql/mutations/remote';
import { GET_AUTH_USER } from 'graphql/queries/local';
import { COMMENTS_ON_PHOTO } from 'graphql/queries/remote';
import { Collection, CollectionItem } from 'components/collections';
import Alert from 'components/alert/Alert';
import { REPLY_ADDED } from 'graphql/subscriptions';

const AvatarComment = ({ user, comment, visitProfile }) => {
	return (
		<div className="avatar-comment-container-showcomment-comp">
			<Avatar src={user.profile ? user.profile.picture : '/img/cam1.jpeg'} />
			<p>
				<span onClick={visitProfile} className="commentor">
					{user.username}
				</span>
				{comment.content}
			</p>
		</div>
	);
};
const Replies = ({ comment, visitProfile }) => {
	return (
		<Collection style={{ borderRadius: 15, border: 'solid 2px #e0e0e0' }}>
			<CollectionItem className="left-align">Replies to comment</CollectionItem>
			{comment.replies.map((reply) => (
				<CollectionItem key={reply.id}>
					<AvatarComment
						user={reply.replier}
						comment={reply}
						visitProfile={() => visitProfile(reply.replier.id)}
					/>
					<span>{moment(+reply.createdAt).fromNow()}</span>
				</CollectionItem>
			))}
		</Collection>
	);
};

export default ({ comment, photoId }) => {
	const history = useHistory();

	const [createReply, { loading }] = useMutation(REPLY_COMMENT);

	const [replyOpen, setReplyOpen] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const [reply, setReply] = useState('');
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const visitProfile = (id) => {
		if (authUser.userId === id) {
			return history.push('/profile');
		}
		history.push('/profile/' + id, { id });
	};

	const handleReplyClick = () => {
		setReplyOpen((state) => !state);
	};
	const handleSendReply = (e) => {
		if (e.keyCode !== 13) return;
		if (!reply) return;
		createReply({
			variables: {
				reply: {
					replier: authUser.userId,
					commentId: comment.id,
					content: reply,
				},
			},
			update(cache, { data: { createReply } }) {
				const { commentsByPhotoId } = cache.readQuery({
					query: COMMENTS_ON_PHOTO,
					variables: {
						photoId,
					},
				});
				const newComments = commentsByPhotoId.map((commentItem) => {
					if (commentItem.id === comment.id) {
						return {
							...commentItem,
							replies: [...commentItem.replies, createReply],
						};
					}
					return commentItem;
				});

				cache.writeQuery({
					query: COMMENTS_ON_PHOTO,
					variables: {
						photoId,
					},
					data: {
						commentsByPhotoId: [...newComments],
					},
				});
			},
		}).catch((e) => {
			Alert({ message: e.message, color: 'red' });
			console.log(e);
		});
		setReply('');
	};

	return (
		<div>
			<AvatarComment
				user={comment.commentor}
				comment={comment}
				visitProfile={() => visitProfile(comment.commentor.id)}
			/>
			<div className="right-align" style={{ marginTop: 5, marginBottom: 10 }}>
				<span>{moment(+comment.createdAt).fromNow()}</span>
				{comment.replies.length > 0 && (
					<span className="comment-replies" onClick={() => setShowReplies((state) => !state)}>
						<span style={{ paddingRight: 2 }}>{comment.replies.length}</span>
						{showReplies ? 'Hide' : 'Replies'}
					</span>
				)}
				<Flat className=" reply-btn" onClick={handleReplyClick}>
					{replyOpen ? 'Hide' : 'Reply'}
				</Flat>

				{showReplies && <Replies comment={comment} visitProfile={visitProfile} />}

				{replyOpen && (
					<div style={{ paddingLeft: 55 }}>
						<InputField
							onKeyUp={handleSendReply}
							onChange={(e) => setReply(e.target.value)}
							value={loading ? 'Replying...' : reply}
							type="text"
							placeholder="Type reply and hit Enter"
							autoFocus
						/>
					</div>
				)}
			</div>
		</div>
	);
};
