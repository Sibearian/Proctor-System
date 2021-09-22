import React from "react";
import { Avatar, Container, Content, Header, Sidebar } from "rsuite";

const Card = ({ profile, children }) => {
	return (
		<Container
			style={{
				marginBottom: 10,
				backgroundColor: "#DDDDDD",
				borderRadius: 15,
				width: 400
			}}
		>
			<Sidebar width={50} style={{ paddingLeft: 5, alignSelf: "center" }}>
				<Avatar
					src={profile.avatar}
					style={{
						borderRadius: 10,
						marginTop: 5,
						background: "#FFFFFF",
						color: "#000000",
					}}
					alt={profile.name}
				/>
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
					borderEndEndRadius: 15,
					borderTopRightRadius: 15,
					display: "grid",
				}}
			>
				{children}
			</Sidebar>
		</Container>
	);
};

export default Card;
