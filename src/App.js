import React from "react";
import { Switch } from "react-router";

import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/profile.context";
import { StudentProvider } from "./context/student.context";

function App() {
	return (
		<ProfileProvider>
			<Switch>
				<PublicRoute path="/signin" />
				<StudentProvider>
					<PrivateRoute />
				</StudentProvider>
			</Switch>
		</ProfileProvider>
	);
}

export default App;
