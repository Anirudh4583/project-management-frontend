import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { fillFormSchema } from '../../services/ValidationSchemas/ValidationSchema'

function FillForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fillFormSchema),
  })

  const [forms, setForms] = useState({})
  const [formFields, setFormFields] = useState([])
  // console.log(forms.form_data)
  // console.log(formFields)

  const { formId } = useParams()

  function onSubmit(data, e) {
    console.log(data, e)

    // axios
    //   .post('http://localhost:3001/api/announcement/add', {
    //     data,
    //   })
    //   .then((res) => {
    //     console.log('api response 🚀', res)
    //   })
    //   .catch((error) => {
    //     console.error(error.response)
    //   })
  }

  function onError(data, e) {
    console.log(data, e)
  }

  useEffect(() => {
    axios
      .post('http://localhost:3001/api/viewForm', {
        formId,
      })
      .then((res) => {
        console.log('get forms 🚀', res)
        setForms(res.data)
        setFormFields(res.data[0].form_fields)
      })
      .catch((error) => {
        console.error(error.response)
      })
  }, [])

  return (
    <div className="annCreate_app">
      <div className="FormMaker__app">
        <div className="card">
          <div className="card-header text-left bg-light fw-bold form-control-lg">
            {forms[0]?.form_name}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            onReset={() => reset()}
            className="card-body"
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="ms-2 me-auto">
                  <div className="row mb-3">
                    <div className="fw-bold">Form Details</div>
                    <div>{forms[0]?.form_data}</div>
                  </div>
                </div>
              </li>

              {formFields.map((field, id) => {
                // console.log(id)
                field = JSON.parse(field)
                return (
                  <li key={field.fieldName} className="list-group-item">
                    <div className="ms-2 me-auto">
                      <div className="form-row row">
                        <div className="form-group col-md-2 col-sm-4 has-validation">
                          <label htmlFor="annTarget">{field.fieldName}</label>
                          <input
                            {...register(`fields.${id}.fieldValue`)}
                            className="form-control"
                            id="annTarget"
                          />

                          <div className="invalid-feeback text-danger">
                            {errors.fields?.[id]?.fieldValue?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-3">
                Save
              </button>
              <button type="reset" className="btn btn-secondary mx-3">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FillForm
