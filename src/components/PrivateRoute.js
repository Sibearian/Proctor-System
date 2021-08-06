import React from "react";
import { Redirect, Route } from "react-router";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";
import Home from "../pages/Home";

const PrivateRoute = () => {
	const { profile: {isLoading, profile} } = useProfile();

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

	return <Route to="/dashboard" component={Home} />;
};

export default PrivateRoute;
