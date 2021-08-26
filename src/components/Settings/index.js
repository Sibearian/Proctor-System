import React, { useState } from "react";
import { Avatar, Button, Col, Grid, Row } from "rsuite";
import { useProfile } from "../../context/profile.context";
import ProfileEditor from "../../pages/profileEditor";
import SettingsModal from "./SettingsModal";

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

const InfoRow = ({ name, value, ...props }) => {
	if (!value) {
		return null;
	}
	return (
		<Col {...props} xs={4}>
			{name} : <h6> {value} </h6>
		</Col>
	);
};


// <Grid fluid>
// <Row>
// 	<Col>
// 		<Avatar src={`${profile.avatar}`} size="lg" circle />
// 	</Col>
// </Row>

// <Row>
// 	<InfoRow name="Name" value={profile.name} />
// </Row>

// {profile.student_of && (
// 	<Row>
// 		<InfoRow name="Register number" value={profile.reg_no} />
// 		<InfoRow name="Roll number" value={profile.roll_no} />
// 	</Row>
// )}

// <Row>
// 	<InfoRow name="Branch" value={profile.branch} />
// </Row>
// <Row>
// 	<Col xs={4}>
// 		<Button block appearance="primary" onClick={onClickEdit}>
// 			Edit profile
// 		</Button>
// 	</Col>
// </Row>
// </Grid>
// {editInfo && <SettingsModal reset={setEditInfo} />}

const Settings = () => {
	const {
		profile: { profile },
	} = useProfile();

	console.log(
		"keys => ",
		Object.keys(profile),
		"values => ",
		Object.values(profile)
	);

	const [editInfo, setEditInfo] = useState(false);
	const onClickEdit = () => {
		setEditInfo(true);
	};

	return (
		<div>
			<ProfileEditor profile={profile}/>
		</div>
	);
};

export default Settings;
