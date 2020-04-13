import React from 'react';

const AboutUser = ({ profile }) => {
	return (
		<p>
			{profile
				? profile.description
				: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptatum eum, rem
										neque incidunt omnis, delectus architecto vero suscipit ducimus esse velit ex
										tempore magni debitis aliquid odit at adipisci.`}
		</p>
	);
};

export default AboutUser;