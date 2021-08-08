import React from "react";
import { useProfile } from "../../context/profile.context";
import ProctorView from "./ProctorView";
import StudentView from "./StudentView";

const Dashboard = () => {
	const {
		profile: { profile },
	} = useProfile();
	return (
		<div>
			<h3>Dashboard</h3>
			{profile.student_of ? (
				<StudentView profile={profile} />
			) : (
				<ProctorView profile={profile} />
			)}
		</div>
	);
};

export default Dashboard;
