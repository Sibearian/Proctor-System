import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";
import Dashboard from "../pages/Dashboard";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";
import UserProfile from "../pages/UserProfile";
import Navbar from "./Navbar";

const PrivateRoute = () => {
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
		<>
			<Navbar />
			<Switch>
				<Route to="/dashboard" exact component={Dashboard} />
				<Route to="/settings" exact component={Settings} />
				<Route to="/profile" exact component={UserProfile} />
				<Route to="/messages" exact component={Messages} />
			</Switch>
		</>
	);
};

export default PrivateRoute;
