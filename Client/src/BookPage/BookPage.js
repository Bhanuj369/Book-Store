import React, { useEffect, useState } from 'react';
import List from './List';
import withListLoading from './WithListLoading';
import {useHistory} from 'react-router-dom';
function LoginPage(props) {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });


  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://localhost:4600/api/books/get/${props.match.params.id}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos.books });
      });
  }, [setAppState]);



  let history = useHistory();
  
  
  return (
    <div className='App'>
        <p className="text-right text-primary h3">  
          <button type = "button" className="btn btn-warning h4 mt-n4 lgout" onClick={()=>{history.push('/')}}>Log Out</button>&nbsp;&nbsp; 
        </p>  
      <div className="text-left">
        <a href="#" onClick={() => history.goBack()}>&#60; Back to All Books</a>
      </div>
      <div className='container'>
        <h1>My Books</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  );
}
export default LoginPage;
