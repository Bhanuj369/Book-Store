import React from 'react';
import {useHistory} from 'react-router-dom';



const List = (props) => {

    const { repos } = props;

    let history = useHistory();

    const DeleteData = async () => {
        await fetch(`http://localhost:4600/api/books/delete/${repos.isbn}`, { method: 'delete' } );
        history.push(`/LoginPage/admin`)
    }

  if (!repos || repos.length === 0) return <p>No repos, sorry</p>;
  return (
    <div>
<div  className="details text-justify">
<div className="details-image">
    <img src={repos.Url} alt={repos.title}></img>
</div>
<div className="details-info">
    <ul>
        <li className="title">
            <h3>{repos.title}</h3>
            Written By: {repos.author}
        </li>
        <li>
            Price: <b>${repos.price}</b>
        </li>
        <li>
            Description:
            <li>
            <div className="font-weight-light">
                {repos.shortDescription}
            </div>
            </li>
        </li>
        <li>
            <button className="btn btn-danger" onClick={DeleteData}><p className="h4 pr-4 pl-4 pb-2"> Delete this Book</p></button>
        </li>
    </ul>
</div>
</div>
</div>

 
  );
};
export default List;
