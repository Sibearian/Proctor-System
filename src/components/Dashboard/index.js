import React from "react";
import { useProfile } from "../../context/profile.context";
import { StudentProvider } from "../../context/student.context";
import ProctorView from "./ProctorView";
import StudentView from "./StudentView";

const Dashboard = () => {
	const { profile } = useProfile();
	return (
		<div>
			<h3>Dashboard</h3>
			{profile.student_of !== false ? (
				<StudentView profile={profile} />
			) : (
				<StudentProvider>
					<ProctorView />
				</StudentProvider>
			)}
		</div>
	);
};

export default Dashboard;
