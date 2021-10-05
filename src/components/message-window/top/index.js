import React from "react";
import { Avatar } from "rsuite";
import { useMessages } from "../../../context/message.context";

const MessageTop = () => {
	const { name, avatar } = useMessages();
	return (
		<div className="d-flex align-items-center">
			<Avatar src={avatar} circle size="md" className="mr-3" />
			<h6 className="ml-3 text-disappear d-flex align-items-center">{name}</h6>
		</div>
	);
};

export default MessageTop;
