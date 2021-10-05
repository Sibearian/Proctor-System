import React, { useCallback, useState } from "react";
import { Button, ButtonGroup } from "rsuite";

import AssignableStudentList from "./AssignableStudentList/index";
import StudentResults from "./StudentResult";
import StudentListBtn from "./StudentListBtn/index";
import { useStudentDocs } from "../../../context/student.context";

const ProctorView = () => {
	const {
		assignableStudentDocs: { isLoading },
	} = useStudentDocs();

	const [show, setShow] = useState(<StudentListBtn />);

	const onClick = useCallback((value) => {
		setShow([value]);
	}, []);

	return (
		<>
			<ButtonGroup>
				<Button onClick={() => onClick(<StudentListBtn />)}>Students</Button>
				<Button onClick={() => onClick(<StudentResults />)}>Results</Button>
				<Button loading={isLoading} disabled={isLoading} onClick={() => onClick(<AssignableStudentList />)}>
					Non-assigned Students
				</Button>
			</ButtonGroup>
			{show}
		</>
	);
};

export default ProctorView;
