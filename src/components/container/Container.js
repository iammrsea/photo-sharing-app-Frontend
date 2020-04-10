import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, ...rest }) => {
	return <div className="container">{children}</div>;
};

Container.propTypes = {
	children: PropTypes.node.isRequired,
};
export default Container;
