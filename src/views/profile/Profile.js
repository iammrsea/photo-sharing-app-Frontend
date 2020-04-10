import React from 'react';
import { Container, Avatar } from 'components';

import './Profile.css';
import { Card, CardBody, CardHeader } from 'components/card';
import { GridRow, GridItem } from 'components/grid';
import { Flat } from 'components/buttons';
import TimelinePicture from 'views/timeline/components/TimelinePicture';

export default () => {
	return (
		<div>
			<div className="profile">
				<img src="/img/cam1.jpeg" alt="" id="cover" />
				<img src="/img/cam4.jpeg" id="profile-avatar" />
			</div>
			<GridRow>
				<GridItem sm={12}>
					<Card>
						<CardBody>
							<CardHeader>
								<span>Timothy Flair</span>
							</CardHeader>
							<CardHeader>
								<span>About</span>
							</CardHeader>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatum eum, rem neque
								incidunt omnis, delectus architecto vero suscipit ducimus esse velit ex tempore magni
								debitis aliquid odit at adipisci.
							</p>
							<div className="right-align">
								<Flat className="btn-auth">Edit Profile</Flat>
							</div>
						</CardBody>
					</Card>
				</GridItem>
			</GridRow>
		</div>
	);
};
