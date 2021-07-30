import React from "react";
import { Route, Switch } from "react-router";
import { Container, Content, Sidebar } from "rsuite";

import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import Messages from "../../components/Messages";
import Settings from "./Settings";
import UserProfile from "./UserProfile";

const Home = () => {
	return (
		<Container>
			<Sidebar width={60}>
				<Navbar />
			</Sidebar>
			<Content>
				<Switch>
					<Route path="/dashboard" exact>
						<Dashboard />
					</Route>
					<Route path="/messages" exact>
						<Messages />
					</Route>
					<Route path="/settings" exact>
						<Settings />
					</Route>
					<Route path="/profile" exact>
						<UserProfile />
					</Route>
					<Route path="/" exact>
						<Dashboard />
					</Route>
				</Switch>
			</Content>
		</Container>
	);
};

export default Home;
