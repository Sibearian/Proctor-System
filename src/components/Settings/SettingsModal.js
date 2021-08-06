import React, {  useState } from "react";
import { Modal } from "rsuite";

const SettingsModal = ({ reset }) => {
	const [show, setShow] = useState(true);

	const onHide = () => {
		setShow(false);
		reset(false);
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header>Edit Profile</Modal.Header>
		</Modal>
	);
};

export default SettingsModal;
