/* eslint-disable camelcase */
import React from "react";
import { Loader} from "rsuite";
import PlaceholderParagraph from "rsuite/lib/Placeholder/PlaceholderParagraph";
import Card from "./Card";

const StudentView = ({ profile }) => {
	if (!profile.name) {
		return (
			<PlaceholderParagraph rows={2}>
				<Loader center content="loading" />
			</PlaceholderParagraph>
		);
	}

	return <Card profile={profile} />;
};

export default StudentView;
