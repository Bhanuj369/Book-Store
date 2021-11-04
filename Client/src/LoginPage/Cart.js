import React from 'react';
import '../App.css'
import {useHistory} from 'react-router-dom'

export default function Cart({ cart, setCart, user }) {
  
  let history = useHistory(); 
  
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


  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.title === product.title
    ).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };

  const ProceedPayment = () => {
    for(var i=0; i<cart.length; i++){
    fetch('http://localhost:4600/api/cart/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(
        {
        title: cart[i].title,
        isbn: cart[i].isbn,
        pageCount: cart[i].pageCount,
        price: cart[i].price,
        Url: cart[i].Url,
        shortDescription: cart[i].shortDescription,
        author: cart[i].author,
        category: cart[i].category,
        quantity: cart[i].quantity  
      })
    });
  }
    console.log(cart);

    history.push(`/PaymentPage/${user.username}`);
  }


  return (
    <div>
      <h1>Cart</h1>
      <div className="products">
    
    
    
<ul className="books col-lg-8">
{cart.map((repo) => (
    <li className="product border-danger" key={repo._id}>
        <div className="book container">
        <img className="book-image cart-image mb-n4" src={repo.Url} alt={repo.title}/>
        <p><h2 className="book-title cart-title mt-n4">{repo.title} </h2>(Price: ${repo.price})</p>
        <label htmlFor="quantity" className="text-primary">Quantity:</label>
        <input type="number" id="quantity" list="quantity" min="1" value={repo.quantity} onChange={(e) => setQuantity(repo, parseInt(e.target.value))}/>
          <div className="book-price">Total Price: ${repo.price * repo.quantity}</div>
      <button onClick={() => removeFromCart(repo)} className="btn btn-danger mt-1"><p className="h4 pn-3">Remove</p></button>
      </div>
    </li>
  ))}
</ul>
      <div className=""></div>
      <div className="container p-4 card col-lg-3">
      <div className="card-item mb-4">Total items in cart: {getCartTotal()}  </div>
      <div className="card-item mb-4">Total Cost: ${getTotalSum()}</div>  
        {cart.length > 0 && (
          <button className="btn btn-danger mb-3" onClick={clearCart}><p className="h4">Clear Cart</p></button>
        )}  
        {cart.length > 0 && (
        <button className="btn btn-warning" onClick={ProceedPayment}><p className="h4">Proceed to Pay</p></button>
        )}
      </div>
      </div>
    </div>
  );
}
