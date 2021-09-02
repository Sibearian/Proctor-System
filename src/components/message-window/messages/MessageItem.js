import React from "react";
import { Icon } from "rsuite";
import TimeAgo from "timeago-react";
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
	const name = file?.name?.split("__", 2)[1];
	if (file.contentType.includes("image")) {
		return (
			<div>
				<ImgBtnModal src={file.url} fileName={name} />
			</div>
		);
	}

	return (
		<span>
			Download <Icon icon="long-arrow-right" /> <a href={file.url}>{name}</a>
		</span>
	);
};

const MessageItem = ({ time, message }) => {
	const [selfRef, isHovered] = useHover();
	return (
		<li style={{ background: isHovered ? "rgba(0, 0, 0, 0.2)" : "" }} ref={selfRef}>
			<div>
				<TimeAgo datetime={time} />
				<div>
					{message?.text && <p>{message.text}</p>}
					{message?.file && renderFileMessage(message.file)}
				</div>
			</div>
		</li>
	);
};

export default MessageItem;
