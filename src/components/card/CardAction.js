import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CardAction = props => {
	const { children, className, ...rest } = props;

	return (
		<div className={clsx(['card-action', className])} {...rest}>
			{children}
		</div>
	);
};

CardAction.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CardAction;
