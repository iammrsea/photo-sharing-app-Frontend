import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';

const Avatar = ({ src }) => {
	return <img src={src} alt="" className="custom-avatar" />;
};

Avatar.propTypes = {
	src: PropTypes.string.isRequired,
};

export default Avatar;
