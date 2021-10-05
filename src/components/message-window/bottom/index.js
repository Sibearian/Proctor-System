import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";
import { useProfile } from "../../../context/profile.context";
import { firestore } from "../../../misc/firebase";
import AttachmentBtnModal from "./AttachmentBtnModal";

const Bottom = () => {
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { profile } = useProfile();

	const onType = useCallback((value) => {
		setInput(value);
	}, []);

	const onSendClick = async () => {
		if (input.trim() === "") {
			return;
		}

		setIsLoading(true);

		firestore
			.collection("messages")
			.doc(profile.uid)
			.update({
				name: profile.name,
				avatar: profile.avatar,
				[Date.now()]: { text: input },
			})

			.then(() => {
				Alert.success("Message Sent", 4000);
				setIsLoading(false);
			})

			.catch((err) => {
				Alert.error(err.message, 4000);
				setIsLoading(false);
			})

			.finally(() => setInput(""));
	};

	const onKeyDown = (ev) => {
		if (ev.keyCode === 13) {
			ev.preventDefault();
			onSendClick();
		}
	};

	const afterUpload = useCallback(
		async (files) => {
			setIsLoading(true);

			files.forEach((file) => {
				firestore
					.collection("messages")
					.doc(profile.uid)
					.update({ [Date.now()]: { file } });
			});

			setIsLoading(false);
		},
		[profile.uid]
	);

	return (
		<div>
			<InputGroup style={{ width: "99%" }}>
				<Input
					placeholder="Write a new message here..."
					value={input}
					onChange={onType}
					onKeyDown={onKeyDown}
				/>

				<AttachmentBtnModal afterUpload={afterUpload} UID={profile.uid} />
				<InputGroup.Button
					color="blue"
					appearance="primary"
					onClick={onSendClick}
					disabled={isLoading}
					loading={isLoading}
				>
					<Icon icon="send" />
				</InputGroup.Button>
			</InputGroup>
		</div>
	);
};

export default Bottom;
