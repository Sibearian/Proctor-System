import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, FlexboxGrid } from "rsuite";
import { useStudentDocs } from "../../../../context/student.context";
import Card from "../../Card";
import StudentModal from "../StudentModal";

const StudentListBtn = () => {
	const {
		studentDocs: { data },
	} = useStudentDocs();

	const [isOpen, setIsOpen] = useState(null);
	const [list, setList] = useState(null);

	const onView = useCallback((student) => setIsOpen(student), []);

	// When data loads the component will reload
	useEffect(() => {
		setList(
			data.map((student, index) => {
				return (
					<Button
						style={{ textDecoration: "none", color: "black" }}
						key={index}
						appearance="link"
						onClick={() => {
							onView(student);
						}}
					>
						<Card profile={student} />
					</Button>
				);
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.length]);

	return (
		<>
			<Divider style={{ margin: 20 }}>Students</Divider>
			<FlexboxGrid justify="start">{list}</FlexboxGrid>
			{isOpen && (
				<StudentModal close={() => setIsOpen(null)} student={isOpen} />
			)}
		</>
	);
};

export default StudentListBtn;
