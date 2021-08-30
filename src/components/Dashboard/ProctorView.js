import React, { useCallback, useState } from "react";
import { Button } from "rsuite";
import { useStudentDocs } from "../../context/student.context";
import Card from "./Card";

const ProctorView = () => {
	const {
		studentDocs: { isLoading, data },
	} = useStudentDocs();

	const [canShow, setCanShow] = useState(false);
	const [list, setList] = useState(null);

	const onClick = useCallback(() => {
		setCanShow(!canShow);
		setList(
			data.map((student, index) => {
				return <Card profile={student} key={index} />;
			})
		);
	}, [canShow, data]);

	return (
		<div>
			<Button active={!isLoading} loading={isLoading} onClick={onClick}>
				{canShow ? "Hide Students" : "Show Students"}
			</Button>
			{canShow ? (
				<>
					<hr />
					{list}
				</>
			) : null}
		</div>
	);
};

export default ProctorView;
