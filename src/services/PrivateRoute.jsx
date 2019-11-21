import React from "react";
import { Route, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({
	exact,
	path,
	component: Component,
	role,
  layout: Layout,
  history
}) => {

	const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  if (!isAuthenticated || !role.includes(user.roleid) ) history.push('/login')
	
	return (
		<Layout history={history}>
			<Route exact={exact} path={path} component={Component} />
		</Layout>
	);
};

export default withRouter(PrivateRoute);
