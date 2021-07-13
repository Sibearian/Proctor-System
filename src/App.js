import React from "react";
import { Switch } from "react-router";

import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SignIn from "./pages/SignIn";
import ProctorHome from "./pages/ProctorHome";
import { ProfileProvider } from "./context/profile.context";

function App() {
	return (
		<ProfileProvider>
			<Switch>
				<PublicRoute path="/signin">
					<SignIn />
				</PublicRoute>
				<PrivateRoute path="/">
					<ProctorHome />
				</PrivateRoute>
			</Switch>
		</ProfileProvider>
	);
}

export default App;
