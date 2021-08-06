import React, { useState } from "react";
import { Avatar, Button, Col, Grid, Row } from "rsuite";
import { useProfile } from "../../context/profile.context";
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
	return (
		<Col {...props} xs={4}>
			{name} : <h6> {value} </h6>
		</Col>
	);
};

const Settings = () => {
	const { profile: { profile} } = useProfile();
	const [editInfo, setEditInfo] = useState(false);
	const onClickEdit = () => {
		setEditInfo(true);
	};

	return (
		<div>
			<Grid fluid>
				<Row>
					<InfoRow name="Name" value={profile.name} />
					<Col componentClass={Button}>
						<Row>
							<Avatar src={`${profile.avatar}`} size="lg" circle />
						</Row>
						<Row>Change Profile Picture</Row>
					</Col>
				</Row>
				<Row>
					<InfoRow name="Register number" value={profile.reg_no} />
					<InfoRow name="Roll number" value={profile.roll_no} />
				</Row>
				<Row>
					<InfoRow name="Branch" value={profile.branch} />
				</Row>
				<Row>
					<Col xs={4}>
						<Button block appearance="primary" onClick={onClickEdit}>
							Edit profile
						</Button>
					</Col>
				</Row>
			</Grid>
			{editInfo && <SettingsModal reset={setEditInfo} />}
		</div>
	);
};

export default Settings;
