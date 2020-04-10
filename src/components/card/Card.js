import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Card = props => {
	const { children, className, ...rest } = props;

	return (
		<div className={clsx(['card', className])} {...rest}>
			{children}
		</div>
	);
};

Card.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default Card;
