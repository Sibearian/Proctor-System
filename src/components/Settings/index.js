import React from "react";
import { Avatar, Button, Col, Grid, Row } from "rsuite";
import { useProfile } from "../../context/profile.context";
import { useModalState } from "../../misc/custom-hooks";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) {
				resolve(blob);
			} else {
				reject(new Error("File process error"));
			}
		});
	});
};

const Settings = () => {
	const { profile } = useProfile();
	const { isOpen, open, close } = useModalState();

	const onClick = (value) => {
		console.log(value);
	};

	return (
		<div>
			<Grid>
				<Row>
					<Col
						xs={4}
						componentClass={Button}
						onClick={onClick}
						appearance="subtle"
						block
						ripple={false}
					>
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
						<Button block size="xs" color="cyan">
							Change Profile Picture
						</Button>
					</Col>
				</Row>
			</Grid>
		</div>
	);
};

export default Settings;
