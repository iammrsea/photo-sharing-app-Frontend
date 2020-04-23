import React from 'react';
import { useApolloClient, useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardImage } from 'components/card';
import { Divider, Avatar, Alert } from 'components';

import { TIMELINE_DATA, USER_SHARED_PHOTOS } from 'graphql/queries/remote';
import { LIKE_PHOTO, UNLIKE_PHOTO } from 'graphql/mutations/remote';
import { GET_AUTH_USER } from 'graphql/queries/local';

import { Flat } from 'components/buttons';

import './Photo.css';
import { GridRow, GridItem } from 'components/grid';

import { AddComment } from 'components/comment';
import Comments from 'components/comment/Comments';
import PhotoLikers from 'components/photo-likers/PhotoLikers';
import { PHOTOLIKEDORUNLIKED } from 'graphql/subscriptions';

import { UPDATE_TOTAL_LIKES } from 'graphql/mutations/local';
import { MaterialIcon } from 'components/icons';

export default (props) => {
	const [likePhoto, { loading }] = useMutation(LIKE_PHOTO);
	const [unlikePhoto, { loading: unliking }] = useMutation(UNLIKE_PHOTO);

	const [updateTotalLikes] = useMutation(UPDATE_TOTAL_LIKES);

	const client = useApolloClient();
	const [photo, setPhoto] = React.useState(props.photo);

	const history = useHistory();

	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);

	const commentRef = React.useRef(null);
	const btnRef = React.useRef(null);

	const modal = React.useRef(null);

	useSubscription(PHOTOLIKEDORUNLIKED, {
		variables: { identifier: `photo-${props.photo.node.id}` },
		onSubscriptionData({
			subscriptionData: {
				data: { photoLikedOrUnliked },
			},
		}) {
			if (photoLikedOrUnliked.likerId === authUser.userId) return;
			updateTotalLikes({
				variables: {
					photoId: photo.node.id,
					likerId: photoLikedOrUnliked.likerId,
					action: photoLikedOrUnliked.action,
				},
			});
		},
	});

	const updatePhotoStatus = (photos) => {
		photos.edges.forEach((photoItem) => {
			//Retrieves the currently viewed photo
			if (photoItem.node.id === photo.node.id) {
				//Checks if the viewed photo's likes attribute has changed due to like
				//or unlike operation
				if (photoItem.node.likes.length !== photo.node.likes.length) {
					//Updates the currently viewed photo so that current number of likes will reflect
					setPhoto(photoItem);
				}
				//Checks if the viewed photo's totalComment attribute has changed due to a user
				//dropping a comment
				if (photoItem.node.totalComment !== photo.node.totalComment) {
					//Updates the currently viewed photo so that current number of comments will reflect
					setPhoto(photoItem);
				}
			}
		});
	};
	React.useEffect(() => {
		//Observes the query TIMELINE_DATA for changes when a photo is  liked or unliked
		const observable1 = client
			.watchQuery({
				query: TIMELINE_DATA,
			})
			.subscribe(({ data: { photos } }) => {
				updatePhotoStatus(photos);
			});

		const observable2 = client
			.watchQuery({
				query: USER_SHARED_PHOTOS,
				variables: { id: props.userIdForSharedPhotos || authUser.userId },
			})
			.subscribe(
				({
					data: {
						user: { sharedPhotos },
					},
				}) => {
					updatePhotoStatus(sharedPhotos);
				}
			);
		return function cleanup() {
			observable1.unsubscribe();
			observable2.unsubscribe();
		};
	});

	const handleUnlike = () => {
		unlikePhoto({
			variables: {
				unlikePhotoData: {
					photoId: photo.node.id,
					likerId: authUser.userId,
				},
			},
		})
			.then((res) => {
				updateTotalLikes({
					variables: {
						photoId: photo.node.id,
						likerId: authUser.userId,
						action: 'unlike',
					},
				});
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log(e);
			});
	};

	const handleLike = () => {
		if (btnRef.current.children[0].classList.contains('indigo-text')) {
			return handleUnlike();
		}
		likePhoto({
			variables: {
				likePhotoData: {
					photoId: photo.node.id,
					likerId: authUser.userId,
				},
			},
		})
			.then((res) => {
				updateTotalLikes({
					variables: {
						photoId: photo.node.id,
						likerId: authUser.userId,
						action: 'like',
					},
				});
			})
			.catch((e) => {
				Alert({ message: e.message, color: 'red' });
				console.log(e);
			});
	};
	const hasUserLiked = (likeList = []) => {
		// console.log('likeList and photoId ', likeList, photo.node.id);
		return likeList.findIndex((id) => id === authUser.userId) > -1;
	};
	const handleLikesClick = (id) => {
		if (!photo.node.likes.length) {
			return;
		}
		openModal(id);
	};

	const visitProfile = (id) => {
		if (authUser.userId === id) {
			return history.push('/profile');
		}
		history.push('/profile/' + id, { id });
	};
	const openModal = (id) => {
		const elems = document.querySelectorAll('.likers-modal' + id);
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);
		modal.current = instances[0];

		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};
	return (
		<Card id="timeline-picture-card">
			<CardBody>
				<GridRow>
					<GridItem sm={12} className="timeline-picture-avatar-container">
						<Avatar src={photo.node.owner.profile ? photo.node.owner.profile.picture : '/img/cam1.jpeg'} />
						<span onClick={() => visitProfile(photo.node.owner.id)} className="pink-text username">
							{photo.node.owner.username}
						</span>
					</GridItem>
				</GridRow>
				<GridRow>
					<GridItem sm={12}>
						<span>{photo.node.description}</span>
					</GridItem>
				</GridRow>
				<CardImage src={photo.node.photoUrl || '/img/cam4.jpeg'} />
			</CardBody>
			<Divider />
			<CardBody style={{ paddingTop: 5, paddingBottom: 5 }}>
				<div className="like-comment-container">
					<span className="likes" onClick={() => handleLikesClick(photo.node.id)}>
						{photo.node.likes.length} likes
					</span>
					<span>{photo.node.totalComment} comments</span>
				</div>
			</CardBody>
			<Divider />
			<CardBody style={{ paddingTop: 0, paddingBottom: 0 }}>
				<div className="like-comment-container">
					{!loading || !unliking ? (
						<button
							onClick={handleLike}
							style={{ textTransform: 'capitalize' }}
							className="btn waves-effect btn-flat like-btn"
							ref={btnRef}
						>
							{hasUserLiked(photo.node.likes) ? (
								<i className="fas  indigo-text fa-thumbs-up" style={{ fontSize: 22 }}></i>
							) : (
								<i className="fas  pink-text fa-thumbs-up" style={{ fontSize: 22 }}></i>
							)}
						</button>
					) : (
						'Sending...'
					)}
					<Flat className="comment-btn" onClick={() => commentRef.current.focus()}>
						<MaterialIcon children="comment" style={{ fontSize: 25 }} />
					</Flat>
				</div>
			</CardBody>
			<Divider />
			<CardBody>
				{photo.node.id && <Comments photoId={photo.node.id} key={photo.node.cursor} />}

				<AddComment ref={commentRef} photoId={photo.node.id} />
			</CardBody>
			{photo.node.likes.length > 0 && (
				<CardBody>
					<PhotoLikers photoId={photo.node.id} closeModal={closeModal} ids={photo.node.likes} />
				</CardBody>
			)}
		</Card>
	);
};
