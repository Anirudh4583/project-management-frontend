import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { formMakerSchema } from '../../services/ValidationSchemas/ValidationSchema'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
import FormField from './FormField'

function CreateForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formMakerSchema),
  })
  const watchFields = watch('numberOfFields')

  function fieldNumbers() {
    return [...Array(parseInt(watchFields || 0)).keys()]
  }

  function onSubmit(data, e) {
    console.log(data, e)
    console.log(JSON.stringify(data, null, 4))

    axios
      .post(
        'https://design-project-backend.herokuapp.com/api/announcement/add',
        data,
        {
          headers: {
            accesstoken: getToken(),
          },
        },
      )
      .then((res) => {
        console.log('api response 🚀', res)
      })
      .catch((error) => {
        console.error(error.response)
      })
  }

  function onError(data, e) {
    console.log(data, e)
  }

  return (
    <div className="FormMaker__app">
      <div className="card">
        <div className="card-header text-left bg-light fw-bold form-control-lg">
          Create Form
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          onReset={() =>
            reset({
              formName: '',
              deadline: '',
              formData: '',
              numberOfFields: '',
            })
          }
          className="card-body"
        >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Form Details</div>
                <div className="form-row row mb-3">
                  <div className="form-group col-md-3 col-sm-4 has-validation">
                    <label htmlFor="formName">Form Name</label>
                    <input
                      type="text"
                      {...register('formName')}
                      className={`form-control ${
                        errors.formName ? 'is-invalid' : ''
                      }`}
                      id="formName"
                      placeholder="Form 1"
                    />
                    <div className="invalid-feeback text-danger">
                      {errors.formName?.message}
                    </div>
                  </div>

                  <div className="form-group col-md-3 col-sm-4">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                      type="date"
                      {...register('deadline')}
                      className={`form-control ${
                        errors?.deadline ? 'is-invalid' : ''
                      }`}
                      id="deadline"
                    />
                    <div className="invalid-feeback text-danger">
                      {errors.deadline?.message}
                    </div>
                  </div>
                </div>
                <div className="form-row row mb-3">
                  <div className="form-group col-md-6 col-sm-8 has-validation">
                    <label htmlFor="formData">Form Details</label>
                    <textarea
                      rows="3"
                      {...register('formData')}
                      className={`form-control ${
                        errors.formData ? 'is-invalid' : ''
                      }`}
                      id="formData"
                      placeholder="Form instructions, details etc.."
                    />
                    <div className="invalid-feeback text-danger">
                      {errors.formData?.message}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Form Fields</div>

                <div className="form-row row">
                  <div className="form-group col-md-2 col-sm-3 has-validation">
                    <label htmlFor="numberOfFields">Number of Fileds</label>
                    <select
                      name="numberOfFields"
                      {...register('numberOfFields')}
                      className={`form-control ${
                        errors.numberOfFields ? 'is-invalid' : ''
                      }`}
                      id="numberOfFields"
                    >
                      {['', 1, 2, 3, 4, 5].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.numberOfFields?.message}
                    </div>
                  </div>
                </div>
                {fieldNumbers().map((field) => (
                  <FormField
                    field={field}
                    register={register}
                    errors={errors}
                  />
                ))}
              </div>
            </li>
          </ul>
          <div className="text-center">
            <button type="submit" className="btn btn-primary mx-3">
              Save Form
            </button>
            <button type="reset" className="btn btn-secondary mx-3">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateForm
