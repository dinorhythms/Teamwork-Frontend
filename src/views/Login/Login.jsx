import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { AUTH_FETCH, AUTH_RESOLVE, AUTH_REJECT } from '../../store/types/authTypes';
import { postRequest } from '../../utils/apiRequest';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notification: {
    backgroundColor: 'red',
    textAlign: 'center',
  }
}));

export default function Login({ history }) {

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: AUTH_FETCH});
      const endpoint = '/auth/signin';
      const response = await postRequest(endpoint, { email, password });
      if(response.status === 'success'){
        dispatch({ type: AUTH_RESOLVE, payload: response.data });
        history.push('/');
      } else {
        dispatch({ type: AUTH_REJECT, payload: response.error });
      }
    } catch (error) {
      dispatch({ type: AUTH_REJECT, payload: "Internal Server Error, please try later" });
    }
  }

  return (
    <Grid item xs={11} sm={7}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={status === 'loading'}
          >
            {status === 'loading'?'Loading...':'Sign In'}
          </Button>
          {error?(
            <SnackbarContent className={classes.notification} message={typeof error === 'object'?(
              Object.keys(error).map( key =><p key={key}>{error[key]}</p>)
            ):error} />
          ):null}
        </form>
    </Grid>
  )
}
