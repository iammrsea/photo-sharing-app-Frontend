import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const GridRow = ({ children, className, ...rest }) => {
	return (
		<div className={clsx(['row', className])} {...rest}>
			{children}
		</div>
	);
};

GridRow.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default GridRow;
