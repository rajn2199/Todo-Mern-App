import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import axios from 'axios'

function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', form)
      .then(res => {
        setError(null)
        localStorage.setItem('user', JSON.stringify(res.data))
        window.location.href = '/home'
      })
      .catch(error => {
        if (error.response?.data?.message) {
          setError(error.response.data.message)
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
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating my-3">
            <input type="text" name="username" onChange={handleChange} className="form-control" placeholder="Username" />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating my-3">
            <input type="password" name="password" onChange={handleChange} className="form-control" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
        </form>
      </div>
    </>
  )
}

export default Login
