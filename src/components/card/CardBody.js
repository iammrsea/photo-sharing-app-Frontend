import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CardBody = props => {
	const { children, className, ...rest } = props;

	return (
		<div className={clsx(['card-content', className])} {...rest}>
			{children}
		</div>
	);
};

CardBody.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CardBody;
