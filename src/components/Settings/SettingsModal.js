import React, { useCallback, useRef, useState } from "react";
import { Button, ControlLabel, Form, FormControl, FormGroup, Modal } from "rsuite";
import { auth } from "../../misc/firebase";
import { INITIAL_VALUE, model } from "../../misc/form.helper";

const SettingsModal = ({ reset }) => {
	const [show, setShow] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [formValue, setFormValue] = useState(INITIAL_VALUE);

	const { uid } = auth.currentUser;
	
	const formRef = useRef()

	const onHide = () => {
		setShow(false);
		reset(false);
	};

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);
	
	const onSubmit = () => {
		if (!formRef.current.check() && !uid) {
			return;
		}

		setIsLoading(true);
	}

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header>
				<Modal.Title>Edit Profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<Form
						ref={formRef}
						onChange={onFormChange}
						formValue={formValue}
						model={model}
					>
						<FormGroup>
							<ControlLabel>name</ControlLabel>
							<FormControl name="name" />
						</FormGroup>

						<FormGroup>
							<ControlLabel>Branch</ControlLabel>
							<FormControl name="branch" />
						</FormGroup>
					</Form>
			</Modal.Body>
				<Modal.Footer>
					<Button
						block
						appearance="primary"
						onClick={onSubmit}
						disabled={isLoading}
					>
						Submit
					</Button>
				</Modal.Footer>
		</Modal>
	);
};

export default SettingsModal;
