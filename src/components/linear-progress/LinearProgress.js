import React from 'react';

export default (props) => {
	return (
		<div className="progress pink" {...props}>
			<div className="indeterminate pink lighten-4"></div>
		</div>
	);
};
