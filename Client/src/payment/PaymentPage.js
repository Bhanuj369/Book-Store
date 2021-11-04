import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import '../App.css'



const PaymentPage = (props) => {

    let history = useHistory();
    const [card, setCard] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const PaymentFinish = () => {
      if( card !== '' && expiry !== '' && cvv !== '' ) {
        history.push(`/OrderPlaced/${props.match.params.username}`);
      }
      else {
        alert('PLease fill all of the card Details');
      }
    }

  return (
    <div>
    <h1><strong className="display-3 shadow-sm text-success">RazorPay Secured Platform</strong></h1>
    <div className="mt-5 payment">
      <div className="container">
      <div className="row">
      <div className="col-lg-6">
      <div className="panel panel-default credit-card-box">
      <div className="panel-heading display-table" >
      <div className="row display-tr" >
        <h3 className="panel-title display-td" >Payment Details</h3>
        <div className="display-td" >                            
          <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png" alt="Payment"/>
        </div>
      </div>                    
      </div>
      <div className="panel-body">
      <form id="payment-form">
        <div className="row">
        <div className="col-xs-12">
        <div className="form-group">
        <label for="cardNumber">CARD NUMBER</label>
        <div className="input-group">
        <input 
        type="tel"
        className="form-control"
        name="cardNumber"
        placeholder="Valid Card Number"
        onChange = {(e) => setCard(e.target.value)}
        autofocus 
        />
        <span className="input-group-addon"><i className="fa fa-credit-card mr-4 ml-n5 pr-4"></i></span>
        </div>
        </div>                            
        </div>
      </div>
      <div className="row">
      <div className="col-xs-7 col-md-7">
      <div className="form-group">
        <label for="cardExpiry"><span className="hidden-xs">EXPIRATION</span><span className="visible-xs-inline">EXP</span> DATE</label>
        <input 
        type="tel" 
        className="form-control" 
        name="cardExpiry"
        placeholder="MM / YY"
        onChange = {(e) => setExpiry(e.target.value)}
        />
      </div>
      </div>
      <div className="col-xs-5 col-md-5 pull-right">
      <div className="form-group">
        <label for="cardCVC">CVV CODE</label>
        <input 
        type="tel" 
        className="form-control"
        name="cardCVV"
        placeholder="CVV"
        onChange = {(e) => setCvv(e.target.value)}
        />
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-xs-12">
      <div className="form-group">
        <label for="couponCode">COUPON CODE<p className="text-muted font-weight-light">(*if applicable)</p></label>
        <input type="text" className="form-control" name="couponCode" />      
      </div>
      </div>                        
      </div>
      <div className="row">
      <div className="col-xs-12">
        <button className="btn btn-success btn-lg btn-block" type="button" onClick={PaymentFinish}>Make Payment</button>
        <button className="btn btn-danger btn-lg btn-block" type="button" onClick={() => history.goBack()}>Cancel Payment</button>
      </div>
      </div>
      <div className="row">
      <div className="col-xs-12">
        <p className="payment-errors"></p>
      </div>
      </div>
      </form>
      </div>
      </div>            
      </div>            
      </div>
      </div>
      </div>
      <p className="text-muted">You are in a secured page, Please proceed to make the payment.... </p>
      <p className="text-muted">(Please don't leave the screen or refresh the page. Wait for the payment to complete.) </p>
    </div>
  )
}


export default PaymentPage