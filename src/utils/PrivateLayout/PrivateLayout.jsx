import React, { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from 'notistack';
import NotificationBar from "../../components/NotificationBar";

const useStyles = makeStyles(theme => ({
	main: {
		paddingLeft: 20,
		paddingRight: 35,
		paddingTop: 80,
		paddingBottom: 50,
		[theme.breakpoints.up("sm")]: {
			paddingLeft: 220
		},
		[theme.breakpoints.up("md")]: {
			paddingLeft: 260
		}
  },
}));

const PrivateLayout = props => {

	const classes = useStyles();
	const [openSidebar, setOpenSidebar] = useState(false);

	const {
		user: { roleid, email, firstname, lastname }
	} = props.auth;
	const fullName = firstname + " " + lastname;
	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = () => {
		setOpenSidebar(false);
  };

	return (
    <SnackbarProvider maxSnack={5}>
    <>
			<Topbar
				onSidebarOpen={handleSidebarOpen}
				{...props}
				email={email}
				fullName={fullName}
			/>
			<Sidebar
				onClose={handleSidebarClose}
				open={openSidebar}
				role={roleid}
				{...props}
			/>
			<main className={classes.main}>     
        <NotificationBar />
        {props.children}
      </main>
    </>
    </SnackbarProvider>
	);
};

export default PrivateLayout;
