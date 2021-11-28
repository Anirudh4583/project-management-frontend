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
        const email = res.data.email
        setSession(token, userRole,email)
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
      className="container d-flex justify-content-center align-items-center mt-4"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <div className="card d-flex flex-row p-4 shadow-2xl">
        <div className="" style={{ width: '30em', height: '30em' }}>
          <h1>Welcome to Project Manager Portal</h1>

          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_0tue65cn.json"
            background="transparent"
            speed="1"
            style={{ width: '475px', height: '300px' }}
            loop
            autoplay
          ></lottie-player>
        </div>
        <form
          className="login-form card shadow-md rounded-2xl"
          style={{ width: '20em', height: '30em' }}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="card-body mt-5">
            <h1 className="text-center fw-bolder">Log-In</h1>
            <div className="form-group m-3 my-4 has-validation">
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
            <div className="form-group m-3 my-4 has-validation">
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
            <div className="form-group d-flex justify-content-center m-2 my-4">
              <button
                type="submit"
                className="btn btn-primary btn-block rounded-pill w-75"
              >
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
      </div>
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
