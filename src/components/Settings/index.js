import React from "react";
import { Avatar, Button, Col, Grid, Row } from "rsuite";
import { useProfile } from "../../context/profile.context";

// const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
// const isValidFile = (file) => acceptedFileTypes.includes(file.type);

// const getBlob = (canvas) => {
// 	return new Promise((resolve, reject) => {
// 		canvas.toBlob((blob) => {
// 			if (blob) {
// 				resolve(blob);
// 			} else {
// 				reject(new Error("File process error"));
// 			}
// 		});
// 	});
// };

const Settings = () => {
	const { profile } = useProfile();

	const onClick = () => {};

	return (
		<div>
			<Grid fluid>
				<Row>
					<Col
						xs={4}
						componentClass={Button}
						onClick={onClick}
						appearance="subtle"
						block
						ripple={false}
					>
						<Row>
							<Avatar src={`${profile.avatar}`} size="lg" circle>
								{String(profile.name)
									.split(" ")
									.map((word, index) => {
										if (index < 2) {
											return word[0];
										}
										return "";
									})}
							</Avatar>
						</Row>
						<Row>Change Profile Picture</Row>
					</Col>
					<Col>
						<Row>
							<Col xs={8}>
								Name : <h6> {profile.name} </h6>
							</Col>
						</Row>
					</Col>
					<Col>
						<Row>
							<Col xs={8}>
								Register number : <h6> {profile.reg_no} </h6>
							</Col>
						</Row>
					</Col>
					<Col>
						<Row>
							<Col xs={8}>
								Roll number : <h6> {profile.roll_no} </h6>
							</Col>
						</Row>
					</Col>
					<Col>
						<Row>
							<Col xs={8}>
								Branch : <h6> {profile.branch} </h6>
							</Col>
						</Row>
					</Col>
				</Row>
			</Grid>
		</div>
	);
};

export default Settings;
