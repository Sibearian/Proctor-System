import React from "react";
import { Loader } from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";
import { useProfile } from "../../context/profile.context";
import Card from "./Card";

const loader = (
	<PlaceholderParagraph rows={2}>
		<Loader center content="loading" />
	</PlaceholderParagraph>
);

const ProctorView = () => {
	const { studentDocs } = useProfile();

	if (!studentDocs) {
		return loader;
	}

	const studentList = studentDocs.map((student, index) => {
		return <Card profile={student} key={index} />;
	});

	return <div>{console.log(studentList)}</div>;
};

export default ProctorView;
