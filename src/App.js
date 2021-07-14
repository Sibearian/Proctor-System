import React from "react";
import { Switch } from "react-router";

import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";

function App() {
	return (
		<ProfileProvider>
			<Switch>
				<PublicRoute path="/signin" />
				<PrivateRoute path="/" />
			</Switch>
		</ProfileProvider>
	);
}

export default App;
