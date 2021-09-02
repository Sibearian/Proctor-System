import React from "react";
import { Avatar } from "rsuite";
import { useMessages } from "../../../context/message.context";

const MessageTop = () => {
	const { name, avatar } = useMessages();
	return (
		<div>
			<Avatar src={avatar} circle size="md" />
			<span>{name}</span>
		</div>
	);
};

export default MessageTop;
