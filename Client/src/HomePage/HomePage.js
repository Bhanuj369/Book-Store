import React, {useState, useEffect} from 'react'
import { Field, reduxForm } from 'redux-form'
import {useHistory} from "react-router-dom";
import '../App.css' 


const renderField = ({ input, id, label, value, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <label htmlFor={id}>{label}</label>
      <input value={value} {...input} className="form-control" placeholder={label} type={type}/><br/>
      {touched && ((error && <span className="errormessage text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } 
  return errors
}



const SyncValidationForm = (props) => {
  const { valid, submitting } = props
  let history = useHistory();

  const [jusername, setJusername] = useState({})
  const [jpassword, setJpassword] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [, setCatch] = useState('')

  async function fetchData() {
    const res = await fetch(`http://localhost:4600/api/users/get/${username}`);
    res
      .json()
      .then(res => {
        setJusername(res.users.username)
        setJpassword(res.users.password)
      }).catch(e => setCatch(e))
  }


 const usernameChange = event => {
  setUsername(event.target.value)
  }
  const passwordChange = event => {
  setPassword(event.target.value)
  }

  const authHandle = async (e) => {
    e.preventDefault();
    
    if(username === undefined) {
      setError("User not present")
    }
    else if(username !== jusername) {
      setError("User not present")
    }
    else if(username === jusername && password === jpassword) {
      setError(null)
      history.push('/LoginPage/' + username)
  }
  else  {
    setError('Incorrect password')
  }
  }

  useEffect(() => {
    fetchData();
  });


  return (
    <div className="container col-lg-6 mt-5">
  <form className="px-4 py-3">
      <h3 className="nav-brand mb-4 font-italic font-weight-bold text-warning">Please provide your login Credentials</h3>
    <div className="form-group">
        <Field name="username" type="text" id="username" value="User Name" className="text-lg display-2" component={renderField} label="Username" onChange={usernameChange} />
    </div>
    <div className="form-group">
      <Field name="password" type="password" id="password" value="Password" component={renderField} label="Password" onChange={passwordChange} />
    </div>
    <br /><button type="submit"  className="btn btn-primary pl-4 pr-4" onClick={authHandle} disabled={(!valid) || submitting} ><p className="h4">Submit</p></button>
    <p className="errormessage text-danger"> {error} </p>
    </form>
  <div className="dropdown-divider"></div>
      <p>New user then, <button type="button" className="btn btn-info" onClick={() => {history.push('/SignUpPage')} }>Sign Up</button> !!</p>
</div>
  )
}

export default reduxForm({
  form: 'syncValidation',
  validate,
})(SyncValidationForm)