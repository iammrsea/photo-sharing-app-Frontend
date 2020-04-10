import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const CardImage = props => {
	const { className, src, children, text, ...rest } = props;

	return (
		<div className={clsx(['card-image', className])} {...rest}>
			<img src={src} alt={text} />
			{children}
		</div>
	);
};

CardImage.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string,
	text: PropTypes.string,
	children: PropTypes.node,
};
export default CardImage;
