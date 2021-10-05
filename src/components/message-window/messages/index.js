import React, { useEffect, useRef } from "react";
import { useMessages } from "../../../context/message.context";
import MessageItem from "./MessageItem";

const Messages = () => {
	const selfRef = useRef()
	const { isLoading, messages } = useMessages();

	useEffect(() => {
		const node = selfRef.current;
		
		if(!isLoading){
      node.scrollTop = node.scrollHeight;
		}
		

  }, [isLoading]);

	return (
			<ul ref={selfRef} className="msg-list custom-scroll">
				{!isLoading &&
					messages?.map((message, index) => (
						<MessageItem
							message={message.content}
							time={message.time}
							key={index}
						/>
					))}
			</ul>
	);
};

export default Messages;
