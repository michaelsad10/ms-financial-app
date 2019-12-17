import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from "react-apexcharts";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../Style/taxes.css';
import axios from 'axios';


class Taxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            income: '',
            federal: '',
            state: '',
            takehome: '',
            options: {
                labels: []
            },
            series: []
        };
    }
    expense = () => {
        var id = this.props['location']['state']['id'];
        this.props.history.push({
            pathname: `/expenses/${id}`,
            state: { id: id }
        });
    }
    investments = () => {
        var id = this.props['location']['state']['id'];
        this.props.history.push({
            pathname: `/invest/${id}`,
            state: { id: id }
        })
    }
    taxes = () => {
        var id = this.props['location']['state']['id'];
        this.props.history.push({
            pathname: `/taxes/${id}`,
            state: { id: id }
        })
    }
    signout = () => {
        this.props.history.push({
            pathname: '/login'
        })
    }
    componentDidMount = () => {
        var id = this.props['location']['state']['id']
        this.setState({ id: id })
        axios.get(`https://msad-api.herokuapp.com/taxes/${id}`).then(res => {
            if (res.data.status != 0) {
                this.setState({
                    id: res.data.user_id,
                    income: res.data.income,
                    federal: res.data.federal,
                    state: res.data.state,
                })
                this.calculateTakehome();
            }
        })
    }


    changeIncome = (e) => {
        if (e.target.value == '') {
            this.setState({ income: 0 })
        }
        else {
            this.setState({ income: parseFloat(e.target.value) })
        }
        // this.calculateTakehome();
    }

    changeFederal = (e) => {
        if (e.target.value == '') {
            this.setState({ federal: '' })
        }
        else {
            this.setState({ federal: parseFloat(e.target.value) })
            // this.calculateTakehome();
        }
        // this.calculateTakehome(); 
    }

    changeState = (e) => {
        if (e.target.value == '') {
            this.setState({ state: '' })
        }
        else {
            this.setState({ state: parseFloat(e.target.value) })
            // this.calculateTakehome();
        }
        // this.calculateTakehome(); 
    }

    saveTaxes = () => {
        var obj = {
            income: this.state.income,
            federal: this.state.federal,
            state: this.state.state,
            user_id: this.state.id,
        }
        axios.post(`https://msad-api.herokuapp.com/taxes`, obj).then(res => {
        })
    }

    calculateTakehome = () => {
        var fed = true;
        var state = true;
        var federalTakeOut = 0;
        var stateTakeOut = 0;
        var income = this.state.income;
        var obj = {
            labels: []
        }
        newSeries = [];
        if (this.state.federal == '' || this.state.federal == 0) {
            fed = false;
        }
        if (this.state.state == '' || this.state.state == 0) {
            state = false;
        }
        if (fed) {
            federalTakeOut = this.state.income * (this.state.federal / 100);
        }
        if (state) {
            stateTakeOut = this.state.income * (this.state.state / 100);
        }
        income = income - federalTakeOut - stateTakeOut;
        var newSeries = [income, federalTakeOut, stateTakeOut];
        obj.labels = ['Takehome', 'Federal', 'State'];
        this.setState({
            options: obj,
            series: newSeries,
            takehome: income
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
                        <Button onClick={this.expense}> Expense </Button>
                        <Button onClick={this.taxes}> Taxes </Button>
                        <Button onClick={this.investments}> Investments </Button>
                        <Button onClick={this.signout}> Sign Out </Button>

                    </Toolbar>
                </AppBar>
                <Paper className="paperExpense">
                    <Grid container>
                        <Grid item className='paperTitle'>
                            <Typography variant="h4" gutterBottom> Taxes </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Income</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={this.state.income}
                                    labelWidth={55}
                                    type='number'
                                    onChange={this.changeIncome}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <TextField id="outlined-basic" label="Federal Percentage" value={this.state.federal} variant="outlined" type='number' onChange={this.changeFederal} />
                        </Grid>
                        <Grid item xs>
                            <TextField id="outlined-basic" label="State Percentage" value={this.state.state} variant="outlined" type='number' onChange={this.changeState} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>

                        </Grid>
                        <Grid item xs>
                            <Chart options={this.state.options} series={this.state.series} type="pie" width="400" />
                        </Grid>
                        <Grid item xs className='total'>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={35}
                                    readOnly={true}
                                    value={this.state.takehome}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <Button  onClick={this.calculateTakehome}> Calculate </Button>
                            <Button  onClick={this.saveTaxes}> Save </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default Taxes;