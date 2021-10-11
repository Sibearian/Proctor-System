/* eslint-disable prefer-template */
import { mean } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
	Container,
	Panel,
	PanelGroup,
	Table,
	Divider,
	Button,
	FlexboxGrid,
	Modal,
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	Alert,
} from "rsuite";
import { saveAs } from "file-saver";

import { firestore, config } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import Chart from "./chart";

const { Cell, HeaderCell, Column } = Table;

const JSONtoCSV = (obj = [{}]) => {
	let csvStr = "Subject,Assignment,IA 1,IA 2,IA 3,Final Marks, Passed\n";
	const format = (element) =>
		element === undefined ? "Not Assigned" : String(element);
	obj.forEach((subject) => {
		csvStr +=
			format(subject.name) +
			"," +
			format(subject.assignmentScored) +
			"," +
			format(subject.internal1) +
			"," +
			format(subject.internal2) +
			"," +
			(subject.lab ? "" : format(subject.internal3)) +
			"," +
			format(subject.finalsScored) +
			"," +
			format(subject.hasPassed) +
			"\n";
	});

	const blob = new Blob([csvStr], { type: "text/plain;charset=utf-8" });

	return blob;
};

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
	const { profile } = useProfile();

	const [studentData, setStudentData] = useState(null);
	const [results, setResults] = useState(null);
	const [rowData, setRowData] = useState(null);
	const [formValue, setFormValue] = useState(null);

	const onSubmit = useCallback(() => {
		firestore.collection("results").doc(id).update(formValue);
		Alert.success("Result Edited", 4000);
		setRowData(null);
	}, [formValue, id]);

	const onFormChange = useCallback((value) => {
		setFormValue(value);
	}, []);
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

			{results && (
				<PanelGroup accordion bordered>
					{results &&
						Object.keys(results).map((yearName) =>
							Object.keys(results[yearName]).map((semester) => {
								const data = structureDataForTable(results[yearName][semester]);
								return (
									<Panel
										header={
											yearName +
											(semester === "1" ? " Odd Semester" : " Even Semester")
										}
									>
										<PanelGroup accordion>
											<Panel header="Table" defaultExpanded>
												<Table
													data={data}
													autoHeight
													onRowClick={(rData) => setRowData(rData)}
												>
													<Column>
														<HeaderCell>Subject Name</HeaderCell>
														<Cell dataKey="name" />
													</Column>
													<Column>
														<HeaderCell>Subject Is</HeaderCell>
														<Cell>
															{(row) => (row.lab ? "Practicals" : "Theory")}
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
												<FlexboxGrid justify="space-between" className="mt-2">
													<FlexboxGrid.Item>
														<Button
															onClick={() => {
																saveAs(
																	JSONtoCSV(data),
																	`${studentData.name} Year_${yearName} Semester_${semester}.csv`
																);
															}}
														>
															Download the result
														</Button>
													</FlexboxGrid.Item>
													{profile.student_of === false && (
														<FlexboxGrid.Item>
															<Button onClick={() => setRowData(true)}>
																Edit Results
															</Button>
														</FlexboxGrid.Item>
													)}
												</FlexboxGrid>
											</Panel>
											<Panel header="Chart">
												<Chart data={data} />
											</Panel>
											{rowData && (
												<Modal onHide={() => setRowData(null)} show={!!rowData}>
													<Modal.Header>
														<Modal.Title>
															Year {yearName}{" "}
															{semester === "1"
																? " Odd Semester"
																: " Even Semester"}
														</Modal.Title>
													</Modal.Header>

													<Modal.Body>
														<Form onChange={onFormChange} formValue={formValue}>
															{/* TODO */}
															<FormGroup>
																<ControlLabel>Assignment :</ControlLabel>
																<FormControl
																	name={`${yearName}.${semester}.${rowData.name}.assignment.scored`}
																	className="mt-1"
																/>
															</FormGroup>
															<FormGroup>
																<ControlLabel>Internals :</ControlLabel>

																<FormControl
																	name={`${yearName}.${semester}.${rowData.name}.internals.internals1`}
																	className="mt-1"
																/>
																<FormControl
																	name={`${yearName}.${semester}.${rowData.name}.internals.internals2`}
																	className="mt-1"
																/>
																{!rowData.lab && (
																	<FormControl
																		name={`${yearName}.${semester}.${rowData.name}.internals.internals3`}
																		className="mt-1"
																	/>
																)}
															</FormGroup>
															<FormGroup>
																<ControlLabel>Final Exam :</ControlLabel>
																<FormControl
																	name={`${yearName}.${semester}.${rowData.name}.finals.scored`}
																/>
															</FormGroup>
														</Form>
													</Modal.Body>
													<Modal.Footer>
														<Button onClick={onSubmit}>Submit Edit</Button>
													</Modal.Footer>
												</Modal>
											)}
										</PanelGroup>
									</Panel>
								);
							})
						)}
				</PanelGroup>
			)}
		</Container>
	);
};

export default StudentPage;
