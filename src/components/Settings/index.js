import React from "react";
import { useProfile } from "../../context/profile.context";
import ProfileForm from "../ProfileForm";

const Settings = () => {
	const { profile } = useProfile();

	return <ProfileForm profile={profile} />;
};

export default Settings;
