import React, { useState } from "react";
import { Modal } from "rsuite";
import { auth } from "../../misc/firebase";
import ProfileForm from "../ProfileForm";

const CreateUserBtn = () => {
	const [show, setShow] = useState(true);

	const onHide = async () => {
		if (auth.currentUser) {
			await auth.currentUser.delete();
			setShow(false);
		}
	};

	return (
		<div>
			<Modal show={show} onHide={onHide}>
				<Modal.Header>
					<Modal.Title>Enter your details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ProfileForm profile={{}} />
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CreateUserBtn;
