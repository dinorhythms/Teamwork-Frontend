import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { postRequest } from '../../utils/apiRequest';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(1, 4, 1),
  },
  notification: {
    backgroundColor: 'green',
    textAlign: 'center',
  },
  rednotification: {
    backgroundColor: 'red',
    textAlign: 'center',
  }
}));

const Signup = () => {

  const classes = useStyles();

  const [loading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [jobrole, setJobRole] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState({});
  const [message, setMessage] = useState('');

  const auth = useSelector(state => state.auth);

  const handleCreateUser = async (e) => {
    try {
      e.preventDefault();
      if(loading) return;
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
      }

      const endpoint = '/auth/create-user';
      const response = await postRequest(endpoint, userData, auth.user.token);
      if(response.status === 'success'){
        setMessage(response.data.message);
        setIsLoading(false);
      } else {
        setError(response.error);
        setIsLoading(false);
      }
    } catch (error) {
      setMessage("Internal Server Error, please try later");
    }
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom >
        Create User
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Fill the form below to create a new employee account
      </Typography>
      {message?(
        <SnackbarContent className={classes.notification} message={message} />
      ):null}
      {typeof error === 'string'?(
        <SnackbarContent className={classes.rednotification} message={error} />
      ):null}
      <form className={classes.container} autoComplete="off" onSubmit={handleCreateUser}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.firstname?true:false}
              id="firstname"
              label="Firstname"
              margin="normal"
              variant="outlined"
              onChange={(e) => setFirstname(e.target.value)}
              helperText={error.firstname}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.lastname?true:false}
              id="lastname"
              label="Lastname"
              margin="normal"
              variant="outlined"
              onChange={(e) => setLastname(e.target.value)}
              helperText={error.lastname}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.email?true:false}
              id="email"
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              helperText={error.email}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.password?true:false}
              id="password"
              label="Password"
              margin="normal"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              helperText={error.password}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" error={error.gender?true:false} fullWidth style={{ marginTop: 16, marginBottom: 8}}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
              <FormHelperText>{error.gender}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={error.jobrole?true:false}
              id="jobrole"
              label="Job Role"
              margin="normal"
              variant="outlined"
              onChange={(e) => setJobRole(e.target.value)}
              helperText={error.gender}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              error={error.department?true:false}
              id="department"
              label="Department"
              margin="normal"
              variant="outlined"
              onChange={(e) => setDepartment(e.target.value)}
              helperText={error.department}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={error.address?true:false}
              label="Address"
              margin="normal"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              helperText={error.address}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="contained" className={classes.submit} type="submit" color="primary" disabled={loading}>
            {loading?"Loading...": "Create User"}
        </Button>
      </form>
    </div>
  )
}

export default Signup;
