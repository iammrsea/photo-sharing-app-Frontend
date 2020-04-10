import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CardReveal = props => {
	const { children, className, ...rest } = props;

	return (
		<div className={clsx(['card-reveal', className])} {...rest}>
			{children}
		</div>
	);
};

CardReveal.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CardReveal;
