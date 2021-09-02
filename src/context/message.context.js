import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../misc/firebase";
import { useProfile } from "./profile.context";

const MessageContext = createContext();
const messageRef = firestore.collection("messages");

export const MessageProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [messages, setMessages] = useState([]);
	const [avatar, setAvatar] = useState("");
	const [name, setName] = useState("");
	const { profile } = useProfile();

	useEffect(() => {
		const unSubMessage = messageRef
			.doc(profile.student_of ? profile.student_of : profile.uid)
			.onSnapshot((messageDocs) => {
				if (!messageDocs.exists || !messageDocs.data()) {
					setMessages(null);
				} else {
					const {
						name: _name,
						avatar: _avatar,
						..._messages
					} = messageDocs.data();
					setMessages(
						Object.keys(_messages)
							.sort()
							.map((time) => {
								return {
									time,
									content: _messages[time],
								};
							})
					);
					setName(_name);
					setAvatar(_avatar);
				}
			});
		setIsLoading(false);
		return () => unSubMessage();
	}, [profile.student_of, profile.uid]);

	return (
		<MessageContext.Provider value={{ isLoading, messages, name, avatar }}>
			{children}
		</MessageContext.Provider>
	);
};

export const useMessages = () => useContext(MessageContext);
