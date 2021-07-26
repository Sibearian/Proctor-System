/* eslint-disable camelcase */
import React from "react";
import { Avatar, Col, Container, Grid, Loader, Row } from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";

const StudentView = ({ profile }) => {
	if (!profile.name) {
		return (
			<PlaceholderParagraph rows={2}>
				<Loader center content="loading" />
			</PlaceholderParagraph>
		);
	}

	return (
		<Container>
			<Grid>
				<Col md={12}>
					<Row style={{ backgroundColor: "#eaefbd" }}>
						<Col xs={2}>
							<Avatar>
								{String(profile.name)
									.split(" ")
									.map((word) => word[0])}
							</Avatar>
						</Col>
						<Row style={{ textAlign: "center", color: "black" }}>
							<Col xs={2}>{profile.name}</Col>
							<Col xs={4}>{profile.rollNo}</Col>
							<Col xs={4}>{profile.regNo}</Col>
							<Col xs={4}>{profile.isAboveThreshold ? "yes" : "no"}</Col>
						</Row>
					</Row>
				</Col>
			</Grid>
		</Container>
	);
};

export default StudentView;
