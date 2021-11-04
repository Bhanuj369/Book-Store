import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import SyncValidationForm from './HomePage/HomePage';
import SignUpPage from './SignUpPage/SignUpPage';
import BookPage from './BookPage/BookPage';
import ShopCart from './LoginPage/ShopCart';
import AddBooks from './Admin/AddBooks';
import AddCategories from './Admin/AddCategories';
import AddAuthors from './Admin/AddAuthors';
import PaymentPage from './payment/PaymentPage';
import OrderPlaced from './payment/OrderPlaced';





class App extends React.Component {
    render() {
        return (
        <div className="App">
            <header className="header sticky-top">
                <span className="logo">Ebook Store <i className='fa fa-book'></i></span>
            </header>
            <div className="App container card border-0">
                <Router>
                    <Route path="/" exact component={SyncValidationForm} />
                    <Route path="/LoginPage/:user" component={ShopCart} />
                    <Route path="/SignUpPage" component={SignUpPage} /> 
                    <Route path="/book/:id" component={BookPage} />
                    <Route path="/AddBooks" component={AddBooks} />
                    <Route path="/AddCategories" component={AddCategories} />
                    <Route path="/AddAuthors" component={AddAuthors} />
                    <Route path="/PaymentPage/:username" component={PaymentPage} />
                    <Route path="/OrderPlaced/:username" component={OrderPlaced} />
                </Router> 
            </div>
            <footer className="footer sticky-footer">
                <p className="text-muted text-white mt-2"> All Copyrights reserved. <i className="fa fa-copyright"></i></p>
            </footer>
        </div>
        )
    }
}

export default App;


