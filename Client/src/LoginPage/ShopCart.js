import React, { useState, useEffect } from 'react';
import '../App.css';
import Products from './Products';
import Cart from './Cart';
import { useHistory } from 'react-router-dom';

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';
const ADMIN = 'admin'

function ShopCart(props) {
    
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(PAGE_PRODUCTS);


    useEffect(() => {
      const apiUrl = `http://localhost:4600/api/users/get/${props.match.params.user}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((repos) => {
          setUser(repos.users);
        });
        checkAdmin();
    })


  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  let history = useHistory();

  const checkAdmin = () => {
     if(user.username === ADMIN) {
          setAdmin(true);
     }  
   }


  return (
    <div className="App">
      <header>
        <p className="text-right text-primary h3 mb-n5"> 
            Hello {user.firstname} {user.lastname} !! &nbsp;&nbsp;  
            <button type = "button" className="btn btn-warning h4 mt-n4 lgout" onClick={()=>{history.push('/')}}>Log Out</button>&nbsp;&nbsp; 
        </p>
      </header>
      {page === PAGE_PRODUCTS && (
           <>
           <p className="text-left mt-n5 cbutton">
                <button onClick={() => navigateTo(PAGE_CART)} className="btn btn-primary cbbutton ml-3">Go to Cart ({getCartTotal()})</button>
                &nbsp;&nbsp;{admin && (
                <div className="cbbutton">
                 <div className="dropdown show"> 
                 <button className="btn btn-dark dropdown-toggle cbbutton mr-5" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Extras
                  </button>
                <button className="btn btn-dark cbbutton" onClick={()=>{history.push('/AddBooks')}}>Add Books</button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/AddCategories">Add new Categories</a>
                    <a className="dropdown-item" href="/AddAuthors">Add new Authors</a>
                  </div>
                </div>
                <p className="text-muted h5 mt-3"> Go into the book for more options..</p> 
                </div>
                )}
            </p>
        <Products cart={cart} setCart={setCart} user={user} />
        </>        
      )}
      {page === PAGE_CART && (
        <>
        <p className="text-left mt-n5 cbutton">
            <button onClick={() => navigateTo(PAGE_PRODUCTS)} className="btn btn-primary cbbutton">View Products</button>
        </p>
        <Cart cart={cart} setCart={setCart} user={user} />
        </>
      )}
    </div>
  );
}

export default ShopCart;
