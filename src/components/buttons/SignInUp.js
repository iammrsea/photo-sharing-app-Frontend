import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const SignInUp = props => {
	const { children, className, ...rest } = props;

	return (
		<button
			style={{ textTransform: 'capitalize' }}
			className={clsx(['btn waves-effect waves-light btn-flat ', { 'product-btn': !className }, className])}
			{...rest}
		>
			{children}
		</button>
	);
};

SignInUp.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default SignInUp;
