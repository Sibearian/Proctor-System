import React from "react";
import AssignableStudentList from "./AssignableStudentList/index";
import StudentResults from "./StudentResult";
import StudentListBtn from "./StudentListBtn/index";

const ProctorView = () => {
	return (
		<>
			<StudentListBtn />
			<AssignableStudentList />
			<StudentResults />
		</>
	);
};

export default ProctorView;
