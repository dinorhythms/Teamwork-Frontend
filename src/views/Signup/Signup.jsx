import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { postRequest } from "../../utils/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { SET_ERROR, SET_SUCCESS } from "../../store/types/notificationTypes";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	submit: {
		margin: theme.spacing(5, 0, 2),
		padding: theme.spacing(1, 8, 1),
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			padding: theme.spacing(2, 4, 2)
		}
	},
	notification: {
		backgroundColor: "green",
		textAlign: "center",
		marginBottom: 15
	},
	rednotification: {
		backgroundColor: "red",
		textAlign: "center",
		marginBottom: 15
	},
	mobileCenter: {
		[theme.breakpoints.down("xs")]: {
			textAlign: "center"
		}
	},
	textField: {
		[theme.breakpoints.down("xs")]: {
			marginTop: 0
		}
	}
}));

const Signup = ({ history }) => {
	const classes = useStyles();

	const [loading, setIsLoading] = useState(false);
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [jobrole, setJobRole] = useState("");
	const [department, setDepartment] = useState("");
	const [address, setAddress] = useState("");
	const [error, setError] = useState({});

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const handleCreateUser = async e => {
		try {
			e.preventDefault();
			if (loading) return;
			setIsLoading(true);
			const userData = {
				firstname,
				lastname,
				email,
				password,
				gender,
				jobrole,
				department,
				address
			};

			const endpoint = "/auth/create-user";
			const response = await postRequest(endpoint, userData, auth.user.token);
			if (response.status === "success") {
        dispatch({ type: SET_SUCCESS, payload: response.data.message });
        history.push('/');
			} else {
				if (typeof response.error === "object") {
					setError(response.error);
				} else {
					dispatch({ type: SET_ERROR, payload: response.error });
				}
			}
			setIsLoading(false);
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	return (
		<div>
			<Typography variant="h5" gutterBottom className={classes.mobileCenter}>
				Create User
			</Typography>
			<Typography
				variant="subtitle1"
				gutterBottom
				className={classes.mobileCenter}>
				Fill the form below to create a new employee account
			</Typography>
			<form
				className={classes.container}
				autoComplete="off"
				onSubmit={handleCreateUser}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							error={error.firstname ? true : false}
							id="firstname"
							label="Firstname"
							margin="normal"
							variant="outlined"
							className={classes.textField}
							onChange={e => setFirstname(e.target.value)}
							helperText={error.firstname}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							error={error.lastname ? true : false}
							id="lastname"
							label="Lastname"
							margin="normal"
							variant="outlined"
							className={classes.textField}
							onChange={e => setLastname(e.target.value)}
							helperText={error.lastname}
							required
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							error={error.email ? true : false}
							id="email"
							label="Email"
							margin="normal"
							variant="outlined"
							onChange={e => setEmail(e.target.value)}
							helperText={error.email}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							error={error.password ? true : false}
							id="password"
							label="Password"
							margin="normal"
							variant="outlined"
							type="password"
							className={classes.textField}
							onChange={e => setPassword(e.target.value)}
							helperText={error.password}
							required
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<TextField
							error={error.gender ? true : false}
							id="outlined-select-gender"
							select
							label="Gender"
							value={gender}
							onChange={e => setGender(e.target.value)}
							helperText={error.gender}
							margin="normal"
							variant="outlined"
							required
							fullWidth>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={"male"}>Male</MenuItem>
							<MenuItem value={"female"}>Female</MenuItem>
						</TextField>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							error={error.jobrole ? true : false}
							id="jobrole"
							label="Job Role"
							margin="normal"
							variant="outlined"
							className={classes.textField}
							onChange={e => setJobRole(e.target.value)}
							helperText={error.gender}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							error={error.department ? true : false}
							id="department"
							label="Department"
							margin="normal"
							variant="outlined"
							className={classes.textField}
							onChange={e => setDepartment(e.target.value)}
							helperText={error.department}
							required
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							error={error.address ? true : false}
							label="Address"
							margin="normal"
							variant="outlined"
							onChange={e => setAddress(e.target.value)}
							helperText={error.address}
							required
							fullWidth
						/>
					</Grid>
				</Grid>
				<Button
					variant="contained"
					size="large"
					className={classes.submit}
					type="submit"
					color="primary"
					disabled={loading}>
					{loading ? "Loading..." : "Create User"}
				</Button>
			</form>
		</div>
	);
};

export default Signup;
