import React from "react";
import { Container, Content, Footer, Header } from "rsuite";
import { MessageProvider } from "../../context/message.context";
import { useProfile } from "../../context/profile.context";
import Bottom from "./bottom";
import Messages from "./messages";
import MessageTop from "./top";

const Message = () => {
	const { profile } = useProfile();
	return (
		<MessageProvider>
			<Container>
				<Header>
					<MessageTop />
				</Header>
				<Content>
					<Messages />
				</Content>
				<Footer>{!profile.student_of && <Bottom />}</Footer>
			</Container>
		</MessageProvider>
	);
};

export default Message;
