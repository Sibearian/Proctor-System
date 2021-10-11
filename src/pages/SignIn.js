import React, { useCallback, useState } from "react";
import firebase from "firebase/app";

import {
	Alert,
	Button,
	Container,
	ControlLabel,
	Divider,
	FlexboxGrid,
	Form,
	FormControl,
	FormGroup,
	Icon,
	Loader,
	Panel,
} from "rsuite";

import { auth } from "../misc/firebase";
import CreateUserBtn from "../components/CreateUserBtn";
import { useModalState } from "../misc/custom-hooks";

const SignIn = () => {
	const [formValue, setFormValue] = useState({});
	const [newUID, setNewUID] = useState(null);
	const [loading, setLoading] = useState(false);

	const { isOpen, open, close } = useModalState();

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
			else {
				setLoading(false)
				Alert.success("Sign In", 4000)
				return
			}

			setLoading(false);
			Alert.success("Account Created", 4000);
		} catch (error) {
			setLoading(false);
			Alert.error(error.message, 4000);
		}

		open();
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
			if (error.code === "auth/email-already-in-use") {
				auth
					.signInWithEmailAndPassword(formValue.email, formValue.password)
					.then(() => {
						Alert.success("Signed in", 4000);
					})
					.catch(() => {});					
			} else {
				Alert.error(error.message, 4000);
			}
			setLoading(false);
		}

		open();
	};

	const onClickForgotPassword = useCallback(() => {
		auth.sendPasswordResetEmail(formValue.email).catch(() => {});
		Alert.success("A password reset link is sent to your email");
	}, [formValue.email]);

	if (loading) {
		return <Loader center />;
	}

	return (
		<div>
			<Container className="d-flex mt-3 justify-content-center align-items-center">
				<h1>Welcome to Proctor System</h1>
				<Panel bordered className="mt-5 h-auto" style={{ minWidth: 500 }}>
					<FlexboxGrid justify="space-between">
						<FlexboxGrid.Item>
							<Button onClick={() => onGoogleSignIn("google")}>
								<Icon icon="google" /> Google
							</Button>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item>
							<Divider vertical style={{ minHeight: 205 }} />
						</FlexboxGrid.Item>
						<FlexboxGrid.Item>
							<Form onChange={onFormChange} formValue={formValue}>
								<FormGroup>
									<ControlLabel>Email</ControlLabel>
									<FormControl name="email" />
								</FormGroup>
								<FormGroup>
									<ControlLabel>Password</ControlLabel>
									<FormControl name="password" />
								</FormGroup>
								<FlexboxGrid justify="space-between">
									<FlexboxGrid.Item>
										<Button
											appearance="primary"
											active={loading}
											onClick={onSignInWithEmail}
										>
											Sign Up
										</Button>
									</FlexboxGrid.Item>
									<FlexboxGrid.Item>
										<Button
											appearance="subtle"
											active={loading}
											onClick={onClickForgotPassword}
										>
											Forgot Password
										</Button>
									</FlexboxGrid.Item>
								</FlexboxGrid>
							</Form>
						</FlexboxGrid.Item>
					</FlexboxGrid>
				</Panel>
			</Container>
			{newUID && <CreateUserBtn show={isOpen} close={close} />}
		</div>
	);
};

export default SignIn;
