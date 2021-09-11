import React from "react";
import { Alert, Modal } from "rsuite";
import { auth } from "../../misc/firebase";
import ProfileForm from "../ProfileForm";

const CreateUserBtn = ({ show, close }) => {
	const onHide = async () => {
		if (auth.currentUser) {
			close();
			await auth.currentUser.delete();
			Alert.warning("Account deleted");
		}
	};

	return (
		<div>
			<Modal show={show} onHide={onHide}>
				<Modal.Header>
					<Modal.Title>Enter your details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ProfileForm profile={{}} isNewUser />
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CreateUserBtn;
