import React, { useCallback, useRef, useState } from "react";
import {
	Alert,
	Button,
	Container,
	Content,
	ControlLabel,
	Footer,
	Form,
	Divider,
	FormControl,
	FormGroup,
	SelectPicker,
	RadioGroup,
	Radio,
} from "rsuite";
import { auth, firestore } from "../../misc/firebase";
import {
	departments,
	INITIAL_VALUE,
	model,
	semesters,
	subjects,
} from "../../misc/form.helper";
import AvatarUploadBtn from "./AvatarUploadBtn";

const ProfileForm = ({ profile, isNewUser }) => {
	const [formValue, setFormValue] = useState(INITIAL_VALUE || profile);
	const [isUploading, setIsUploading] = useState(false);
	const { uid, photoURL, displayName, email } = auth.currentUser || {};

	const formRef = useRef();

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);

	const onFormSubmit = () => {
		if (!formRef.current.check() && !uid && profile.name === undefined) {
			return;
		}

		const form = {};

		Object.keys(formValue).forEach((value) => {
			form[value] =
				INITIAL_VALUE[value] === formValue[value]
					? profile[value]
					: formValue[value];
		});

		if (Object.keys(form).some((value) => form[value] === "")) {
			Alert.warning("Please enter all the fields");
		}

		setIsUploading(true);
		const { semester: sem, branch, year, semesterIs } = form;
		const data = subjects[branch][sem];

		if (isNewUser) {
			const newUserData = {
				...form,
				student_of: "not_assigned",
				avatar:
					photoURL ||
					"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
					setIsUploading(false);
				});
			firestore
				.collection("results")
				.doc(String(uid))
				.set({
					uid,
					[year]: {
						[semesterIs]: {
							semester: sem,
							...data,
						},
					},
				});
		} else {
			firestore
				.collection("users")
				.doc(String(uid))
				.update({ ...form });
			firestore
				.collection("results")
				.doc(String(uid))
				.update({
					[year]: {
						[semesterIs]: {
							semester: sem,
							...data,
						},
					},
				});

			Alert.success("Information Updated");
		}
	};
	return (
		<>
			<Form
				className="align-items-center"
				layout="vertical"
				ref={formRef}
				model={model}
				onChange={onFormChange}
				formValue={formValue}
				formDefaultValue={profile}
			>
				<FormGroup>
					<ControlLabel>Name :</ControlLabel>
					<FormControl
						name="name"
						placeholder={profile.name}
						className="ml-2"
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Age :</ControlLabel>
					<FormControl name="age" placeholder={profile.age} className="ml-2" />
				</FormGroup>

				<FormGroup>
					<ControlLabel>Blood Group :</ControlLabel>
					<FormControl
						name="blood_group"
						placeholder={profile.blood_group}
						className="ml-2"
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Phone Number :</ControlLabel>
					<FormControl name="number" />
				</FormGroup>

				<FormGroup>
					<ControlLabel>Address :</ControlLabel>
					<FormControl name="address" className="ml-2" />
				</FormGroup>

				<FormGroup>
					<ControlLabel>Father :</ControlLabel>
					<FormControl
						name="father_name"
						className="ml-2 mt-1"
						placeholder="Name"
					/>
					<FormControl
						name="father_number"
						className="ml-2 mt-1"
						placeholder="Mobile Number"
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Mother :</ControlLabel>
					<FormControl
						name="mother_name"
						className="ml-2 mt-1"
						placeholder="Name"
					/>
					<FormControl
						name="mother_number"
						className="ml-2 mt-1"
						placeholder="Mobile Number"
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Semester :</ControlLabel>
					<FormControl
						name="semester"
						data={semesters}
						accepter={SelectPicker}
						className="ml-2"
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Year :</ControlLabel>
					<FormControl name="year" />
				</FormGroup>

				<FormGroup controlId="radioList">
					<ControlLabel>Odd/Even :</ControlLabel>
					<FormControl
						accepter={RadioGroup}
						name="semesterIs"
						inline
						appearance="picker"
						defaultValue="A"
					>
						<Radio value="Odd">Odd</Radio>
						<Radio value="Even">Even</Radio>
					</FormControl>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Branch :</ControlLabel>
					<FormControl
						name="branch"
						data={departments}
						accepter={SelectPicker}
						className="ml-2"
					/>
				</FormGroup>

				<FormGroup>
					<ControlLabel>Regestration No :</ControlLabel>
					<FormControl
						name="registration_number"
						placeholder={profile.registration_number}
						className="ml-2"
					/>
				</FormGroup>

				{profile.name && (
					<Container className="d-flex">
						<Content>
							<img
								src={profile.avatar || photoURL}
								style={{
									height: 100,
									width: 100,
									borderRadius: "50%",
									margin: 25,
									marginBottom: 0,
								}}
								alt={profile.name || displayName}
							/>
						</Content>

						<Footer>
							<Button
								className="justify-content-center"
								appearance="link"
								style={{ textDecoration: "none", margin: 0 }}
							>
								<AvatarUploadBtn />
							</Button>
						</Footer>
					</Container>
				)}
			</Form>
			<Divider />
			<Button
				className="justify-content-center"
				style={{ marginBottom: 20, marginLeft: 35 }}
				appearance="primary"
				onClick={onFormSubmit}
				disabled={isUploading}
			>
				Submit
			</Button>
		</>
	);
};

export default ProfileForm;
