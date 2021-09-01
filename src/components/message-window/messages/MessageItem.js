import React from "react";
import { Avatar } from "rsuite";
import { useHover } from "../../../misc/custom-hooks";
import ImgBtnModal from "./ImgBtnModal";

// {isAuthor && (
// 	<IconBtnControl
// 		isVisible={canShowIcons}
// 		iconName="close"
// 		tooltip="Delete this message"
// 		onClick={() => handleDelete(message.id, file)}
// 	/>
// )}

const renderFileMessage = (file) => {
	if (file.contentType.includes("image")) {
		return (
			<div className="height-220">
				<ImgBtnModal src={file.url} fileName={file.name} />
			</div>
		);
	}

	return (
		<a href={file.url}>
			Download {"=>"} {file.name}
		</a>
	);
};

const MessageItem = ({ message }) => {
	const [selfRef, isHovered] = useHover();
	return (
		<li
			className={`padded mb-1 cursor-pointer ${isHovered ? "bg-black-02" : ""}`}
			ref={selfRef}
		>
			<div className="d-flex align-items-center font-bolder mb-1">
				<Avatar
					src={message.avatar}
					name={message.name}
					className="ml-1"
					size="xs"
				/>

				{/* <TimeAgo /> */}
			</div>
		</li>
	);
};

export default MessageItem;
