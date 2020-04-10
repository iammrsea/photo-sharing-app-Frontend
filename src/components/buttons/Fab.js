import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Fab = props => {
	const { children, className, ...rest } = props;

	return (
		<button className={clsx(['btn-floating waves-effect waves-light', className])} {...rest}>
			{children}
		</button>
	);
};

Fab.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Fab;
