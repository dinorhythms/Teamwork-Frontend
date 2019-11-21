import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import img from '../../assets/images/login.svg';
import bg from '../../assets/images/confetti-doodles.svg';

const styles = {
  leftBar: {
    background: '#1976d2',
    backgroundImage: `url(${bg})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white'
  },
  rightBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    height: '100%'
  },
  image: {
    height: '20rem'
  }
} 

const PublicLayout = props => {
	return (
    <Grid container style={styles.container}>
      <Grid item style={styles.leftBar} xs={12} sm={6} md={6}>
        <div>
          <Typography variant="h2" style={{marginBottom: '2rem'}}>
            Teamwork
          </Typography>
          <img src={img} alt='teamwork' style={styles.image} />
        </div>
      </Grid>
      <Grid item sxs={11} sm={6} md={6} elevation={6} style={styles.rightBar}>
        {props.children}
      </Grid>
    </Grid>
	);
};

export default PublicLayout;
