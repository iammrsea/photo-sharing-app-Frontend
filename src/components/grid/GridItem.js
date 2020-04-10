import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const classes = ({ sm, md, lg, smOffset, mdOffset, lgOffset, className }) => {
	const s = `s${sm}`;
	const m = `m${md}`;
	const l = `l${lg}`;
	const sOffset = `offset-s${smOffset}`;
	const mOffset = `offset-m${mdOffset}`;
	const lOffset = `offset-l${lgOffset}`;
	return clsx([
		'col',
		{ [s]: sm },
		{ [m]: md },
		{ [l]: lg },
		{ [sOffset]: smOffset },
		{ [mOffset]: mdOffset },
		{ [lOffset]: lgOffset },
		className,
	]);
};
const GridItem = props => {
	const { children, ...rest } = props;
	return <div className={classes(rest)}>{children}</div>;
};

GridItem.propTypes = {
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	smOffset: PropTypes.number,
	mdOffset: PropTypes.number,
	lgOffset: PropTypes.number,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default GridItem;
