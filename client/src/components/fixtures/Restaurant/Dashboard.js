import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import './styles/Dashboard.css'
import axios from 'axios';

import SelectBox from '../../inputs/SelectBox';

    // const data2 = [
    //   { name: 'deephouse', value: 200 },
    //   { name: 'Dks', value: 50 },
    //   { name: 'Shades', value: 150 },
    //   { name: 'Sketch', value: 400 },
    //   { name: '360', value: 200 }
    // ];

    // const data = [
    //   { name: 'Unregisted', value: 600 },
    //   { name: 'active', value: 250 },
    //   { name: 'inactive', value: 150 }
    // ];

    // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884d8', '#FF8042'];


    // const RADIAN = Math.PI / 180;

    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    // const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //   return (
    //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //       {"${(percent * 100).toFixed(0)}%"}
    //     </text>
    //   );
    // };
  axios.defaults.withCredentials = true;
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        result:[],
        TotalPrice:0,
        TotalOrder:0,
        p:"",
        res:"",
        sum:"",
        lessOrderMonthResult:[],
        mostOrderMonthResult:[],
        orderNumber:"",


        lessMonth:[
          "All",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        mostMonth:[
          "All",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        selectedLessOrderMonth:"All",
        selectedLessOrderMonthIndex: "0",

        selectedMostOrderMonth:"All",
        selectedMostOrderMonthIndex: "0",
      }
      this.getLessOrder = this.getLessOrder.bind(this);
      this.lessOrderMonthSelected = this.lessOrderMonthSelected.bind(this);

      this.getMostOrder = this.getMostOrder.bind(this);
      this.mostOrderMonthSelected = this.mostOrderMonthSelected.bind(this);

    }
    lessOrderMonthSelected(value, i) {
      this.getLessOrder(value);
      this.setState({ selectedLessOrderMonth: value });
      this.setState({ selectedLessOrderMonthIndex: i });
    }
    mostOrderMonthSelected(value, i) {
      this.getMostOrder(value,i);
      this.setState({ selectedMostOrderMonth: value });
      this.setState({ selectedMostOrderMonthIndex: i });
    }
    getLessOrder(lessMonth = null){
     let index = this.state.lessMonth.findIndex(el => el === lessMonth);
     let api = "http://localhost:3001/Order/getLessOrder"
     let  fData = {
       index: index
     }
     axios.post(api,fData).then((resp)=>{
       this.setState({lessOrderMonthResult:resp.data});
     })     
      
  }

  getMostOrder(mostMonth = null){
    let index = this.state.mostMonth.findIndex(el => el === mostMonth);
    let api = "http://localhost:3001/Order/getMostOrder"
    let  fData = {
      index: index
    }
    axios.post(api,fData).then((resp)=>{
      this.setState({mostOrderMonthResult:resp.data});
    })   
   
}

    handleDiscountChange = (event) => {
      this.setState({p: event.target.value})
  }

  componentDidMount(){

    axios.get("http://localhost:3001/RestaurantEnter/login").then((response)=>{
      if(response.data.loggedIn === true){
      }
      else {
        window.location.href = "/entry"
      }
  })

  axios.get("http://localhost:3001/Order/getTotalPrice").then(resp =>{
    this.setState({result:resp.data},()=>this.state.result.map(()=>{
    this.setState(prevState=>{ return{TotalOrder:prevState.TotalOrder + 1}})      
    }))  
  })
}

  render() {
    return (
      <div>
        <div className="restaurant-pieChart-container">
          <div className="restaurant-pieChart-test1">
            <div className="restaurant-pieChart-header">
              <h4> Monthly Less Ordered Products</h4>
              <SelectBox
                items={this.state.lessMonth}
                placeholder="Select Month"
                selectedIndex={this.state.selectedLessOrderMonthIndex}
                onValueSelected={this.lessOrderMonthSelected}
              />
            </div>
            <table className="restaurant-dashboard-table">
              <tr>
                <th>PRODUCTS</th>
                <th>ORDERS</th>
              </tr>
              {this.state.lessOrderMonthResult.map((val) => {
                return (
                  <tr>
                    <td>{val.ProductName}</td>
                    <td>{val.total}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="restaurant-pieChart-test2">
            <div className="restaurant-pieChart-header">
              <h4> Monthly Most Ordered Products</h4>
              <SelectBox
                items={this.state.mostMonth}
                placeholder="Select Month"
                selectedIndex={this.state.selectedMostOrderMonthIndex}
                onValueSelected={this.mostOrderMonthSelected}
              />
            </div>
            <table className="restaurant-dashboard-table">
              <tr>
                <th>PRODUCTS</th>
                <th>ORDERS</th>
              </tr>
              {this.state.mostOrderMonthResult.map((val) => {
                return (
                  <tr>
                    <td>{val.ProductName}</td>
                    <td>{val.total}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div className="restaurant-counts-container">
          <div className="restaurant-box1">
            <input
              className="profit"
              type="number"
              placeholder="Profit percentage"
              onChange={this.handleDiscountChange}
            />
            <span>Total Sales Profit </span>
            <span>{(this.state.p * this.state.sum) / 100} SYP</span>
            <span>
              <i class="fa fa-dollar"></i>
            </span>
          </div>
          <div className="restaurant-box2">
            <span>Total Sales</span>
            <span>
              {
                (this.state.sum =
                  this.state.result &&
                  this.state.result.reduce((a, v) => a + v.TotalPrice, 0))
              }{" "}
              SYP
            </span>
            <span>
              <i class="fa fa-money"></i>
            </span>
          </div>
          <div className="restaurant-box3">
            <span>Total Orders</span>

            <span>{this.state.TotalOrder}</span>

            <span>
              <i class="bi bi-journals"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard