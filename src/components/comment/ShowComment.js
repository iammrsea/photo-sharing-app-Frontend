import React from 'react';

import { Avatar } from 'components';
import moment from 'moment';

import { Flat } from 'components/buttons';
import { useHistory } from 'react-router-dom';

import './ShowComment.css';

export default ({ comment }) => {
	// console.log('comment', comment.id);
	const history = useHistory();
	const visitProfile = () => {
		history.push('/profile/' + comment.commentor.id, { id: comment.commentor.id });
	};
	return (
		<div>
			<div id="avatar-comment-container">
				<Avatar src="/img/cam1.jpeg" />
				<p>
					<span onClick={visitProfile} id="commentor">
						{comment.commentor.username}
					</span>
					{comment.content}
				</p>
			</div>
			<div className="right-align" style={{ marginTop: 5, marginBottom: 10 }}>
				<Flat className=" btn-auth">Reply</Flat>
				<span>33mins ago</span>
			</div>
		</div>
	);
};
