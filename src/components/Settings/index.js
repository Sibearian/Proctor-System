import React from "react";
import { useProfile } from "../../context/profile.context";
import ProfileForm from "../ProfileForm";

const Settings = () => {
	const {
		profile: { profile },
	} = useProfile();

	return (
		<div>
			<ProfileForm profile={profile} />
		</div>
	);
};

export default Settings;
