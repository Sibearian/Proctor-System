import React from "react";
import { Avatar, Col, Container, Grid, Row } from "rsuite";

const Card = ({ profile }) => {
	return (
		<Container>
			<Grid>
				<Col md={12}>
					<Row>
						<Col xs={2}>
							<Avatar src={profile.photoURL ? profile.photoURL : ""}>
								{String(profile.name)
									.split(" ")
									.map((word, index) => {
										if (index < 2) {
											return word[0];
										}
										return "";
									})}
							</Avatar>
						</Col>
						<Row style={{ textAlign: "center", color: "black" }}>
							<Col xs={2}>{profile.name}</Col>
							<Col xs={4}>{profile.roll_no}</Col>
							<Col xs={4}>{profile.reg_no}</Col>
							<Col xs={4}>{profile.is_above_threshold ? "yes" : "no"}</Col>
						</Row>
					</Row>
				</Col>
			</Grid>
		</Container>
	);
};

export default Card;
