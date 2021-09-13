import React, { useState } from "react";
import { Button } from "rsuite";

import AssignableStudentList from "./AssignableStudentList/index";
import StudentResults from "./StudentResult";
import StudentListBtn from "./StudentListBtn/index";
import { useStudentDocs } from "../../../context/student.context";

const ProctorView = () => {
	const [show, setShow] = useState(false);
	const {
		results: { isLoading },
	} = useStudentDocs();
	return (
		<>
			<StudentListBtn />
			<AssignableStudentList />
			<div>
				<Button
					active={!isLoading}
					loading={isLoading}
					onClick={() => setShow(!show)}
				>
					{show ? "Hide" : "Show"} Results
				</Button>
				{show && <StudentResults />}
			</div>
		</>
	);
};

export default ProctorView;
