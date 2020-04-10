import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Collection = ({ children, className, ...rest }) => {
	return (
		<ul className={clsx(['collection', className])} {...rest}>
			{children}
		</ul>
	);
};

Collection.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
export default Collection;
