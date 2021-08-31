import React from "react";
import AssignableStudentList from "./AssignableStudentList";
import StudentListBtn from "./StudentListBtn";

const ProctorView = () => {
	return (
		<>
			<StudentListBtn />
			<AssignableStudentList />
		</>
	);
};

export default ProctorView;
