import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { USER_SHARED_PHOTOS } from 'graphql/queries/remote';
import { GET_AUTH_USER } from 'graphql/queries/local';

import { LinearProgress, Alert } from 'components';
import { Photos } from 'components';
import { Card, CardBody, CardHeader } from 'components/card';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';

import ProfilePicture from './components/ProfilePicture';
import AddEditProfileModal from './components/AddProfile';
import AboutUser from './components/AboutUser';
import './Profile.css';

export default ({ userId }) => {
	const {
		data: { authUser },
	} = useQuery(GET_AUTH_USER);
	const { data, loading, error, fetchMore } = useQuery(USER_SHARED_PHOTOS, {
		variables: { id: userId || authUser.userId },
	});

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
									<CardHeader>
										<span>{data.user.username}</span>
									</CardHeader>
									<CardHeader>
										<span>About</span>
									</CardHeader>
									{userId && <AboutUser profile={data.user.profile} />}
									{!userId && <AboutUser profile={data.me.profile} />}
									{!userId && (
										<>
											{data.me.profile ? (
												<div className="right-align">
													<Flat onClick={openModal} className="btn-auth">
														Edit Profile
													</Flat>
													<Flat className="btn-auth">Change Picture</Flat>
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
								</CardBody>
							</Card>
						</GridItem>
					</GridRow>
					<div className="pink-text center-align shared-photos">
						<span>{!userId ? 'Photos you shared' : `Photos shared by ${data.user.username}`}</span>
					</div>

					<GridRow>
						<GridItem sm={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
							<Photos
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
			<AddEditProfileModal closeModal={closeModal} />
		</>
	);
};
