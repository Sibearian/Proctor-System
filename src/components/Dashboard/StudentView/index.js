/* eslint-disable camelcase */
import React from "react";
import { Redirect } from "react-router";
import { Loader } from "rsuite";
import PlaceholderParagraphProps from "rsuite/lib/Placeholder/PlaceholderParagraph";

const StudentView = ({ profile }) => {
	if (!profile.name) {
		return (
			<PlaceholderParagraphProps rows={2}>
				<Loader center content="loading" />
			</PlaceholderParagraphProps>
		);
	}

	return <Redirect to={`/student/${profile.uid}`} />;
};

export default StudentView;
