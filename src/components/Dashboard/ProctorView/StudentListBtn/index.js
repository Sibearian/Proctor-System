import React, { useCallback, useEffect, useState } from "react";
import { Button } from "rsuite";
import { useStudentDocs } from "../../../../context/student.context";
import Card from "../../Card";
import StudentModal from "../StudentModal";

const StudentListBtn = () => {
	const {
		studentDocs: { isLoading, data },
	} = useStudentDocs();

	const [isOpen, setIsOpen] = useState(null);
	const [visible, setVisible] = useState(false);
	const [list, setList] = useState(null);

	const onView = useCallback((student) => setIsOpen(student), []);

	// When data loads the component will reload
	useEffect(() => {
		setList(
			data.map((student, index) => {
				return (
					<Button
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

	const onClick = useCallback(() => {
		setVisible(!visible);
	}, [visible]);

	return (
		<div>
			<Button active={!isLoading} loading={isLoading} onClick={onClick}>
				{visible ? "Hide Students" : "Show Students"}
			</Button>
			{visible ? (
				<>
					<hr />
					{list}
				</>
			) : null}
			{isOpen && (
				<StudentModal close={() => setIsOpen(null)} student={isOpen} />
			)}
		</div>
	);
};

export default StudentListBtn;
