import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Register() {
  const [form, setForm] = useState({ name: '', username: '', password: '', email: '' })
  const [error, setError] = useState(null)
  const [errorname, setErrorname] = useState(null)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/api', form)
      .then(res => {
        setError(null)
        localStorage.setItem('user', JSON.stringify(res.data))
        window.location.href = '/home'
      })
      .catch(error => {
        if (error.response?.data?.errors) {
          setError(error.response.data.errors.email || error.response.data.errors.username || error.response.data.errors.password)
          setErrorname(error.response.data.errors.name)
        }
      })
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      window.location.href = '/home'
    }
  }, [])

  return (
    <>
      <Header />
      <div className="form-signin w-50 m-auto my-5">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating my-3">
            <input type="text" name="name" onChange={handleChange} className="form-control" placeholder="Name" />
            <label htmlFor="floatingname">Name</label>
          </div>
          {errorname && <div className="alert alert-danger">{errorname.msg}</div>}

          <div className="form-floating my-3">
            <input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Email" />
            <label htmlFor="floatingEMAIL">Email</label>
          </div>

          <div className="form-floating my-3">
            <input type="text" name="username" onChange={handleChange} className="form-control" placeholder="Username" />
            <label htmlFor="floatingInput">Set your Username</label>
          </div>

          <div className="form-floating my-3">
            <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {error && <div className="alert alert-danger">{error.msg}</div>}

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default Register
