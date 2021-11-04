import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import '../App.css'

const renderField = ({ input, label, value, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} value={value} type={type}/><br/>
      {touched && ((error && <span className="errormessage text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


 
const validate = values => {
  const errors = {}
  if (!values.Title) {
    errors.Title = 'Required'
  }
  if (!values.Isbn) {
    errors.Isbn = 'Required'
  }
  if (!values.PageCount) {
    errors.PageCount = 'Required'
  }
  if (!values.Price) {
    errors.Price = 'Required'
  }
  if (!values.Url) {
    errors.Url = 'Required'
  } 
  if (!values.ShortDescription) {
    errors.ShortDescription = 'Required'
  }
  if (!values.Author) {
    errors.Author = 'Required'
  } 
  if (!values.Category) {
    errors.Category = 'Required'
  } 
  return errors
}


const AddBooks = (props) => {

  const [categories, setCategories]= useState([])
  const [authors, setAuthors] = useState([])

    
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


  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [pageCount, setPageCount] = useState()
  const [price, setPrice] = useState()
  const [Url, setUrl] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')

  const postData = async () => {
    await fetch('http://localhost:4600/api/books/post', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            isbn: isbn,
            pageCount: pageCount,
            price: price,
            Url: Url,
            shortDescription: shortDescription,
            author: author,
            category: category
        })
    },
    alert('Book Added Successfully')
    );

}




const titleChange = event => {
event.preventDefault()
setTitle(event.target.value)
}
const isbnChange = event => {
event.preventDefault()
setIsbn(event.target.value)
}
const pageCountChange = event => {
event.preventDefault()
setPageCount(event.target.value)
}
const priceChange = event => {
event.preventDefault()
setPrice(event.target.value)
}
const UrlChange = event => {
event.preventDefault()
setUrl(event.target.value)
}
const shortDescriptionChange = event => {
event.preventDefault()
setShortDescription(event.target.value)
}
const authorChange = event => {
event.preventDefault()
setAuthor(event.target.value)
}
const categoryChange = event => {
event.preventDefault()
setCategory(event.target.value)
}


  const { valid, submitting } = props
  return (
    <>
    <div className="text-left mt-4">
    <a href="/LoginPage/admin">&#60; Back to All Books</a>
    </div>
    <div className="container col-lg-6 mt-5">
    <form>
      <h3 className="nav-brand mb-4 font-italic font-weight-bold text-warning">Please provide Book Details</h3>
      <div className="form-group">
      <Field name="Title" type="text" component={renderField} onChange={titleChange}  label="Title"/>
      </div>
      <div className="form-group">
      <Field name="Isbn" type="text" component={renderField} onChange={isbnChange} label="ISBN"/>
      </div>
      <div className="form-group">
      <Field name="PageCount" type="number" min="1" component={renderField} onChange={pageCountChange} label="Page Count"/>
      </div>
      <div className="form-group">
      <Field name="Price" type="number" min="0" component={renderField} onChange={priceChange} label="Price"/>
      </div>
      <div className="form-group">
      <Field name="Url" type="text" component={renderField} onChange={UrlChange} label="Image URL"/>
      </div>
      <div className="form-group">
      <Field name="ShortDescription" type="text" component={renderField} onChange={shortDescriptionChange} label="Short Description"/>
      </div>
      <div className="form-group">
        <label style={{marginBottom: 10}}>Select an Author</label>
        <select onChange={authorChange} className="form-control">
          {authors.map(({ label, value }) => (
          <option key={value} value={value}>
          {label}
          </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label style={{marginBottom: 10, marginTop: 10}}>Select a Category</label>
        <select onChange={categoryChange} className="form-control">
          {categories.map(({ label, value }) => (
          <option key={value} value={value}>
          {label}
          </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <button type="submit" className="btn btn-primary mb-5" onClick={postData} disabled={(!valid) || submitting}><p className="h4">Submit</p></button>&nbsp;&nbsp;&nbsp;
      </div>
      </form>
      </div>
      </>
  )
}


export default reduxForm({
  form: 'AddBooks',
  validate,
})(AddBooks)