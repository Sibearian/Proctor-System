import React from "react";
import { useProfile } from "../../context/profile.context";
import Bottom from "./bottom";

const Messages = () => {
	
	const { profile } = useProfile();
	return <div>
		{!profile.student_of && <Bottom />}</div>;
};

export default Messages;
