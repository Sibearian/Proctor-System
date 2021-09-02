import React from "react";
import { useMessages } from "../../../context/message.context";
import MessageItem from "./MessageItem";

const Messages = () => {
	const { isLoading, messages } = useMessages();

	return (
		<div>
			<ul>
				{!isLoading &&
					messages?.map((message, index) => (
						<MessageItem
							message={message.content}
							time={message.time}
							key={index}
						/>
					))}
			</ul>
		</div>
	);
};

export default Messages;
