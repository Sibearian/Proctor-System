import React from "react";
import { MessageProvider } from "../../context/message.context";
import { useProfile } from "../../context/profile.context";
import Bottom from "./bottom";
import Messages from "./messages";
import MessageTop from "./top";

const Message = () => {
	const { profile } = useProfile();
	return (
		<MessageProvider>
			<div
				className="chat-top"
			>
				<MessageTop />
			</div>
			<div className="chat-middle">
				<Messages />
			</div>
			<div
				className="chat-bottom"
			>
				{!profile.student_of && <Bottom />}
			</div>
		</MessageProvider>
	);
};

export default Message;
