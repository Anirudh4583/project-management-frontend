import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
import { fillFormSchema } from '../../services/ValidationSchemas/ValidationSchema'
import MultiValField from './MultiValField'
import { useHistory } from 'react-router'
function FillForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fillFormSchema),
  })
  const history = useHistory()
  const currentDate = new Date()
  const [forms, setForms] = useState({})
  const [formFields, setFormFields] = useState([])
  const [formDeadline, setformDeadline] = useState(new Date())

  const { formId } = useParams()

  useEffect(() => {
    axios
      .post(
        'https://design-project-backend.herokuapp.com/api/viewForm/',
        { formId: formId },
        {
          headers: {
            accesstoken: getToken(),
          },
        },
      )
      .then((res) => {
        console.log('get form 🚀', res)
        setForms(res.data)
        setFormFields(res.data[0].form_fields)
        setformDeadline(new Date(res.data[0].form_deadline))
      })
      .catch((error) => {
        console.error(error.response)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(data, e) {
    // console.log('%cSubmit', 'color: red', data, e)
    axios
      .post(
        'https://design-project-backend.herokuapp.com/api/submitForm/1',
        {
          data,
          formId,
        },
        {
          headers: {
            accesstoken: getToken(),
          },
        },
      )
      .then((res) => {
        console.log('api response 🚀', res)
        history.push('/dashboard')
      })
      .catch((error) => {
        console.error(error.response)
      })
  }

  function onError(data, e) {
    console.log(data, e)
  }

  return (
    <>
      {/* console.log(currentDate, formDeadline) */}
      {currentDate <= formDeadline ? (
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
                          {field.fieldType ? (
                            <MultiValField
                              field={field}
                              id={id}
                              register={register}
                              setValue={setValue}
                              errors={errors}
                              getValues={getValues}
                            />
                          ) : (
                            <div className="form-row row">
                              <div className="form-group col-md-2 col-sm-4 has-validation">
                                <label htmlFor="fieldData">
                                  {field.fieldName}
                                </label>
                                <input
                                  {...register(`fields.${id}.fieldData[0]`)}
                                  className="form-control"
                                  id="fieldData"
                                  onFocus={() =>
                                    setValue(
                                      `fields.${id}.fieldName`,
                                      field.fieldName,
                                      {
                                        shouldValidate: true,
                                      },
                                    )
                                  }
                                />

                                <div className="invalid-feeback text-danger">
                                  {errors.fields?.[id]?.fieldData[0]?.message}
                                </div>
                              </div>
                            </div>
                          )}
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
      ) : (
        <div>
          <div className="alert alert-danger">
            This form is no longer accepting responses. Please contact the
            admin.
          </div>
        </div>
      )}
    </>
  )
}

export default FillForm
