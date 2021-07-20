import React from "react";
import { Route, Switch } from "react-router";
import { Col, Grid, Row } from "rsuite";

import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import Messages from "./Messages";
import Settings from "./Settings";
import UserProfile from "./UserProfile";

const Home = () => {
	return (
		<Grid>
			<Row>
				<Col>
					<Navbar />
				</Col>
				<Col>
					<Switch>
						<Route path="/dashboard">
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
					</Switch>
				</Col>
			</Row>
		</Grid>
	);
};

export default Home;
