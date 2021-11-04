import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const ADMIN = 'admin';

export default function Products({ setCart, cart, user }) {


  const [products, setAppState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [lcategory, setCategory] = useState('All');
  const [authors, setAuthors] = useState([]);
  const [lauthor, setLauthor] = useState('All');
  const [search, setSearch] = useState('');
  const [subSearch, setSubSearch] = useState('');
  const [admin, setAdmin] = useState(false);

    
  React.useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`http://localhost:4600/api/categories/get`);
      const body = await response.json();
      setCategories(body.categories.map(({ category }) => ({ label: category, value: category })));
    }
    getCharacters();
  }, []);

  React.useEffect(() => {
    async function getCharacters() {
      const response = await fetch(`http://localhost:4600/api/authors/get`);
      const body = await response.json();
      setAuthors(body.authors.map(({ author }) => ({ label: author, value: author })));
    }
    getCharacters();
  }, []);


  useEffect(() => {
    const apiUrl = `http://localhost:4600/api/books/get`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState(repos.books);
        setLoading(false)
      });
      checkAdmin();
  })

  const checkAdmin = () => {
    if(user.username === ADMIN) {
         setAdmin(true);
    }  
  }



  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.title === item.title
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };
 

  const categoryChange = event => {
    setCategory(event.target.value)
  }
  const authorChange = event => {
    setLauthor(event.target.value)
  }
  const searchChange = event => {
    setSearch(event.target.value) 
    if(search === '') {
      setSubSearch('')
    }
  }
  const searchSubmit = event => {
    event.preventDefault();
    setSubSearch(search)
  }



  const getProductsInCategory = () => {
    if(subSearch === '' || search === '') {
      if(lcategory === 'All' && lauthor === 'All') {
          return products
      }
      else if(lcategory === 'All' && lauthor !== 'All') {
        return products.filter(
            (product) => (product.author === lauthor)
        );
      }
      else if(lcategory !== 'All' && lauthor === 'All') {
        return products.filter(
            (product) => (product.category === lcategory)
        );
      }
      else {
          return products.filter(
              (product) => (product.category === lcategory && product.author === lauthor)
          );
      }
    }
    else {
      return products.filter(
          (product) => (product.title.toLowerCase() === subSearch.toLowerCase())
      );
    }
  };




  return (
    <div>
      <div className="categories">
      <label htmlFor="cateogries">Select a Category: &nbsp;</label>
      <select onChange={categoryChange}>
        {categories.map(({ label, value }) => (
        <option key={value} value={value}>
        {label}
        </option>
        ))}
      </select>
   
      <form onSubmit={searchSubmit} className="searchbar">
        <label htmlFor="search">Search by Title: &nbsp;</label>
        <input id="search" placeholder="search" onChange={searchChange} />&nbsp;
        <button className="btn btn-dark" type="submit"><i className="fa fa-search"></i></button>
      </form>

      <label htmlFor="authors">Select an Author: &nbsp;</label>
      <select onChange={authorChange}>
        {authors.map(({ label, value }) => (
        <option key={value} value={value}>
        {label}
        </option>
        ))}
      </select>
      </div>

          <hr />
  {loading ? (<h2>Fetching the data, Please wait!!</h2>) :
    (<ul className="books">
      {getProductsInCategory().map(repo =>   
      <li key={repo._id}>
        <div className="book container">
           { admin ? (<><Link to={'/book/'+repo.isbn}>
              <img className="book-image" src={repo.Url} alt={repo.title} />
            </Link>   
            <h2 className="book-title">
                <Link to={'/book/'+repo.isbn}>{repo.title}</Link>
            </h2></>) :
            (<><p>
            <img className="book-image" src={repo.Url} alt="book"/>
          </p>   
          <h3 className="book-title">
              <p>{repo.title}</p>
          </h3></>)
                }
            <div className="book-author muted">Written By: {repo.author}</div>
            <div className="book-price">Price: ${repo.price}</div>
            <div className="book-pages">Pages: {repo.pageCount}</div>
            <button className="btn btn-primary mt-3" onClick={() => addToCart(repo)} ><p className="h4 pn-3">Add to Cart</p></button>
        </div> 
    </li>)}
    </ul>) 
}
</div>
  );
}
