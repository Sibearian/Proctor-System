import React from "react";
import { useProfile } from "../../context/profile.context";
import ProctorView from "./ProctorView";
import StudentView from "./StudentView";

const Dashboard = () => {
	const { profile } = useProfile();
	return (
		<div>
			<h3>Dashboard</h3>
			{!profile.student_list ? (
				<StudentView profile={profile} />
			) : (
				<ProctorView profile={profile} />
			)}
		</div>
	);
};

export default Dashboard;
