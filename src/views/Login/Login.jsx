import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaKey, FaUser } from 'react-icons/fa'
import { Snackbar, Alert } from '@mui/material'
import { setSession } from '../../services/LocalStorageService/LocalStorageService'
import { loginSchema } from '../../services/ValidationSchemas/ValidationSchema'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const [isError, setIsError] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')
  const history = useHistory()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setIsError(false)
  }

  function onSubmit(data, e) {
    // console.log(data)
    // alert('SUCCESS!🚀')

    axios
      .post('https://design-project-backend.herokuapp.com/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log('login api response 🚀', res)
        const userRole = res.data.role[0]
        const token = res.data.accessToken
        setSession(token, userRole)
        history.push(`/${userRole}/dashboard`)
      })
      .catch((error) => {
        setIsError(true)
        seterrorMessage(error.response?.data?.message)
        console.error(error.response)
      })
  }

  function onError(data, e) {
    console.log(data, e)
    // alert('ERROR!💥')
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <form
        className="login-form card mt-5"
        style={{ width: '25em' }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h2 className="card-header text-center">Log in</h2>
        <div className="card-body">
          <div className="form-group m-3 has-validation">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <FaUser className="m-1" />
                </div>
              </div>
              <input
                type="text"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="email"
              />
            </div>
            <div className="invalid-feeback text-danger mx-4">
              {errors.email?.message}
            </div>
          </div>
          <div className="form-group m-3 has-validation">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <FaKey className="m-1" />
                </div>
              </div>
              <input
                type="password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                placeholder="Password"
              />
            </div>
            <div className="invalid-feeback text-danger mx-4">
              {errors.password?.message}
            </div>
          </div>
          <div className="form-group d-flex justify-content-center m-3 mt-4">
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
          </div>
          <div className="d-flex justify-content-between mx-3">
            <div className="clearfix">
              <label className="float-left form-check-label">
                <input type="checkbox" /> Stay logged in
              </label>
            </div>
            <NavLink
              exact
              activeClassName="active"
              to="/forgotPassword"
              className="float-right"
            >
              Forgot Password?
            </NavLink>
          </div>
        </div>
      </form>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
