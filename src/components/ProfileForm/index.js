import React, { useCallback, useRef, useState } from "react";
import {
	Alert,
	Button,
	Container,
	Content,
	ControlLabel,
	Footer,
	Form,
	FormControl,
	FormGroup,
	SelectPicker,
} from "rsuite";
import { auth, firestore } from "../../misc/firebase";
import {
	departments,
	INITIAL_VALUE,
	model,
	semesters,
} from "../../misc/form.helper";
import AvatarUploadBtn from "./AvatarUploadBtn";

const ProfileForm = ({ profile }) => {
	const [formValue, setFormValue] = useState(INITIAL_VALUE || profile);
	const [isLoading, setIsLoading] = useState(false);
	const { uid, photoURL, displayName, email } = auth.currentUser || {};

	const formRef = useRef();

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);

	const onFormSubmit = () => {
		if (!formRef.current.check() && !uid) {
			return;
		}

		setIsLoading(true);

		const newUserData = {
			...formValue,
			student_of: true,
			avatar: photoURL,
			email,
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

	return (
		<Container>
			<Content>
				<Form
					layout="horizontal"
					ref={formRef}
					model={model}
					onChange={onFormChange}
					formValue={formValue}
				>
					<FormGroup>
						<ControlLabel>Name :</ControlLabel>
						<FormControl name="name" placeholder={profile.name} />
					</FormGroup>

					<FormGroup>
						<ControlLabel>Age :</ControlLabel>
						<FormControl name="age" placeholder={profile.age} />
					</FormGroup>

					<FormGroup>
						<ControlLabel>Blood Group :</ControlLabel>
						<FormControl name="blood_group" placeholder={profile.blood_group} />
					</FormGroup>

					<FormGroup>
						<ControlLabel>Semester :</ControlLabel>
						<FormControl
							name="semester"
							data={semesters}
							accepter={SelectPicker}
							defaultValue={profile.semester}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Branch :</ControlLabel>
						<FormControl
							name="branch"
							data={departments}
							accepter={SelectPicker}
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Regestration No :</ControlLabel>
						<FormControl
							name="registration_number"
							placeholder={profile.registration_number}
						/>
					</FormGroup>

					{profile.name && (
						<Container>
							<Content>
								<img
									src={profile.avatar || photoURL}
									style={{
										height: 150,
										width: 150,
										borderRadius: "50%",
										margin: 25,
									}}
									alt={profile.name || displayName}
								/>
							</Content>

							<Footer>
								<Button>
									<AvatarUploadBtn />
								</Button>
							</Footer>
						</Container>
					)}
				</Form>
			</Content>
			<Footer>
				<Button
					block
					appearance="primary"
					onClick={onFormSubmit}
					disabled={isLoading}
				>
					Submit
				</Button>
			</Footer>
		</Container>
	);
};

export default ProfileForm;
