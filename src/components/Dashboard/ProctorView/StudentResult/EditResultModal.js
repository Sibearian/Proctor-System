import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
	Alert,
	Button,
	ControlLabel,
	FlexboxGrid,
	Form,
	FormControl,
	FormGroup,
	Modal,
	Panel,
	PanelGroup,
} from "rsuite";
import { merge } from "lodash";
import { firestore } from "../../../../misc/firebase";

const { Body, Footer, Header, Title } = Modal;

const date = new Date();
const [year, month] = [
	date.getFullYear(),
	date.getMonth() > 5 && date.getMonth() < 10 ? 1 : 2,
];

const getSubjectNames = (data = {}) => {
	const { name: __, student: _, ...subjects } = data;
	const names = [];

	Object.keys(subjects).forEach((subjectName) => {
		const name = subjectName.split("__")[0].split("_").join(" ");
		if (!names.includes(name)) {
			names.push(name);
		}
	});

	return names;
};

const getFieldName = (name = "") => name.split("__")[1].trimEnd();

// stitches the data from a table orianted format to typical structure
const stitchDataForForm = (data = {}, subjectNames = []) => {
	return subjectNames.map((name) => {
		if (data[`${name}__isLab`]) {
			return {
				subjectName: name,
				internals: {
					max: data[`${name}__InternalsMax`],
					internals1: data[`${name}__Internals1`],
					internals2: data[`${name}__Internals2`],
				},
				assignment: {
					max: data[`${name}__AssignmentMax`],
					scored: data[`${name}__AssignmentScored`],
				},
				finals: {
					max: data[`${name}__FinalsMax`],
					scored: data[`${name}__FinalsScored`],
				},
				isLab: true,
			};
		}
		return {
			subjectName: name,
			internals: {
				max: data[`${name}__InternalsMax`],
				internals1: data[`${name}__Internals1`],
				internals2: data[`${name}__Internals2`],
				internals3: data[`${name}__Internals3`],
			},
			assignment: {
				max: data[`${name}__AssignmentMax`],
				scored: data[`${name}__AssignmentScored`],
			},
			finals: {
				max: data[`${name}__FinalsMax`],
				scored: data[`${name}__FinalsScored`],
			},
			isLab: false,
		};
	});
};

const structureData = (data = {}, subjectName = []) => {
	const val = {};
	let formatErrorOccured = true;
	const time = `${year}.${month}`;
	subjectName
		.map((name) => {
			const pathName = `${time}.${name}`;
			const temp = Object.keys(data).filter((sName) => sName.includes(name));
			const returnObj = {};
			temp.forEach((fieldName) => {
				const dataValue = parseFloat(
					data[`${name}__${getFieldName(fieldName)}`]
				);
				if (!dataValue && dataValue !== 0) {
					formatErrorOccured = false;
				}

				switch (getFieldName(fieldName)) {
					case "assignment":
						merge(returnObj, {
							[`${pathName}.assignment.scored`]: dataValue,
						});
						break;
					case "finals":
						merge(returnObj, {
							[`${pathName}.finals.scored`]: dataValue,
						});
						break;
					case "internals1":
						merge(returnObj, {
							[`${pathName}.internals.internals1`]: dataValue,
						});
						break;
					case "internals2":
						merge(returnObj, {
							[`${pathName}.internals.internals2`]: dataValue,
						});
						break;
					case "internals3":
						merge(returnObj, {
							[`${pathName}.internals.internals3`]: dataValue,
						});
						break;
					default:
						break;
				}
			});

			return returnObj;
		})
		.map((subject) => merge(val, subject));

	return formatErrorOccured ? val : false;
};

const EditResultModal = ({ rowData, close }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { student, name: _, ...subjects } = rowData;
	const subjectNames = getSubjectNames(subjects);
	const [formValue, setFormValue] = useState(null);
	const data = stitchDataForForm(subjects, subjectNames);

	const onFormChange = useCallback((value) => {
		setFormValue(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = () => {
		setIsLoading(true);
		Alert.info("Result are being updated");
		const uploadData = structureData(formValue, subjectNames);
		if (!uploadData) {
			Alert.warning(
				"Some of the fields does not contain numbers rather strings"
			);
			setIsLoading(false);
			return;
		}
		firestore.collection("results").doc(student.uid).update(uploadData);
		Alert.info("Result is updated");
		close();
		setIsLoading(false);
	};

	return (
		<Modal show={!!rowData} onHide={close}>
			<Header>
				<Title>
					<Button
						appearance="link"
						componentClass={Link}
						to={`/student/${student.uid}`}
					>
						<h4>{rowData.name}</h4>
					</Button>
				</Title>
			</Header>
			<Body>
				<FlexboxGrid justify="space-around">
					<FlexboxGrid.Item>
						<img
							alt={student.name}
							src={student.avatar}
							style={{ width: 100, height: 100 }}
						/>
					</FlexboxGrid.Item>
					<FlexboxGrid.Item>
						<p>
							<small>Registration Number : </small>{" "}
							{student.registration_number}
						</p>
						<p>
							<small>Semester : </small> {student.semester}
						</p>
					</FlexboxGrid.Item>
				</FlexboxGrid>

				<Form onChange={onFormChange} formValue={formValue} className="mt-3">
					<PanelGroup accordion bordered>
						{data.map((subject, subKey) => {
							const name = subject.subjectName;
							return (
								<Panel header={name}>
									<FormGroup key={subKey}>
										<ControlLabel>
											Final marks <small>(max {subject.finals.max})</small> :
										</ControlLabel>
										<FormControl
											name={`${name}__finals`}
											placeholder={subject.finals.scored || "Final marks"}
										/>
										<ControlLabel  className="mt-2">
											Assignment <small>(max {subject.assignment.max})</small>:
										</ControlLabel>
										<FormControl
											name={`${name}__assignment`}
											placeholder={
												subject.assignment.scored || "Assignment marks"
											}
										/>
										<ControlLabel className="mt-2">
											Internals <small>(max {subject.internals.max})</small>:
										</ControlLabel>
										{Object.keys(subject.internals).map(
											(internal, internalsKey) => {
												if (internal === "max") {
													return null;
												}
												return (
													<FormControl
													className="mt-1"
														key={internalsKey}
														name={`${name}__${internal}`}
														placeholder={
															subject.internals[`${internal}`] || internal
														}
													/>
												);
											}
										)}
									</FormGroup>
								</Panel>
							);
						})}
					</PanelGroup>
				</Form>
			</Body>
			<Footer>
				<Button onClick={onSubmit} loading={isLoading} disabled={isLoading}>
					Submit
				</Button>
			</Footer>
		</Modal>
	);
};

export default EditResultModal;
