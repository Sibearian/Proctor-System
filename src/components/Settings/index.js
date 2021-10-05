import React from "react";
import { useProfile } from "../../context/profile.context";
import ProfileForm from "../ProfileForm";

const Settings = () => {
	const { profile } = useProfile();

	return (
		<div className="msg-list custom-scroll">
			<ProfileForm profile={profile} />
		</div>
	);
};

export default Settings;
