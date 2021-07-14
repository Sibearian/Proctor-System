import React from "react";
import { Redirect, Route } from "react-router";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";
import ProctorHome from "../pages/ProctorHome";
import StudentHome from "../pages/StudentHome";

const PrivateRoute = ({ children, ...routeProps }) => {
	const { isLoading, profile } = useProfile();

	if (isLoading && !profile) {
		return (
			<Container>
				<Loader center vertical size="md" content="Loading" speed="fast" />;
			</Container>
		);
	}

	if (!isLoading && !profile) {
		return <Redirect to="/signin" />;
	}

	return (
		<Route {...routeProps}>
			{profile.user?.student ? <StudentHome /> : <ProctorHome />}
		</Route>
	);
};

export default PrivateRoute;
