import { floor, mean } from "lodash";
import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Divider, Panel } from "rsuite";
import { useStudentDocs } from "../../../../context/student.context";
import Chart from "./Chart";
import ResultTable from "./ResultTable";

// sturcture the data in a way that tables can be read
const restructureObject = (object) => {
	const { student, ...subjects } = object;
	const { name } = student;
	// eslint-disable-next-line dot-notation

	let merge = {};

	Object.keys(subjects)
		// Maps Ecah Subject to its table usable form
		.map((subjectName) => {
			// Labs
			if (subjects[subjectName].isLab) {
				return {
					[`${subjectName}__isLab`]: true,
					[`${subjectName}__FinalsMax`]: subjects[subjectName].finals.max,
					[`${subjectName}__FinalsScored`]:
						subjects[subjectName].finals?.scored,
					[`${subjectName}__AssignmentMax`]:
						subjects[subjectName].assignment.max,
					[`${subjectName}__AssignmentScored`]:
						subjects[subjectName].assignment?.scored,
					[`${subjectName}__InternalsMax`]: subjects[subjectName].internals.max,
					[`${subjectName}__InternalsAvg`]:
						subjects[subjectName].internals.internals1 +
							subjects[subjectName].internals.internals2 / 2 ===
						0
							? "Not available"
							: floor(
									mean([
										subjects[subjectName].internals.internals1,
										subjects[subjectName].internals.internals2,
									]),
									2
							  ),

					[`${subjectName}__Internals1`]:
						subjects[subjectName].internals.internals1,
					[`${subjectName}__Internals2`]:
						subjects[subjectName].internals.internals2,
				};
			}

			// Theory
			return {
				[`${subjectName}__isLab`]: false,
				[`${subjectName}__FinalsMax`]: subjects[subjectName].finals.max,
				[`${subjectName}__FinalsScored`]: subjects[subjectName].finals?.scored,
				[`${subjectName}__AssignmentMax`]: subjects[subjectName].assignment.max,
				[`${subjectName}__AssignmentScored`]:
					subjects[subjectName].assignment?.scored,
				[`${subjectName}__InternalsMax`]: subjects[subjectName].internals.max,
				[`${subjectName}__InternalsAvg`]:
					(subjects[subjectName].internals.internals1 +
						subjects[subjectName].internals.internals2 +
						subjects[subjectName].internals.internals3) /
						3 ===
					0
						? "Not available"
						: floor(
								mean([
									subjects[subjectName].internals.internals1,
									subjects[subjectName].internals.internals2,
									subjects[subjectName].internals.internals3,
								]),
								2
						  ),
				[`${subjectName}__Internals1`]:
					subjects[subjectName].internals.internals1,
				[`${subjectName}__Internals2`]:
					subjects[subjectName].internals.internals2,
				[`${subjectName}__Internals3`]:
					subjects[subjectName].internals.internals3,
			};
		})
		.forEach((result) => {
			merge = Object.assign(merge, result);
		});

	return { name, ...merge, student };
};

// Component
const StudentResults = () => {
	const {
		results: { data: resultsNonSterilisedData },
	} = useStudentDocs();

	const date = new Date();
	const [year, month] = [
		date.getFullYear(),
		date.getMonth() > 5 && date.getMonth() < 10 ? 1 : 2,
	];

	// Filters the data according to the semester
	const structureObject = useCallback(
		(obj, semester) =>
			obj
				.filter((result) => result.semester === semester)
				.map((result) => result.result)
				.map((result) => restructureObject(result)),
		[]
	);

	const tempResults = resultsNonSterilisedData.map((results) => {
		const { semester, ...res } = results.results[year][month];
		return {
			result: { student: results.student, ...res },
			semester,
		};
	});

	const resultsData = [
		structureObject(tempResults, 1),
		structureObject(tempResults, 2),
		structureObject(tempResults, 3),
		structureObject(tempResults, 4),
		structureObject(tempResults, 5),
		structureObject(tempResults, 6),
	];

	const [result, setResult] = useState(resultsData[0]);

	const onClick = useCallback((semester) => {
		setResult(resultsData[semester - 1]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
		<Divider style={{margin: 20}}>Results</Divider>
				<ButtonGroup block>
					<Button onClick={() => onClick(1)}>Semester 1</Button>
					<Button onClick={() => onClick(2)}>Semester 2</Button>
					<Button onClick={() => onClick(3)}>Semester 3</Button>
					<Button onClick={() => onClick(4)}>Semester 4</Button>
					<Button onClick={() => onClick(5)}>Semester 5</Button>
					<Button onClick={() => onClick(6)}>Semester 6</Button>
				</ButtonGroup>
			{result.length === 0 ? (
				<Panel header="Results">
					<ResultTable results={result} />
				</Panel>
			) : (
				<>
					<Panel header="Results">
						<ResultTable results={result} />
					</Panel>
					<Panel header="Class Average Chart" collapsible>
						<Chart data={result} />
					</Panel>
				</>
			)}
		</>
	);
};

export default StudentResults;
