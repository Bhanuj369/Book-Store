import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import '../App.css'

const renderField = ({ input, label, value, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} value={value} type={type}/><br/>
      {touched && ((error && <span className="errormessage text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
 

const validate = values => {
  const errors = {}
  if (!values.Category) {
    errors.Category = 'Required'
  }
  return errors
}


const AddCategories = (props) => {

  const [category, setCategory] = useState('')

  const postData = async () => {
    let result = await fetch('http://localhost:4600/api/categories/post', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            category: category
        })
    },
    alert('Category Added Successfully')
    );
    console.log(result)
}


const categoryChange = event => {
event.preventDefault()
setCategory(event.target.value)
}


  return (
    <div>
    <div className="text-left mt-4">
    <a href="/LoginPage/admin">&#60; Back to All Books</a>
    </div>
    <form className="px-4 py-3">
      <h3 className="nav-brand mb-4 font-italic font-weight-bold text-warning">Please mention a new category</h3>
    <div className="form-group">
        <Field name="category" type="text" id="category" value="" className="text-lg display-2" component={renderField} label="Category" onChange={categoryChange} />
    </div>
    <br /><button type="submit"  className="btn btn-primary pl-4 pr-4 mr-5" onClick={postData} ><p className="h4">Submit</p></button>
    </form>
    </div>
  )
}


export default reduxForm({
  form: 'AddCategoriess',
  validate,
})(AddCategories)