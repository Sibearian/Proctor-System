import React, { useState } from "react";
import firebase from "firebase/app";
import {
	Alert,
	Button,
	Col,
	Container,
	Grid,
	Icon,
	Loader,
	Panel,
	Row,
} from "rsuite";

import { auth } from "../misc/firebase";
import CreateUserBtn from "../components/CreateUserBtn";

const SignIn = () => {
	const [newUID, setNewUID] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSignIn = async () => {
		setLoading(true);

		try {
			const { additionalUserInfo, user } = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);

			if (additionalUserInfo.isNewUser) {
				setNewUID(user.uid);
			}

			setLoading(false);
			Alert.success("Signed in", 4000);
		} catch (error) {
			setLoading(false);
			Alert.error(error.message, 4000);
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
							<Panel>
								<div>
									<h2>Welcome to Proctor System</h2>
									<p>Site to have interactions between proctor and students</p>
								</div>

								<Button block color="blue" onClick={onSignIn}>
									<Icon icon="google" />
								</Button>
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
