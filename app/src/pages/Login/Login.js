import React from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    Link,
} from "@material-ui/core";

import "./Login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", authflag: 1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            username: event.state.username,
            password: event.state.password,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const body = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })

        const settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        };

        const resp = await fetch("api/login", settings);
        
        if (resp.status === 201) {
            console.log("User successfully logged in!");
            window.location.href = "/";
        }
        else 
            console.log("Invalid username or password");
    }

    render() {
        return (
            <div>
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                            className="login-form"
                        >

                            <Paper
                                variant="elevation"
                                elevation={2}
                                className="login-background"
                            >

                                <Grid item>
                                    <Typography component="h1" variant="h5" align="center">
                                        Sign in
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form onSubmit={this.handleSubmit}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    autoFocus
                                                    label="Email / Username"
                                                    name="username"
                                                    variant="outlined"
                                                    value={this.state.username}
                                                    onChange={(event) =>
                                                        this.setState({
                                                            [event.target.name]: event.target.value,
                                                        })
                                                    }
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type="password"
                                                    label="Password"
                                                    fullWidth
                                                    name="password"
                                                    variant="outlined"
                                                    value={this.state.password}
                                                    onChange={(event) =>
                                                        this.setState({
                                                            [event.target.name]: event.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className="button-block"
                                                >
                                                    Sign In
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid container direction="row" justify="space-between">
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Forgot Password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            Not a member? Register Here
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default Login;