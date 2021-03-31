import React from "react";
import "./signup.css";

import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

const API_URL = "http://localhost:9000/api/users";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(API_URL, {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        pass: this.state.password,
      })
      .then(function (response) {
        console.log(response);
        window.location.assign("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({
      username: event.state.username,
      password: event.state.password,
      firstName: event.state.firstName,
      lastName: event.state.lastName,
      email: event.state.email,
    });
  }
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar"></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.username}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.password}
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(event) =>
                    this.setState({
                      [event.target.name]: event.target.value,
                    })
                  }
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree to nothing."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
}

export default SignUp;
