import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Normal = props => {
	const { children, className, ...rest } = props;

	return (
		<button
			style={{ textTransform: 'capitalize' }}
			className={clsx(['btn waves-effect waves-light', className])}
			{...rest}
		>
			{children}
		</button>
	);
};

Normal.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Normal;
