import React from "react";
import { Switch, withRouter } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./services/PrivateRoute";
import PublicRoute from "./services/PublicRoute";

// views
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/Notfound/NotFound";
import Logout from "./views/Logout";
import PrivateLayout from "./utils/PrivateLayout";

const adminRole = 1;
const employeeRole = 2;

function App(props) {
	return (
		<Switch>
			<PrivateRoute
				exact={true}
				path="/"
				component={Dashboard}
				role={[employeeRole, adminRole]}
        layout={PrivateLayout}
        {...props}
			/>
			<PrivateRoute
				path="/logout"
				component={Logout}
				role={[employeeRole, adminRole]}
        layout={PrivateLayout}
        {...props}
			/>
			<PublicRoute path="/login" component={Login} />
			<PublicRoute component={NotFound} />
		</Switch>
	);
}

export default withRouter(App);
