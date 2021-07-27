import React, { useCallback, useState } from "react";
import { Button } from "rsuite";
import { useProfile } from "../../context/profile.context";
import Card from "./Card";

const ProctorView = () => {
	const {
		studentDocs: { isLoading, data },
	} = useProfile();
	const [canShow, setCanShow] = useState(false);
	const [list, setList] = useState(null);

	const onClick = useCallback(() => {
		setCanShow(!canShow);
		setList(
			data.map((student, index) => <Card profile={student} key={index} />)
		);
	}, [canShow, data]);

	return (
		<div>
			<Button active={!isLoading} loading={isLoading} onClick={onClick}>
				{canShow ? "hide student's list" : "show student's list"}
			</Button>
			{canShow ? <hr /> : null}
			{canShow ? list : null}
		</div>
	);
};

export default ProctorView;
