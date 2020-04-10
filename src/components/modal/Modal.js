import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'components/card';

const Modal = ({ children, id, title }) => {
	return (
		<Card>
			<div id={id} className="modal">
				<div className="modal-content">
					<h5 className="center-align pink-text">{title}</h5>
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
