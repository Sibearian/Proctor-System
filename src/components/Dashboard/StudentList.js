/* eslint-disable camelcase */
import React from "react";
import { Avatar, Col, Container, Grid, Loader, Row } from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";
import { useProfile } from "../../context/profile.context";

/**
 * @name StudentList
 * TODO: This is for now only for a single user convert it to so it gives multiple users list
 * TODO: Make it so that the student's uid under a proctor is passed and it makes the list based on it
 *
 * @param UID
 * @returns A List of the student info
 */

const StudentList = () => {
	const {
		profile: { name, roll_no, reg_no, is_above_threshold },
	} = useProfile();

	if (!(name && roll_no && reg_no && is_above_threshold)) {
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
							<Avatar>GG</Avatar>
						</Col>
						<Row style={{ textAlign: "center", color: "black" }}>
							<Col xs={2}>{name}</Col>
							<Col xs={4}>{roll_no}</Col>
							<Col xs={4}>{reg_no}</Col>
							<Col xs={4}>{is_above_threshold ? "yes" : "no"}</Col>
						</Row>
					</Row>
				</Col>
			</Grid>
		</Container>
	);
};

export default StudentList;
