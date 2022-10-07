import React,{Component} from 'react'
import DefaultButton from '../../inputs/DefaultButton'
import { NavLink, withRouter } from "react-router-dom"
import "./styles/OrderDetail.css"
import MessageBox from "../../alerts/MessageBox";
import axios from 'axios';
import ViewOrder from './ViewOrder';
import ReactDOM from "react-dom";
import getHost from '../../assitance-methods/getHost';
class OrderDetail extends Component {
    constructor(props) {
        super(props)
       

        this.state = {
            result:[],
            description:"",
            ProductResult:[],
            restName:"",
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "yes-no",
            currentDangerAction: "",
            MessageStatus:"",
            Status:"",
            
        }
        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
    }
    onClickAcceptOrder = async e =>{
      this.setState({ isMessageBoxOpen: "true" });
      this.setState({ messageBoxTitle: "Order Acception" });
      this.setState({
        messageBoxDescription:
          "Are you sure you want to accept this order ?",
      });
      this.setState({ currentDangerAction: "accept" });
    }

    onClickRejectOrder = () => {
      this.setState({ isMessageBoxOpen: "true" });
      this.setState({ messageBoxTitle: "Order Rejection" });
      this.setState({
        messageBoxDescription:
          "Are you sure you want to reject this order ?",
      });
      this.setState({ currentDangerAction: "reject" }); 
    }
    
    onClickDelivered = () => {
      this.setState({ isMessageBoxOpen: "true" });
      this.setState({ messageBoxTitle: "Order Deliverization" });
      this.setState({
        messageBoxDescription:
          "Are you sure that the order is delivered ?",
      });
      this.setState({ currentDangerAction: "delivered" });
    }
    messageBoxValueSelected(value) {
        if (value === "Yes") {
          let action = this.state.currentDangerAction;
          if (action === "reject")
          {
            this.state.Status = "rejected";
            this.state.description = `your order has been rejected from: ${this.state.restName}`
            let params = this.props.match.params
            let ido=params.ido;      
            let idcu = params.idcu;
            const formData = new FormData();
            formData.append('Status',this.state.Status);
            formData.append('description',this.state.description);
            axios.put(`${getHost()}/Order/OrderStatus/${ido}`,formData)
            axios.post(`${getHost()}/Notification/insertOrderStatus/${idcu}`,formData)
            window.location.href="/restaurant_admin/order"
          }
          else if(action === "accept"){
            this.state.Status = "active";
            let params = this.props.match.params;
            let ido=params.ido;
            let idcu = params.idcu;
            const formData = new FormData();
            this.state.description = `your order has been accepted from: ${this.state.restName}, and your order ID is :${ido}`
            formData.append('description',this.state.description);
            formData.append('Status',this.state.Status);
            axios.put(`${getHost()}/Order/OrderStatus/${ido}`,formData)
            axios.post(`${getHost()}/Notification/insertOrderStatus/${idcu}`,formData)
         
            window.location.href="/restaurant_admin/order"
          } 
          else if(action === "delivered"){

            this.state.Status = "delivered";
            let params = this.props.match.params
            let ido=params.ido;      
            let idcu = params.idcu;
            const formData = new FormData();
            this.state.description = `your order has been delivered from: ${this.state.restName}`
            formData.append('description',this.state.description);
            formData.append('Status',this.state.Status);
            axios.put(`${getHost()}/Order/OrderStatus/${ido}`,formData)
            axios.post(`${getHost()}/Notification/insertOrderStatus/${idcu}`,formData)

            window.location.href="/restaurant_admin/order"
          }
       
      }
      else
          {
            this.setState({ isMessageBoxOpen: "false" });
          }
    }
      componentDidMount(){
        axios.get("http://localhost:3001/RestaurantEnter/login").then((response)=>{
          if(response.data.loggedIn === true){
          }
          else {
            window.location.href = "/entry"
          }
      })

        let params = this.props.match.params
        let ido=params.ido;
      axios.get(`${getHost()}/Order/getOrder_Detail/${ido}`).then(resp =>{
        this.setState({result:resp.data.result,restName:resp.data.restName})
      })
      axios.get(`${getHost()}/Order/Product_Name/${ido}`).then(resp =>{
        this.setState({ProductResult:resp.data})
      })
      
    }
    render() {
        return (
    <div>
         {this.state.result.map((val)=>{
                                return(
            <div className="background_order">
            <div className="card_order_detail_1">
                <h3>Order Details</h3>
            <div className="card_order_detail_2 ">
             
                    <table className="order_detail_table">      
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product Amount</th>
                                </tr> 
                                {this.state.ProductResult.map((val)=>{
                                return(
                                 <tr>
                                    <td>{val.ProductName}</td>
                                    <td>{val.Price}</td>
                                    <td>{val.Amount}</td>
                                </tr>
                                )
                                 })}
                            </table>
            </div>
            
                <div className="card_total_price">
                    <h5>Total Price</h5>
                    <h5 className="total_price">{val.TotalPrice}</h5>
                    
                </div>
                <div className="card_note">
                    <h5>Notes:</h5>
                    <p>{val.Note}</p>
                </div>
                <div className="order-status">
                <td><DefaultButton text="Reject" style={{background:"var(--error-color)" , border:"1px solid var(--error-color)"}} onClick={this.onClickRejectOrder}/></td>
                <td><DefaultButton text="Accept" style={{background:"#2196f3" , border:"1px solid #2196f3"}}  onClick={this.onClickAcceptOrder}/></td>
                <td><DefaultButton text="Delivered" style={{background:"#4CAF50" , border:"1px solid #4CAF50"}}  onClick={this.onClickDelivered}/></td>

                </div>
      </div>
        
      </div>
    )
  })}
    <MessageBox
                    title={this.state.messageBoxTitle}
                    description={this.state.messageBoxDescription}
                    controls={this.state.messageBoxControls}
                    type="warning"
                    isOpen={this.state.isMessageBoxOpen}
                    onValueSelected={this.messageBoxValueSelected}
            />
    </div>
        );
    }
}

export default OrderDetail