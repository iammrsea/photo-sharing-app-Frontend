import React from 'react';
import { Modal } from 'components';
import { Card, CardBody, CardAction } from 'components/card';
import { Flat } from 'components/buttons';
import { MaterialIcon } from 'components/icons';
import { InputField } from 'components/material-fields';

export default ({ closeModal }) => {
	return (
		<Modal title="Select">
			<div className="file-field input-field">
				<Flat className="upload-btn">
					<MaterialIcon children="add_a_photo" />
					<input type="file" />
				</Flat>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text" />
				</div>
			</div>
			<InputField
				id="description"
				name="description"
				type="text"
				label="A little description of your picture"
				labelClassName="noactive"
			/>
			<div className="input-field ">
				<select id="category" name="category" style={{ display: 'block', background: 'inherit' }}>
					<option value="">Select Category</option>
					<option value="1">ACTION</option>
					<option value="2">FUN</option>
					<option value="3">GRAPHIC</option>
					<option value="3">OTHER</option>
				</select>
			</div>
			<InputField
				id="tags"
				name="tages"
				type="text"
				label="Tag others using @username"
				labelClassName="noactive"
			/>
			<div className="right-align">
				<Flat className="btn-auth">Share</Flat>
				<Flat className="btn-auth" onClick={closeModal}>
					Close
				</Flat>
			</div>
		</Modal>
	);
};
