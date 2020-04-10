import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const CollectionHeader = ({ children, className, ...rest }) => {
	return (
		<li className={clsx(['collection-header', className])} {...rest}>
			{children}
		</li>
	);
};

CollectionHeader.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CollectionHeader;
