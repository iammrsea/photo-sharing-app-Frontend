import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER_SHARED_PHOTOS } from 'graphql/queries/remote';
import { GET_AUTH_USER } from 'graphql/queries/local';

import { LinearProgress, Alert, Divider } from 'components';
import { Photos } from 'components';
import { Card, CardBody, CardHeader } from 'components/card';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';

import ProfilePicture from './components/ProfilePicture';
import AddProfileModal from './components/AddProfile';
import ChangeProfilePicture from './components/ChangeProfilePicture';
import EditProfile from './components/EditProfile';
import AboutUser from './components/AboutUser';

import './Profile.css';

export default ({ userId }) => {
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);
	const { data, loading, error, fetchMore } = useQuery(USER_SHARED_PHOTOS, {
		variables: { id: userId || authUser.userId },
	});
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [showChangeProfilePic, setShowChangeProfilePic] = useState(false);

	// console.log('authUser', authUser);
	// if (data) {
	// 	console.log('photos shared', data);
	// }
	const modal = React.useRef(null);

	React.useEffect(() => {
		const elems = document.querySelectorAll('.add-profile-modal');
		// eslint-disable-next-line
		const instances = M.Modal.init(elems);
		modal.current = instances[0];
	});
	const openModal = () => {
		modal.current.open();
	};
	const closeModal = () => {
		modal.current.close();
	};

	return (
		<>
			{error && Alert({ message: error.message, color: 'red' })}
			{loading && <LinearProgress />}

			{data && data.me && !userId && <ProfilePicture profile={data.me.profile} />}
			{data && data.user && (
				<div>
					{userId && <ProfilePicture profile={data.user.profile} />}
					<GridRow>
						<GridItem sm={12}>
							<Card>
								<CardBody>
									<CardHeader style={{ marginBottom: 30 }}>
										<span>{data.user.username}</span>
									</CardHeader>
									<Divider />
									<CardHeader style={{ marginTop: 30 }}>
										<span>About</span>
									</CardHeader>
									{userId && <AboutUser profile={data.user.profile} />}
									{!userId && <AboutUser profile={data.me.profile} />}
									{!userId && (
										<>
											{data.me.profile ? (
												<div className="right-align">
													<Flat
														onClick={() => setShowEditProfile((state) => !state)}
														className="btn-auth"
													>
														{showEditProfile ? 'Cancel' : 'Edit Profile'}
													</Flat>
													<Flat
														onClick={() => setShowChangeProfilePic((state) => !state)}
														className="btn-auth"
													>
														{showChangeProfilePic ? 'Cancel' : 'Change Picture'}
													</Flat>
												</div>
											) : (
												<div className="right-align">
													<Flat onClick={openModal} className="btn-auth ">
														Add Profile
													</Flat>
												</div>
											)}
										</>
									)}
									{showEditProfile && (
										<>
											<EditProfile
												style={{ marginTop: 30 }}
												about={data.me.profile.about}
												profileId={data.me.profile.id}
												showEditProfile={setShowEditProfile}
											/>
										</>
									)}
									{showChangeProfilePic && (
										<ChangeProfilePicture
											style={{ marginTop: 30 }}
											profileId={data.me.profile.id}
											showChangeProfilePic={setShowChangeProfilePic}
										/>
									)}
								</CardBody>
							</Card>
						</GridItem>
					</GridRow>
					<div className="pink-text center-align shared-photos">
						<span>{!userId ? 'Photos you shared' : `Photos shared by ${data.user.username}`}</span>
					</div>

					<GridRow>
						<GridItem sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
							<Photos
								userIdForSharedPhotos={userId}
								photos={data.user.sharedPhotos.edges || []}
								hasNextPage={data.user.sharedPhotos.pageInfo.hasNextPage || false}
								loadMorePhotos={() => {
									fetchMore({
										variables: {
											after: data.user.sharedPhotos.pageInfo.endCursor,
										},
										updateQuery: (previousResult, { fetchMoreResult }) => {
											const newEdges = fetchMoreResult.user.sharedPhotos.edges;
											const pageInfo = fetchMoreResult.user.sharedPhotos.pageInfo;
											return newEdges.length
												? {
														user: {
															...previousResult.user,
															sharedPhotos: {
																__typename: previousResult.user.sharedPhotos.__typename,
																edges: [
																	...previousResult.user.sharedPhotos.edges,
																	...newEdges,
																],
																pageInfo,
															},
															__typename: previousResult.user.__typename,
														},
														me: previousResult.me,
												  }
												: previousResult;
										},
									});
								}}
							/>
						</GridItem>
					</GridRow>
				</div>
			)}
			<AddProfileModal closeModal={closeModal} />
		</>
	);
};
