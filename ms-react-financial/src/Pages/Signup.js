import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import '../Style/login.css';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMsg: ''
        };
    }

    handleUsername = (e) => {
        this.setState({ username: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleClick = (e) => {
        var url = 'https://cors-anywhere.herokuapp.com/';
        var obj = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(`https://msad-api.herokuapp.com/addUser`, obj).then(res => {
            if (res.data.id == 0) {
                this.setState({ errorMsg: true })
            }
            else {
                var id = res.data['id'];
                this.props.history.push({
                    pathname: `/taxes/${id}`,
                    state: { id: id }
                });
            }
        })
    }

    render() {
        return (
            <div>
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
                            {this.state.errorMsg && (<p className='error'> Username Already in Use</p>)}
                        </Grid>
                        <Grid container>
                            <Grid item className='grid-item'>
                                <Button
                                    label="Sign Up" onClick={(event) => this.handleClick(event)} color="primary" variant="contained">
                                    Sign Up</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default Signup; 