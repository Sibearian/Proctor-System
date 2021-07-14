import React, { useCallback, useRef, useState } from "react";
import {
	Alert,
	Button,
	ControlLabel,
	Form,
	FormControl,
	FormGroup,
	Modal,
} from "rsuite";
import { auth, firestore } from "../../misc/firebase";
import { INITIAL_VALUE, model } from "./form.helper";

const CreateUserBtn = () => {
	const { uid } = auth.currentUser;

	const [show, setShow] = useState(true);
	const [formValue, setFormValue] = useState(INITIAL_VALUE);
	const [isLoading, setIsLoading] = useState(false);

	const formRef = useRef();

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);

	const onSubmit = () => {
		if (!formRef.current.check() && !uid) {
			return;
		}

		setIsLoading(true);

		const newUserData = {
			...formValue,
			student: true,
		};

		firestore
			.collection("users")
			.doc(String(uid))
			.set(newUserData)
			.then(() => {
				Alert.success("Account created", 4000);
			})
			.catch((error) => {
				Alert.error(error.message, 4000);
			})
			.finally(() => {
				setFormValue(INITIAL_VALUE);
				setIsLoading(false);
				window.location.reload(false);
			});
	};

	const onHide = () => {
		if (isLoading) {
			return;
		}
		if (auth.currentUser) {
			Promise.all([auth.currentUser.delete()]);
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
		</div>
	);
};

export default CreateUserBtn;
