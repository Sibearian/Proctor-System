import React from "react";
import { Switch } from "react-router";

import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SignIn from "./pages/SignIn";
import ProctorHome from "./pages/ProctorHome";

function App() {
	return (
		<Switch>
			<PublicRoute path="/signin">
				<SignIn />
			</PublicRoute>
			<PrivateRoute path="/">
				<ProctorHome />
			</PrivateRoute>
		</Switch>
	);
}

export default App;
