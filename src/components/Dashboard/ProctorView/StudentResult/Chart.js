import React from "react";
import { mean, floor } from "lodash";
import { Bar } from "react-chartjs-2";

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

const stitchData = (data = {}, subjectNames = []) => {
	return subjectNames.map((name) => {
		if (data[`${name}__isLab`]) {
			return [
				// Assignment Score
				data[`${name}__AssignmentScored`] || null,
				// Internals avg score
				mean([data[`${name}__Internals1`], data[`${name}__Internals2`]]) ||
					null,
				// Final Score
				data[`${name}__FinalsScored`] || null,
			];
		}
		return [
			// Assignment Score
			data[`${name}__AssignmentScored`] || null,
			// Internals avg score
			mean([
				data[`${name}__Internals1`],
				data[`${name}__Internals2`],
				data[`${name}__Internals3`],
			]) || null,
			// Final Score
			data[`${name}__FinalsScored`] || null,
		];
	});
};

const agrigate = (subjectNames = [""], data = []) => {
	const reduced = data
		.map((result) => stitchData(result, subjectNames))
		.reduce((prevValue, currValue) =>
			currValue.map(
				(value, index) => [
					value[0] + prevValue[index][0],
					value[1] + prevValue[index][1],
					value[2] + prevValue[index][2],
				],
				[0, 0, 0]
			)
		);

	const getAvg = (value) => floor(value / data.length);

	return reduced.map((value) => [
		getAvg(value[0]),
		getAvg(value[1]),
		getAvg(value[2]),
	]);
};

const Chart = ({ data }) => {
	if (data.length === 0) {
		return null;
	}
	const subNames = getSubjectNames(data[0]);
	const agrigateValue = agrigate(subNames, data);

	// Data clean-up for easier chart making
	const perSubAssignment = agrigateValue.map((subject) => subject[0]);
	const perSubInternals = agrigateValue.map((subject) => subject[1]);
	const perSubFinals = agrigateValue.map((subject) => subject[2]);
	const internalsDataColor = "#052F5F";
	const assignmentDataColor = "#F79F79";
	const finalsDataColor = "#82846D";

	const dataSets = [
		{
			label: "assignments",
			data: perSubAssignment,
			backgroundColor: assignmentDataColor,
			borderWidth: 1,
		},
		{
			label: "IA",
			data: perSubInternals,
			backgroundColor: internalsDataColor,
			borderWidth: 1,
		},
		{
			label: "Finals",
			data: perSubFinals,
			backgroundColor: finalsDataColor,
			borderWidth: 1,
		},
	];

	return (
		<Bar
			data={{
				labels: subNames,
				datasets: dataSets,
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			}}
		/>
	);
};

export default Chart;
