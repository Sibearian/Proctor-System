import React, { useCallback, useRef, useState } from "react";
import {
	Avatar,
	Col,
	Container,
	Content,
	ControlLabel,
	Form,
	FormControl,
	FormGroup,
	Grid,
	Row,
	Sidebar,
} from "rsuite";
import { INITIAL_VALUE, model } from "../misc/form.helper";

const ProfileEditor = ({profile}) => {


	const [formValue, setFormValue] = useState(INITIAL_VALUE);
	const [isLoading, setIsLoading] = useState(false);

	const formRef = useRef();

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);

	// OnSubmit Function

	return (
		<Grid>
			<Col>
				<Row>
					<Form
						ref={formRef}
						model={model}
						onChange={onFormChange}
						formValue={formValue}
					>
						<Container>
							<Content>
								<FormGroup>
									<ControlLabel>Name :</ControlLabel>
									<FormControl name="name" />
								</FormGroup>
								<FormGroup>
									<ControlLabel>Age :</ControlLabel>
									<FormControl name="age" />
								</FormGroup>
							</Content>
							<Sidebar>
								<Avatar src={profile.avatar} />
							</Sidebar>
						</Container>
					</Form>
				</Row>
			</Col>
		</Grid>
	);
};

export default ProfileEditor;
