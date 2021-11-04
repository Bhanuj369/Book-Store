import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import '../App.css';




const OrderPlaced = (props) => {

    let history = useHistory();
    const [cart, setCart] = useState([])
    const [user, setUser] = useState([])
    const [orderNumber] =  useState(Math.floor(100000 + Math.random() * 900000))
    let today = new Date()
    let delivery = new Date()+7
    const date =  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const deliveryDate =  (delivery.getDate()) + '-' + (delivery.getMonth() + 1) + '-' + delivery.getFullYear();

  
    useEffect(() => {
        const apiUrl = `http://localhost:4600/api/users/get/${props.match.params.username}`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((repos) => {
            setUser(repos.users);
          });
      })
      useEffect(() => {
        const apiUrl = `http://localhost:4600/api/cart/get`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((repos) => {
            setCart(repos.cart);
          });
      })

      const getTotalSum = () => {
        return cart.reduce(
          (sum, { price, quantity }) => sum + price * quantity,
          0
        );
      };
    
      const getCartTotal = () => {
        return cart.reduce(
          (sum, { quantity }) => sum + quantity,
          0
        );
      };
    


    const ReturnHome = async () => {
        await fetch('http://localhost:4600/api/cart/delete', { method: 'delete' }
        );
        history.push(`/LoginPage/${props.match.params.username}`)
    }

    return(
        <div className="container mt-5"> 
            <h1 className="text-center text-success font-weight-bold font-italic order-placed text-underline">
                <u>Order Placed Succesfully</u> &nbsp;
                <i className="fa fa-check-circle"></i> 
            </h1>
            <p className="text-muted text-center mt-5"> Your order will be Processed {user.firstname}, Here are the details... </p><a href="#" className="text-muted print">print<i className="fa fa-print"></i></a> <hr />
            <table className="order-table table border-0">
                <tbody>
                <tr>
                <td className="border-0 td-left"><b>Order Details will be sent to:</b></td> <td className="border-0">&nbsp;{user.email_id}</td> 
                </tr>
                <tr>
                <td className="border-0 td-left"><b>Order Number:</b></td> <td className="border-0">&nbsp;{orderNumber}</td>
                </tr>
                <tr>
                <td className="border-0 td-left"><b>Order Date:</b></td> <td className="border-0">&nbsp;{date} </td>
                </tr>
                <tr>
                <td className="border-0 td-left"><b>Estimated Delivery Date:</b></td> <td className="border-0">&nbsp;7 days from ordered date (<b>{deliveryDate}</b>)</td>
                </tr>
                </tbody>
            </table>
            <hr />

            <div className="products">
            <h1><b>Books ordered are: </b></h1>
            <ul className="books">
                {cart.map((repo) => (
                    <li className="product border-success" key={repo._id}>
                    <div className="book container">
                    <img className="book-image cart-image mb-n4" src={repo.Url} alt="book"/>
                    <p><h2 className="book-title cart-title mt-n4">{repo.title} </h2>(Price: ${repo.price})</p>
                    <p>Quantity: {repo.quantity} </p>
                    <div className="book-price">Total Price: ${repo.price * repo.quantity}</div>
                    </div>
                    </li>
                ))}
                <hr />
            </ul> 
            
            <h2>Total Number of items in the cart are: <b>{getCartTotal()}</b> </h2> <br />
            <h2>Total Price of items in the cart is: <b>$ {getTotalSum()}</b> </h2> <br />

            <button className="btn btn-success mb-5" onClick={ReturnHome}><p className="h4">Return to home Screen</p></button>               
            </div>
            <hr />


        </div>

        )
}




export default OrderPlaced;