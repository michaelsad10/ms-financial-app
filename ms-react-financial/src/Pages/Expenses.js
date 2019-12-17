import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chart from "react-apexcharts";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../Style/taxes.css';



import '../Style/Budget.css'
import { Divider } from '@material-ui/core';
import axios from 'axios';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            shopping: '',
            gas: '',
            food_drink: '',
            entertainment: '',
            bills: '',
            automotive: '',
            travel: '',
            total: 0,
            series: [0, 0, 0, 0, 0, 0, 0],
            chartOptions: {
                colors: ['#775dd0', '#008ffb', '#b1f57a', '#ff4560', '#feb019', '#ed05f5', '#7d05f5', '#05f5dd'],
                dataLabels: {
                    enabled: false,
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total'
                    }
                },
                labels: ['Shopping', 'Gas', 'Food And Drink', 'Entertainment', 'Bills', 'Automotive', 'Travel'],
            }
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
        this.setState({
            id: id
        })
        axios.get(`https://msad-api.herokuapp.com/expenses/${id}`).then(res => {
            if (res.data.status != 0) {
                var arr = [];
                arr[0] = res.data['shopping'];
                arr[1] = res.data['gas'];
                arr[2] = res.data['food_drink'];
                arr[3] = res.data['entertainment'];
                arr[4] = res.data['bills'];
                arr[5] = res.data['automotive'];
                arr[6] = res.data['travel'];
                this.setState({
                    total: res.data['total'],
                    series: arr,
                    shopping: arr[0],
                    gas: arr[1],
                    food_drink: arr[2],
                    entertainment: arr[3],
                    bills: arr[4],
                    automotive: arr[5],
                    travel: arr[6]
                })
                this.calculateTotal();
            }
        })
    }

    calculateTotal = () => {
        const data = this.state.series;
        let total = 0;
        for (var x = 0; x < data.length; x++) {
            total += data[x];
        }
        this.setState({ total: total })
    }

    saveData = () => {
        var obj = {
            'shopping': this.state.series[0],
            'gas': this.state.series[1],
            'food_drink': this.state.series[2],
            'entertainment': this.state.series[3],
            'bills': this.state.series[4],
            'automotive': this.state.series[5],
            'travel': this.state.series[6],
            'total': this.state.total,
            'user_id': this.state.id,
        }
        axios.post(`https://msad-api.herokuapp.com/expenses`, obj).then(res => {
        })
    }

    changeDonutValueBudget = (b, e) => {
        const newSeries = JSON.parse(JSON.stringify(this.state.series));
        var val = 0;
        switch (b) {
            case 's':
                if (e.target.value == '') {
                    newSeries[0] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[0] = val;
                }
                this.setState({
                    series: newSeries,
                    shopping: val,
                })
                break;
            case 'g':
                if (e.target.value == '') {
                    newSeries[1] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[1] = val;
                }
                this.setState({
                    series: newSeries,
                    gas: val
                })
                break;
            case 'f':
                if (e.target.value == '') {
                    newSeries[2] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[2] = val;
                }
                this.setState({
                    series: newSeries,
                    food_drink: val,
                })
                break;
            case 'e':
                if (e.target.value == '') {
                    newSeries[3] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[3] = val;
                }
                this.setState({
                    series: newSeries,
                    entertainment: val
                })
                break;
            case 'bill':
                if (e.target.value == '') {
                    newSeries[4] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[4] = val;
                }
                this.setState({
                    series: newSeries,
                    bills: val
                })
                break;
            case 'a':
                if (e.target.value == '') {
                    newSeries[5] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[5] = val;
                }
                this.setState({
                    series: newSeries,
                    automotive: val
                })
                break;
            case 't':
                if (e.target.value == '') {
                    newSeries[6] = 0;
                }
                else {
                    val = parseFloat(e.target.value);
                    newSeries[6] = val;
                }
                this.setState({
                    series: newSeries,
                    travel: val
                })
                break;
        }
    };

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
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h4" gutterBottom> Expenses </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Shopping</InputLabel>
                                <OutlinedInput
                                    type='number'
                                    value={this.state.shopping}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={70}
                                    onChange={(e) => this.changeDonutValueBudget('s', e)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Gas</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    value={this.state.gas}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={30}
                                    onChange={(e) => this.changeDonutValueBudget('g', e)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Food And Drink</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    value={this.state.food_drink}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={110}
                                    onChange={(e) => this.changeDonutValueBudget('f', e)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Entertainment</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={100}
                                    type="number"
                                    value={this.state.entertainment}
                                    onChange={(e) => this.changeDonutValueBudget('e', e)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Bills</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    value={this.state.bills}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={20}
                                    onChange={(e) => this.changeDonutValueBudget('bill', e)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Automotive</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    value={this.state.automotive}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={80}
                                    onChange={(e) => this.changeDonutValueBudget('a', e)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Travel</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    value={this.state.travel}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={45}
                                    onChange={(e) => this.changeDonutValueBudget('t', e)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs />
                        <Grid item xs />
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs />
                        <Grid item xs>
                            <Chart options={this.state.chartOptions} series={this.state.series} type="donut" width="400" />
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={35}
                                    readOnly={true}
                                    value={this.state.total}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs />
                        <Grid item xs />
                        <Grid item xs>
                            <Button onClick={this.calculateTotal}>Calculate</Button>
                            <Button onClick={this.saveData}>Save</Button>
                        </Grid>
                    </Grid>
                </Paper>
                {this.state.shopping}
            </div>

        );
    }
}

export default Expenses; 