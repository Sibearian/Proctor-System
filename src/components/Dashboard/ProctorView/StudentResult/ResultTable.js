/* eslint-disable react/jsx-curly-brace-presence */
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "rsuite";
import EditResultModal from "./EditResultModal";

const { Cell, HeaderCell, Column, ColumnGroup } = Table;

const getNames = (data = {}) => {
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

const ResultTable = ({ results }) => {
	const reload = Object.keys(results).length;
	useEffect(() => {}, [reload]);
	const names = getNames(results[0]);
	const [rowData, setRowData] = useState(null);

	const onRowClick = useCallback((data) => setRowData(data), []);

	return (
		<div>
			<Table
				data={results}
				bordered
				cellBordered
				height={420}
				affixHeader
				headerHeight={80}
				autoHeight
				sortColumn="name"
				onRowClick={(data) => onRowClick(data)}
			>
				<Column>
					<HeaderCell>Name</HeaderCell>
					<Cell dataKey="name" />
				</Column>
				{names.map((subjectName, key) => (
					<ColumnGroup header={subjectName} key={key}>
						<Column>
							<HeaderCell>Assignment</HeaderCell>
							<Cell dataKey={`${subjectName}__AssignmentScored`} />
						</Column>
						<Column colSpan={2}>
							<HeaderCell>Internals Average</HeaderCell>
							<Cell dataKey={`${subjectName}__InternalsAvg`} />
						</Column>
						<Column colSpan={2}>
							<HeaderCell>Finals</HeaderCell>
							<Cell dataKey={`${subjectName}__FinalsScored`} />
						</Column>
					</ColumnGroup>
				))}
			</Table>
			{rowData && (
				<EditResultModal rowData={rowData} close={() => setRowData(null)} />
			)}
		</div>
	);
};

export default ResultTable;
