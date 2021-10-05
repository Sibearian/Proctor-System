import { mean } from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Panel, PanelGroup, Table, Divider } from "rsuite";

import { firestore, config } from "../../misc/firebase";
import Chart from "./chart";

const { Cell, HeaderCell, Column } = Table;

const structureDataForTable = (semesterResults = {}) => {
	const { semester, ...subjects } = semesterResults;

	return Object.keys(subjects).map((subject) => {
		const data = subjects[subject];
		return subjects[subject]?.isLab === true
			? {
					name: subject,
					internal1: data.internals.internals1,
					internal2: data.internals.internals2,
					assignmentScored: data.assignment?.scored,
					finalsScored: data.finals?.scored,
					lab: true,
					hasPassed:
						mean([data.internals.internals1, data.internals.internals2]) +
							data.finals?.scored +
							data.assignment?.scored >
						(data.internals.max + data.assignment.max + data.finals.max) * 0.36
							? "Passed"
							: "NotPassed",
			  }
			: {
					name: subject,
					internal1: data.internals.internals1,
					internal2: data.internals.internals2,
					internal3: data.internals.internals3,
					assignmentScored: data.assignment?.scored,
					finalsScored: data.finals?.scored,
					lab: false,
					hasPassed:
						mean([
							data.internals.internals1,
							data.internals.internals2,
							data.internals.internals3,
						]) +
							data.finals?.scored +
							data.assignment?.scored >
						(data.internals.max + data.assignment.max + data.finals.max) * 0.36
							? "Passed"
							: "Failed",
			  };
	});
};

const StudentPage = () => {
	const { id } = useParams();
	const [studentData, setStudentData] = useState(null);
	const [results, setResults] = useState(null);

	useEffect(() => {
		// get student data
		const unSubStudent = firestore
			.collection("users")
			.doc(id)
			.onSnapshot((student) => setStudentData(student.data()));

		// get student results
		const unSubResults = firestore
			.collection("results")
			.doc(id)
			.onSnapshot((result) => {
				// eslint-disable-next-line prefer-const
				let { uid, ...data } = result.data();
				setResults(data);
			});

		/* eslint-disable no-console */
		console.log(config);
		/* eslint-enable no-console */

		return () => {
			unSubResults();
			unSubStudent();
		};
	}, [id]);

	return (
		<Container>
			{!(studentData && results) && <h1>Loading Please Wait</h1>}
			{studentData && (
				<div>
					<Panel shaded bordered bodyFill style={{ display: "inline-block" }}>
						<img
							src={studentData.avatar}
							alt={studentData.name}
							height={260}
							width={260}
						/>
						<p>
							<small>Name : </small> {studentData.name}
						</p>
						<Panel>
							<p>
								<small>Age : </small> {studentData.age}
							</p>
							<p>
								<small>Blood Group : </small> {studentData.blood_group}
							</p>
							<p>
								<small>E-mail : </small> {studentData.email}
							</p>
							<p>
								<small>Registration Number : </small>{" "}
								{studentData.registration_number}
							</p>
							<p>
								<small>Semester : </small> {studentData.semester}
							</p>
						</Panel>
					</Panel>
				</div>
			)}
			<Divider>Results</Divider>
			{/* Result Panel Group Component */}

			{results && (
				<div>
					<PanelGroup accordion bordered>
						{results &&
							Object.keys(results).map((yearName) =>
								Object.keys(results[yearName]).map((semester) => {
									const data = structureDataForTable(
										results[yearName][semester]
									);
									return (
										<Panel
											header={
												yearName +
												(semester === "1" ? " Odd Semester" : " Even Semester")
											}
										>
											<PanelGroup accordion>
												<Panel header="Table" defaultExpanded>
													<Table data={data} autoHeight>
														<Column>
															<HeaderCell>Subject Name</HeaderCell>
															<Cell dataKey="name" />
														</Column>
														<Column>
															<HeaderCell>Subject Is</HeaderCell>
															<Cell>
																{(rowData) =>
																	rowData.lab ? "Practicals" : "Theory"
																}
															</Cell>
														</Column>
														<Column>
															<HeaderCell>Assignment</HeaderCell>
															<Cell dataKey="assignmentScored" />
														</Column>
														<Column>
															<HeaderCell>IA 1</HeaderCell>
															<Cell dataKey="internal1" />
														</Column>
														<Column>
															<HeaderCell>IA 2</HeaderCell>
															<Cell dataKey="internal2" />
														</Column>
														<Column>
															<HeaderCell>IA 3</HeaderCell>
															<Cell dataKey="internal3" />
														</Column>
														<Column>
															<HeaderCell>Final Marks</HeaderCell>
															<Cell dataKey="finalsScored" />
														</Column>
														<Column>
															<HeaderCell>Passed</HeaderCell>
															<Cell dataKey="hasPassed" />
														</Column>
													</Table>
												</Panel>
												<Panel header="Chart">
													<Chart data={data} />
												</Panel>
											</PanelGroup>
										</Panel>
									);
								})
							)}
					</PanelGroup>
				</div>
			)}
		</Container>
	);
};

export default StudentPage;
