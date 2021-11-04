import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import {useHistory} from "react-router-dom";
import '../App.css'

const renderField = ({ input, label, value, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} value={value} type={type} className="form-control" /><br/>
      {touched && ((error && <span className="errormessage text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


const validate = values => {
  const errors = {}
  if (!values.FirstName) {
    errors.FirstName = 'Required'
  }
  if (!values.LastName) {
    errors.LastName = 'Required'
  }
  if (!values.Email) {
    errors.Email = 'Required'
  }
  else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(values.Email)) {
      errors.Email = 'Please Enter a valid Email'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } 
  if (!values.ConfirmPassword) {
    errors.ConfirmPassword = 'Required'
  } 
  else if (values.ConfirmPassword !== values.password) {
    errors.ConfirmPassword = 'Passwords does not match'
  } 
  return errors
}


const SignUpPage = (props) => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email_id, setEmail_id] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();

  const postData = async () => {
    let result = await fetch('http://localhost:4600/api/users/post', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email_id: email_id,
            username: username,
            password: password
        })
    },
    alert('User Registration Successful'),
   history.push('/LoginPage/'+username));
    console.log(result)

}

const firstNameChange = event => {
event.preventDefault()
setFirstname(event.target.value)
}
const lastNameChange = event => {
event.preventDefault()
setLastname(event.target.value)
}
const email_idChange = event => {
event.preventDefault()
setEmail_id(event.target.value)
}
const userNameChange = event => {
event.preventDefault()
setUsername(event.target.value)
}
const passwordChange = event => {
event.preventDefault()
setPassword(event.target.value)
}


  const { valid, submitting } = props
  return (
    <>
    <div className="text-left mt-4">
    <a href="/">&#60; Back to Login Screen</a>
    </div>
    <div className="container col-lg-6 mt-1">
    <div>
    <form className="px-4 py-3">
      <h3 className="nav-brand mb-4 font-italic font-weight-bold text-warning">Please provide your login Credentials</h3>
      <div className="form-group">
      <Field name="FirstName" type="text" component={renderField} onChange={firstNameChange}  label="First Name"/>
      </div>
      <div className="form-group">
      <Field name="LastName" type="text" component={renderField} onChange={lastNameChange} label="Last Name"/>
      </div>
      <div className="form-group">
      <Field name="Email" type="text" component={renderField} onChange={email_idChange} label="Email Id"/>
      </div>
      <div className="form-group">
      <Field name="username" type="text" component={renderField} onChange={userNameChange} label="Username"/>
      </div>
      <div className="form-group">
      <Field name="password" type="password" component={renderField} onChange={passwordChange} label="Password"/>
      </div>
      <div className="form-group">
      <Field name="ConfirmPassword" type="password" component={renderField}  label="Confirm Password"/>
      </div>
      <div className="mb-5">
        <button type="submit" className="btn btn-primary mb-5" onClick={postData} disabled={(!valid) || submitting} ><p className="h4">Submit</p> </button>
      </div>
      </form>
      </div>
    </div>
    </>
  )
}


export default reduxForm({
  form: 'signUpPage',
  validate,
})(SignUpPage)