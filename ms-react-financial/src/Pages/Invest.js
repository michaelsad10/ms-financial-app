import { Chart } from "react-google-charts"
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import '../Style/invest.css';


class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: '',
            principal: '',
            rate: '',
            years: '',
            balance: '',
            user_id: '',
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
    handlePrincipal = (e) => {
        if (e.target.value == '') {
            this.setState({ principal: '' })
        }
        else {
            this.setState({ principal: parseFloat(e.target.value) })
        }
    }

    handleRate = (e) => {
        if (e.target.value == '') {
            this.setState({ rate: '' })
        }
        else {
            this.setState({ rate: parseFloat(e.target.value) })
        }
    }

    handleYears = (e) => {
        if (e.target.value == '') {
            this.setState({ years: '' })
        }
        else {
            this.setState({ years: parseFloat(e.target.value) })
        }
    }

    calculateBalance = () => {
        var principal = this.state.principal;
        var rate = this.state.rate;
        var compound = 1;
        var years = this.state.years;
        var balance = 0;
        var A = 0;
        A = principal * Math.pow((1 + (rate / 100)), years);
        balance = A;
        this.setState({ balance: balance })
    }

    saveBalance = () => {
        var obj = {
            principal: this.state.principal,
            rate: this.state.rate,
            years: this.state.years,
            balance: this.state.balance,
            user_id: this.state.user_id,
        }
        axios.post(`https://msad-api.herokuapp.com/investments`, obj).then(res => {
        })
    }

    componentDidMount() {
        var id = this.props['location']['state']['id'];
        this.setState({
            user_id: id
        })
        axios.get(`https://msad-api.herokuapp.com/investments/${id}`).then(res => {
            if (res.data.status != 0) {
                this.setState({
                    principal: res.data.principal,
                    rate: res.data.rate,
                    years: res.data.years,
                    balance: res.data.balance
                })
            }
        })

        let months = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'June',
            '07': 'July',
            '08': 'Aug',
            '09': 'Sept',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
        };
        let option = [];
        let data = [];
        let stock = [];
        let stocks = ['MSFT', 'TSLA', 'AAPL', 'AMZN', 'GOOGL'];
        for (let i = 0; i < 4; i++) {
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stocks[i]}&apikey=67A1NUYAV1CVVB8A`)
                .then(res => {
                    let dates = Object.keys(res.data['Monthly Time Series']);
                    let labels = res.data['Monthly Time Series'];
                    stock.push(["Month", "Price"]);
                    for (var x = 12; x > 0; x--) {
                        var res = dates[x].split("-");
                        stock.push([months[res[1]] + " " + res[0], parseFloat(labels[dates[x]]['4. close'])])
                    }
                    data.push(stock); 
                    stock = [];
                    this.setState({ data: data });
                })
            var x = {
                title: stocks[i],
                curveType: "function",
                legend: { position: "bottom" }
            };
            option.push(x);
        }
        this.setState({ options: option })
    }
    render() {
        var stocks = [];
        for (var x = 0; x < 4; x++) {
            stocks.push(
                    <Grid className="graphs" item>
                        {this.state.data.length != 0 && this.state.options && (<Chart
                            chartType="LineChart"
                            width="100%"
                            height="600px"
                            data={this.state.data[x]}
                            options={this.state.options[x]}
                        />)}
                    </Grid>
            )
        }
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
                        <Button className="signout" onClick={this.signout}> Sign Out </Button>
                    </Toolbar>
                </AppBar>
                <Paper className="paperTitle">
                    <Grid container justify="center">
                        <Grid item>
                            <Typography variant="h4" gutterBottom> Compound Interest</Typography>
                        </Grid>
                        <Grid container justify="center">
                            <Grid className="grid-item" item xs>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Principal</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        value={this.state.principal}
                                        labelWidth={65}
                                        type='number'
                                        onChange={this.handlePrincipal}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid className="grid-item" item xs>
                                <TextField id="outlined-basic" label="Rate" value={this.state.rate} onChange={this.handleRate} variant="outlined" type='number' />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid className="grid-item" item xs>
                                <TextField id="outlined-basic" label="Years" value={this.state.years} onChange={this.handleYears} variant="outlined" type='number' />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid  className="grid-item" item xs>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Balance</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        value={this.state.balance}
                                        labelWidth={60}
                                        type='number'
                                        readOnly={true}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Button onClick={this.calculateBalance}> Calculate </Button>
                                <Button onClick={this.saveBalance}> Save </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid className="graph-container" container>
                {stocks}
                </Grid>
            </div>
        );
    }
}

export default Invest; 