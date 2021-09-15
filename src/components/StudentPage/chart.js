import { floor, mean } from "lodash";
import React from "react";
import { Bar } from "react-chartjs-2";

const getSubjectNames = (data = []) => data.map((subject) => subject.name);
const getInternalsAvg = (data = []) =>
	data.map((subject) =>
		subject.lab
			? floor(mean([subject.internal1, subject.internal2]), 2)
			: floor(
					mean([subject.internal1, subject.internal2, subject.internal3]),
					2
			  )
	);
const getAssignments = (data = []) =>
	data.map((subject) => subject.assignmentScored);
const getFinals = (data = []) => data.map((subject) => subject.finalsScored);

const Chart = ({ data }) => {
	const labels = getSubjectNames(data);
	const internals = getInternalsAvg(data);
	const assignments = getAssignments(data);
	const finals = getFinals(data);

	const backgroundColors = ["#ffb6c1", "#fffd82", "#c8ffbe"];
	const borderColors = ["#c02d0c", "#c02d0c", "#c02d0c"];

	const dataSets = [
		{
			label: "Assignments",
			data: assignments,
			backgroundColor: backgroundColors[0],
			borderColor: borderColors[0],
			borderWidth: 1,
		},
		{
			label: "Internals Average",
			data: internals,
			backgroundColor: backgroundColors[1],
			borderColor: borderColors[1],
			borderWidth: 1,
		},
		{
			label: "Finals",
			hidden: true,
			data: finals,
			backgroundColor: backgroundColors[2],
			borderColor: borderColors[2],
			borderWidth: 1,
		},
	];

	return (
		<Bar
			data={{
				labels,
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
