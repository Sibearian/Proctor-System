import React, { useCallback, useState } from "react";
import firebase from "firebase/app";

import {
	Alert,
	Button,
	Col,
	Container,
	ControlLabel,
	Divider,
	Form,
	FormControl,
	FormGroup,
	Grid,
	Icon,
	Loader,
	Panel,
	Row,
} from "rsuite";

import { auth } from "../misc/firebase";
import CreateUserBtn from "../components/CreateUserBtn";

const SignIn = () => {
	const [formValue, setFormValue] = useState({});
	const [newUID, setNewUID] = useState(null);
	const [loading, setLoading] = useState(false);

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);

	const onGoogleSignIn = async () => {
		setLoading(true);

		try {
			const { additionalUserInfo, user } = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);

			if (additionalUserInfo.isNewUser) {
				setNewUID(user.uid);
			}

			setLoading(false);
			Alert.success("Account Created", 4000);
		} catch (error) {
			setLoading(false);
			Alert.error(error.message, 4000);
		}
	};

	const onSignInWithEmail = async () => {
		setLoading(false);

		try {
			const { additionalUserInfo, user } =
				await auth.createUserWithEmailAndPassword(
					formValue.email,
					formValue.password
				);

			if (additionalUserInfo.isNewUser) {
				setNewUID(user.uid);
			}

			setLoading(false);
			Alert.success("Account Created", 4000);
		} catch (error) {
			setLoading(false);
			Alert.error("Please enter valid details", 4000);
		}
	};

	if (loading) {
		return <Loader center />;
	}

	return (
		<div>
			<Container>
				<Grid>
					<Row>
						<Col xs={24} md={12}>
							<Panel bordered header="Welcome to Proctor System">
								<div>
									<p>Site to have interactions between proctor and students</p>
								</div>

								<Panel>
									<Row>
										<Col xs={8} md={4}>
											<Button
												block
												color="blue"
												onClick={() => onGoogleSignIn("google")}
											>
												<Icon icon="google" />
											</Button>
										</Col>
										<Col xs={2} md={2}>
											<Divider vertical>or</Divider>
										</Col>
										<Col xs={8} md={4}>
											<Form
												style={{ width: 40 }}
												layout="horizontal"
												onChange={onFormChange}
												formValue={formValue}
											>
												<FormGroup>
													<ControlLabel>Email</ControlLabel>
													<FormControl name="email" />
												</FormGroup>
												<FormGroup>
													<ControlLabel>Password</ControlLabel>
													<FormControl name="password" />
												</FormGroup>
												<Button
													appearance="ghost"
													active={loading}
													onClick={onSignInWithEmail}
												>
													Sign Up
												</Button>
											</Form>
										</Col>
									</Row>
								</Panel>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</Container>
			{newUID && <CreateUserBtn />}
		</div>
	);
};

export default SignIn;
