import React from "react";
import { Route, Switch } from "react-router";
import { Container, Content, Sidebar } from "rsuite";

import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import Message from "../../components/message-window";
import Settings from "../../components/Settings";

const InvalidPage = () => {
	return (
		<div>
			<h1>404</h1>
			<hr />
			Page not found
		</div>
	);
};

const Home = () => {
	return (
		<Container>
			<Sidebar width={60}>
				<Navbar />
			</Sidebar>
			<Content>
				<Switch>
					<Route exact path="/" component={Dashboard} />
						<Route exact path="/messages" component={Message} />
					<Route exact path="/settings" component={Settings} />
					<Route path="/" component={InvalidPage} />
				</Switch>
			</Content>
		</Container>
	);
};

export default Home;
