import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CardHeader = props => {
	const { children, className, ...rest } = props;

	return (
		<div className={clsx(['card-title', className])} {...rest}>
			{children}
		</div>
	);
};

CardHeader.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CardHeader;
