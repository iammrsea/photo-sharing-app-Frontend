import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Flat = props => {
	const { children, className, ...rest } = props;

	return (
		<button
			style={{ textTransform: 'capitalize' }}
			className={clsx(['btn waves-effect waves-light btn-flat product-btn', className])}
			{...rest}
		>
			{children}
		</button>
	);
};

Flat.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Flat;
