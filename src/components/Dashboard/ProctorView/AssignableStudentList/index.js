import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, FlexboxGrid, Loader } from "rsuite";
import FlexboxGridItem from "rsuite/lib/FlexboxGrid/FlexboxGridItem";
import PlaceholderParagraphProps from "rsuite/lib/Placeholder/PlaceholderParagraph";
import { useStudentDocs } from "../../../../context/student.context";
import { auth, firestore } from "../../../../misc/firebase";
import Card from "../../Card";

const AssignableStudentList = () => {
	const {
		assignableStudentDocs: { data, isLoading },
	} = useStudentDocs();

	const [list, setList] = useState([]);

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
					<FlexboxGridItem order={index}>
						<Button
							style={{ textDecoration: "none", color: "black" }}
							key={index}
							appearance="link"
							componentClass={Link}
							size="sm"
							to={`/student/${student.uid}`}
						>
							<Card profile={student} key={index}>
								<Button appearance="subtle" onClick={() => onAdd(student)}>
									Add
								</Button>
							</Card>
						</Button>
					</FlexboxGridItem>
				);
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.length]);

	if (isLoading) {
		return (
			<PlaceholderParagraphProps rows={2}>
				<Loader center content="loading" />
			</PlaceholderParagraphProps>
		);
	}

	return (
		<>
			<Divider style={{ margin: 20 }}>Assignable Students</Divider>
			<FlexboxGrid justify="start">
				{list.length === 0 ? <p>All students are assigned</p> : list}
			</FlexboxGrid>
		</>
	);
};

export default AssignableStudentList;
