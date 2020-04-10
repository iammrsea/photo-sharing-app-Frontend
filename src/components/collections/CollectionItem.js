import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const CollectionItem = ({ children, className, ...rest }) => {
	return (
		<li className={clsx(['collection-item', className])} {...rest}>
			{children}
		</li>
	);
};

CollectionItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default CollectionItem;
