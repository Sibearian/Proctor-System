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

	const [show, setShow] = useState(null);

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

			{/* <Button active={!isLoading} loading={isLoading} onClick={() => {}}>
				{show ? "Hide Students" : "Show Students"}
			</Button>
			<StudentListBtn />
			
			<div>
				<Button
					active={!isLoading}
					loading={isLoading}
					onClick={() => {}}
				>
					{show ? "Hide" : "Show"} Results
				</Button>
				{show && (
					<>
						<Divider style={{margin: 20}}>Results</Divider>
						<StudentResults />
					</>					
			)} 
		</div> */}
		</>
	);
};

export default ProctorView;
