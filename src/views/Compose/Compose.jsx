import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneArea } from 'material-ui-dropzone';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { postRequest, postRequestImage } from "../../utils/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { SET_SUCCESS, SET_ERROR } from "../../store/types/notificationTypes";
import { Editor } from "@tinymce/tinymce-react";
import IOSSwitch from "../../components/IOSSwitch/IOSSwitch";

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

const CreateArticle = ({ history }) => {
	const classes = useStyles();

	const [loading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [article, setArticle] = useState("");
	const [image, setGif] = useState("");
	const [tagid, setTagId] = useState("");
	const [error, setError] = useState({});
	const [postType, setPostType] = useState(true);

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const handleArticle = async e => {
		try {
			e.preventDefault();
			if (loading) return;
			setIsLoading(true);
			const articleData = {
				title,
				article,
				tagid
			};

			const endpoint = "/articles";
			const response = await postRequest(
				endpoint,
				articleData,
				auth.user.token
			);
			if (response.status === "success") {
				dispatch({ type: SET_SUCCESS, payload: response.data.message });
				history.push("/");
			} else {
				if (typeof response.error === "object") {
					setError(response.error);
				} else {
					dispatch({ type: SET_ERROR, payload: response.error });
				}
			}
			setIsLoading(false);
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: "Ops something went wrong , please try later" });
		}
	};

	const handleGif = async e => {
		try {
			e.preventDefault();
			if (loading) return;
			setIsLoading(true);
			const formData = new FormData();
			formData.append('title', title);
			formData.append('tagid', tagid);
			formData.append('image', image);
			const endpoint = "/gifs";
			const response = await postRequestImage(
				endpoint,
				formData,
				auth.user.token
			);
			if (response.status === "success") {
				dispatch({ type: SET_SUCCESS, payload: response.data.message });
				history.push("/");
			} else {
				if (typeof response.error === "object") {
					setError(response.error);
				} else {
					dispatch({ type: SET_ERROR, payload: response.error });
				}
			}
			setIsLoading(false);
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: "Ops something went wrong , please try later" });
		}
	};
	  
	return (
		<div>
			<Typography variant="h5" gutterBottom className={classes.mobileCenter}>
				{postType?'Post Article':'Post Gif'}
			</Typography>
			<Typography
				variant="subtitle1"
				gutterBottom
				className={classes.mobileCenter}>
				Fill the form below to post an article/Gif
			</Typography>

			<Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
					<Grid item>Post Gif</Grid>
          <Grid item>
						<FormControlLabel
							style={{marginLeft: '16px'}}	
							control={
								<IOSSwitch
									checked={postType}
									onChange={(e)=>setPostType(e.target.checked)}
								/>
							}
						/>
          </Grid>
          <Grid item>Post Article</Grid>
        </Grid>
      </Typography>

			{postType?(
				<form
					className={classes.container}
					autoComplete="off"
					onSubmit={handleArticle}>
					<Grid container spacing={2}>
						<TextField
							error={error.title ? true : false}
							id="title"
							label="title"
							margin="normal"
							variant="outlined"
							onChange={e => setTitle(e.target.value)}
							helperText={error.title}
							required
							fullWidth
						/>
						<Editor
							initialValue="<p>This is the initial content of the editor</p>"
							init={{
								height: 300,
								width: '100%',
								menubar: false,
								plugins: [
									"advlist autolink lists link image charmap print preview anchor",
									"searchreplace visualblocks code fullscreen",
									"insertdatetime media table paste code help wordcount"
								],
								toolbar:
									"undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
							}}
							onChange={e => setArticle(e.target.getContent())}
						/>
						<TextField
							error={error.tagid ? true : false}
							label="Tag"
							select
							value={tagid}
							margin="normal"
							variant="outlined"
							onChange={e => setTagId(e.target.value)}
							helperText={error.tagid}
							required
							fullWidth
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={1}>Official</MenuItem>
							<MenuItem value={2}>ICT</MenuItem>
							<MenuItem value={3}>Social</MenuItem>
							<MenuItem value={4}>Sports</MenuItem>
							<MenuItem value={5}>Sales</MenuItem>
							<MenuItem value={6}>News</MenuItem>
						</TextField>
					</Grid>
					<Button
						variant="contained"
						size="large"
						className={classes.submit}
						type="submit"
						color="primary"
						disabled={loading}>
						{loading ? "Loading..." : "Post Article"}
					</Button>
				</form>
			):(
				<form
					className={classes.container}
					autoComplete="off"
					onSubmit={handleGif}>
						<Grid container spacing={2}>
							<TextField
								error={error.title ? true : false}
								id="title"
								label="title"
								margin="normal"
								variant="outlined"
								onChange={e => setTitle(e.target.value)}
								helperText={error.title}
								required
								fullWidth
							/>
							<DropzoneArea
							 	onChange={(files) => setGif(files[0])}
							 	acceptedFiles={['image/gif']}
								// showPreviews={true}
								// maxFileSize={5000000}
							/>
							{error && error.filename?(<div style={{color:'red'}}><small>Gif image is required</small></div>):null}
							<TextField
								error={error.tagid ? true : false}
								label="Tag"
								select
								value={tagid}
								margin="normal"
								variant="outlined"
								onChange={e => setTagId(e.target.value)}
								helperText={error.tagid}
								required
								fullWidth
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={1}>Official</MenuItem>
								<MenuItem value={2}>ICT</MenuItem>
								<MenuItem value={3}>Social</MenuItem>
								<MenuItem value={4}>Sports</MenuItem>
								<MenuItem value={5}>Sales</MenuItem>
								<MenuItem value={6}>News</MenuItem>
							</TextField>
						</Grid>
						<Button
							variant="contained"
							size="large"
							className={classes.submit}
							type="submit"
							color="primary"
							disabled={loading}>
							{loading ? "Loading..." : "Post Gif"}
						</Button>
					</form>
			)}


		</div>
	);
};

export default CreateArticle;
