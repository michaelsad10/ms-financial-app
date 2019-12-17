import React, { Component } from 'react';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import '../Style/login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMsg: '',
        };
    }


    getStatus = (status, id) => {
        this.props.loginStatus(status, id);
    }

    handleClick = (e) => {
        var obj = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(`https://msad-api.herokuapp.com/login`, obj).then(res => {
            if (res.data == 0) {
                this.setState({ errorMsg: true })
                // display incorrect login 
            }
            else {
                this.getStatus = (true, res.data);
                this.props.history.push({
                    pathname: `/taxes/${res.data}`,
                    state: { id: res.data }
                });
                // redirect v 
            };
        })
    }
    handleUsername = (e) => {
        this.setState({ username: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div className='contain'>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Financial App
              </Typography>
                    </Toolbar>
                </AppBar>
                <Paper className='paper'>
                    <Grid container>
                        <Grid item className='grid-item'>
                            <TextField
                                id="standard-basic"
                                label="Username"
                                onChange={this.handleUsername}
                            />
                        </Grid>
                        <Grid container>
                            <Grid item className='grid-item'>
                                <TextField
                                    type="password"
                                    label="Password"
                                    onChange={this.handlePassword}
                                />
                            </Grid>
                        </Grid>
                        <Grid item className='grid-item'>
                            {this.state.errorMsg && (<p className='error'> Username/Password Incorrect </p>)}
                        </Grid>
                        <Grid container>
                            <Grid item className='grid-item'>
                                <Button
                                    label="Submit" onClick={(event) => this.handleClick(event)} color="primary" variant="contained">
                                    Submit</Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item className='grid-item'>
                                <Link to="/signup"> Sign Up </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default Login; 