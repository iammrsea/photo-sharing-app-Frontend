import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const InputField = React.forwardRef(({ id, labelClassName, styleLabel, label, ...rest }, ref) => {
	return (
		<div className={clsx(['input-field', { 'login-label': styleLabel }])}>
			<input {...rest} id={id} ref={ref} />
			{id && label && (
				<label className={labelClassName} htmlFor={id}>
					{label}
				</label>
			)}
		</div>
	);
});

InputField.defaultProps = {
	labelClassName: 'active',
};
InputField.propTypes = {
	id: PropTypes.string,
	labelClassName: PropTypes.string,
	label: PropTypes.string,
	styleLabel: PropTypes.string,
};

export default InputField;
