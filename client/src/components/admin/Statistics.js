import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import './styles/Statistics.css'
import Cookies from '../assitance-methods/Cookies';
import getHost from '../assitance-methods/getHost';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#8884d8', '#FF8042', '#006666', '#993366', '#6600ff', '#ff66cc', '#99ffcc'];
const CLASS = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9', 'color-10'];
const RADIAN = Math.PI / 180;

class Statistics extends Component {

  state = {
    usersData: [],
    restData: [],
    userCounter: '',
    orderCounter: ''
  }

  componentDidMount = () => {

    if(!Cookies.get("id")){
        window.location.href = "http://localhost:3000/"
    }
    else{
      this.getUsersData();
      this.getRestData();
    }
  }

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  getUsersData = () => {
    axios.get(`${getHost()}/api/admin/stat/users`).then( res => {
        let data = [
          { name: 'Unregisted', value:  res.data.unRegistered},
          { name: 'active', value: res.data.active },
          { name: 'inactive', value: res.data.inactive }
        ]
        this.setState({ 
          usersData: data,
          userCounter: res.data.userCounter
        })

      }).catch( err => {
        console.log(err)
      })
  }

  getRestData = () => {
    axios.get(`${getHost()}/api/admin/stat/rest`).then( res => {
      let data = [] = res.data.restData;
      this.setState({ 
        restData: data,
        orderCounter: res.data.orderCounter })
    }).catch( err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <div className="admin-pieChart-header">
          <div>
            <h3> Users Status</h3>
          </div>
          <div>
            <h3> Most Ordered Restaurants </h3>
          </div>
        </div>
        <div className="admin-pieChart-container">
          
          <div>
            <PieChart width={400} height={500} className="admin-pieChart">
              <Pie data={this.state.usersData} cx="50%" cy="50%" labelLine={false} label={this.renderCustomizedLabel} outerRadius={130} fill="#8884d8" dataKey="value" >
                {this.state.usersData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
              </Pie>
            </PieChart>
            <div className="admin-pieChart-clarification">
              <ul>
                <li className="admin-list-item-1">Unregistered users</li>
                <li className="admin-list-item-2">Recently active users</li>
                <li className="admin-list-item-3">Recently inactive users</li>
              </ul>
            </div>
          </div>

          <div>
            <PieChart width={400} height={500} className="admin-pieChart">
              <Pie data={this.state.restData} cx="50%" cy="50%" labelLine={false} label={this.renderCustomizedLabel} outerRadius={130} fill="#8884d8" dataKey="value" >
                {this.state.restData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
              </Pie>
            </PieChart>
            <div className="admin-pieChart-clarification">
              <ul>
                {
                  this.state.restData.map((item, index) => {
                    return(
                        <li className={'admin-'+CLASS[index % COLORS.length]}>{item.name}</li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>

        <div className="admin-counts-container">
          <div className="admin-box1">
            <span>Users <br/> {this.state.userCounter} </span>
            <span><i class="bi bi-people-fill"></i></span>
          </div>
          <div className="admin-box2">
            <span>Restaurants <br/> {this.state.restData.length} </span>
            <span><i class="bi bi-shop-window"></i></span>
          </div>
          <div className="admin-box3">
            <span>Orders <br/> {this.state.orderCounter}</span>
            <span><i class="bi bi-journals"></i></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics