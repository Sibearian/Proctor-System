import React, { memo } from "react";
import { Icon } from "rsuite";
import TimeAgo from "timeago-react";
import { useHover } from "../../../misc/custom-hooks";
import ImgBtnModal from "./ImgBtnModal";

const renderFileMessage = (file) => {
	const name = file?.name?.split("__", 2)[1];
	if (file.contentType.includes("image")) {
		return (
			<div className="img-fullsize">
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
		<li
			ref={selfRef}
			className={`padded mb-1 cursor-pointer ${isHovered ? "bg-black-02" : ""}`}
		>
			<div className="font-bolder mb-1">
				<div>
					<TimeAgo datetime={time} className="font-normal text-black-45 " />
				</div>
				<div className="ml-2">
					{message?.text && (
						<span className="word-breal-all">{message.text}</span>
					)}
					{message?.file && renderFileMessage(message.file)}
				</div>
			</div>
		</li>
	);
};

export default memo(MessageItem);
