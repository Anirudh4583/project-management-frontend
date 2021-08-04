import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaKey, FaUser } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@services/ValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { setSession } from '../../services/LocalStorageService'

var userRole = null

function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  function onSubmit(data, e) {
    // console.log(data)
    alert('SUCCESS!🚀')

    axios
      .post('http://localhost:3001/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log('api response 🚀', res)
        setSession('dummy_token')
        userRole = res.data.role
        props.history.push('/dashboard')
      })
      .catch((error) => {
        console.error(error.response)
      })
  }

  function onError(data, e) {
    console.log(data, e)
    // alert('ERROR!💥')
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
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
              Forgot Password
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
export { userRole }
