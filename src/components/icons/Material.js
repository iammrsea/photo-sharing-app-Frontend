import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Material = props => {
	const { children, className, ...rest } = props;

	return (
		<i className={clsx(['material-icons', className])} {...rest}>
			{children}
		</i>
	);
};

Material.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Material;
