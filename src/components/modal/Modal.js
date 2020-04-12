import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Card } from 'components/card';

const Modal = ({ children, id, title, className }) => {
	return (
		<Card>
			<div id={id} className={clsx(['modal', className])}>
				<div className="modal-content">
					<h5 className="center-align pink-text" id="modal-title">
						{title}
					</h5>
					{children}
				</div>
			</div>
		</Card>
	);
};

export default Modal;

Modal.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string,
	title: PropTypes.string.isRequired,
};
