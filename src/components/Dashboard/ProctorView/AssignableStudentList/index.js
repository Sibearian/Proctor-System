import React, { useCallback, useEffect, useState } from "react";
import { Button } from "rsuite";
import { useStudentDocs } from "../../../../context/student.context";
import { auth, firestore } from "../../../../misc/firebase";
import Card from "../../Card";

const AssignableStudentList = () => {
	const {
		assignableStudentDocs: { data, isLoading },
	} = useStudentDocs();

	const [visible, setVisible] = useState(false);
	const [list, setList] = useState(null);

	const onAdd = useCallback((student) => {
		firestore
			.collection("users")
			.doc(student.uid)
			.update({ student_of: auth.currentUser.uid });
	}, []);

	// When data loads the component will reload
	useEffect(() => {
		setList(
			data.map((student, index) => {
				return (
					<Card profile={student} key={index}>
						<Button onClick={() => onAdd(student)}>Add</Button>
					</Card>
				);
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.length]);

	const onClick = useCallback(() => {
		setVisible(!visible);
	}, [visible]);

	return (
		<>
			<Button active={!isLoading} loading={isLoading} onClick={onClick}>
				{visible ? "Hide Students" : "Show Students"}
			</Button>
			{visible ? (
				<>
					<hr />
					{list.length === 0 ? <p>All students are assigned</p> : list}
				</>
			) : null}
		</>
	);
};

export default AssignableStudentList;
