import React from "react";
import { Avatar, Container, Content, Header, Sidebar } from "rsuite";

const Card = ({ profile }) => {
	return (
		<Container
			style={{
				maxWidth: 500,
				marginBottom: 10,
				backgroundColor: "#DDDDDD",
				borderRadius: 15,
			}}
		>
			<Sidebar width={50} style={{ paddingLeft: 5, alignSelf: "center" }}>
				<Avatar
					src={profile.avatar}
					style={{ borderRadius: 10, marginTop: 5, background: "#FFFFFF", color: "#000000" }}
					alt={profile.name}
				>
					{String(profile.name)
						.split(" ")
						.map((word, index) => {
							if (index < 2) {
								return word[0];
							}
							return "";
						})}
				</Avatar>
			</Sidebar>
			<Container>
				<Header style={{ alignSelf: "center", marginBottom: 10 }}>
					<h6>{profile.name}</h6>
				</Header>
				<Content>
					<span style={{ padding: 20 }}>
						Register No : {profile.registration_number}
					</span>
				</Content>
			</Container>
			<Sidebar
				width={50}
				style={{
					backgroundColor: profile.is_above_threshold ? "#C6ECAE" : "#D5573B",
					borderEndEndRadius: 15,
					borderTopRightRadius: 15,
				}}
			>
				<div style={{ textAlign: "center", marginTop: 15, borderRadius: 25 }}>
					{profile.is_above_threshold ? "yes" : "no"}
				</div>
			</Sidebar>
		</Container>
	);
};

export default Card;
