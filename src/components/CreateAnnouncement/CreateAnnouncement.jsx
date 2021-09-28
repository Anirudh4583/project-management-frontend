import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from '../compIndex'
import axios from 'axios'
import { announcementSchema } from '../../services/ValidationSchemas/ValidationSchema'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'

function CreateAnnouncement() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(announcementSchema),
  })
  const [isSendMail, setIsSendMail] = useState(false)
  //   console.log(watchFields)

  const watchFields = watch('numberOfFields')
  const watchIsForm = watch('isForm')
  const watchIsNewThread = watch('isNewThread')

  const [threads, setThreads] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/thread/')
      .then((res) => {
        console.log('get threads 🚀', res)
        setThreads(res.data.data)
      })
      .catch((error) => {
        console.error(error.response)
      })
  }, [])

  // console.log('hello', announcements)

  function fieldNumbers() {
    return [...Array(parseInt(watchFields || 0)).keys()]
  }
  //   console.log(fieldNumbers())

  function onSubmit(data, e) {
    console.log('submit data', data, e)
    // alert('SUCCESS!')
    console.log(JSON.stringify(data, null, 4))

    axios
      .post('http://localhost:3001/api/announcement/add',
        data,
        {
          headers:
          {
            accesstoken: getToken(),
          }
          },
      )
      .then((res) => {
        console.log('api response 🚀', res)
      })
      .catch((error) => {
        console.error(error.response)
      })

    {
      isSendMail &&
        axios
          .post('http://localhost:3001/api/mail', {
            // data,
            mailSubject: 'New Announcement Alert',
            mailBody: JSON.stringify(data, null, 4),
          })
          .then((res) => {
            console.log('mail api response 📧', res)
          })
          .catch((error) => {
            console.error(error.response)
          })
    }
  }

  function onError(data, e) {
    console.log(data, e)
  }

  return (
    <div className="annCreate_app">
      <div className="FormMaker__app">
        <div className="card">
          <div className="card-header text-left bg-light fw-bold form-control-lg">
            Create Announcement
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            onReset={() => reset()}
            className="card-body"
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="form-group form-switch ms-2 me-auto my-2 p-0">
                  <label htmlFor="isNewThread" className="form-check-label">
                    New Thread?
                  </label>
                  <input
                    type="checkbox"
                    {...register(`isNewThread`)}
                    className="form-check-input mx-3"
                    id="isNewThread"
                  />
                </div>

                {watchIsNewThread ? (
                  <div className="form-group col-md-3 col-sm-4 has-validation">
                    <label htmlFor="threadName">Thread Name</label>
                    <input
                      type="text"
                      {...register('threadData.threadName')}
                      className={`form-control ${
                        errors.threadData?.threadName ? 'is-invalid' : ''
                      }`}
                      id="threadName"
                      placeholder="Thread1"
                    />
                    <div className="invalid-feeback text-danger">
                      {errors.threadData?.threadName?.message}
                    </div>
                  </div>
                ) : (
                  <div className="form-group col-md-2 col-sm-4">
                    <label htmlFor="linkThreadID">Link To thread</label>
                    <select
                      {...register('threadData.linkThreadID')}
                      className={`form-control ${
                        errors.threadData?.linkThreadID ? 'is-invalid' : ''
                      }`}
                      id="linkThreadID"
                      defaultValue={''}
                    >
                      {/* <option value={null} selected disabled hidden>
                        select target
                      </option> */}
                      {threads.map((value) => {
                        return (
                          <option value={value.thread_id}>
                            {value.thread_name}
                          </option>
                        )
                      })}
                    </select>

                    <div className="invalid-feeback text-danger">
                      {errors.threadData?.linkThreadID?.message}
                    </div>
                  </div>
                )}
              </li>
              <li className="list-group-item">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Announcement Details</div>
                  <div className="form-row row mb-3">
                    <div className="form-group col-md-3 col-sm-4 has-validation">
                      <label htmlFor="annName">Announcement Name</label>
                      <input
                        type="text"
                        {...register('annName')}
                        className={`form-control ${
                          errors.annName ? 'is-invalid' : ''
                        }`}
                        id="annName"
                        placeholder="Announcement1"
                      />
                      <div className="invalid-feeback text-danger">
                        {errors.annName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-row row mb-3">
                    <div className="form-group col-md-6 col-sm-8 has-validation">
                      <label htmlFor="annData">Announcement Details</label>
                      <textarea
                        rows="3"
                        {...register('annData')}
                        className={`form-control ${
                          errors.annData ? 'is-invalid' : ''
                        }`}
                        id="annData"
                        placeholder="Instructions, details etc.."
                      />
                      <div className="invalid-feeback text-danger">
                        {errors.annData?.message}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="ms-2 me-auto">
                  <div className="form-row row">
                    <div className="form-group col-md-2 col-sm-4">
                      <label htmlFor="annTarget">Target</label>
                      {/* <select
                        {...register('annTarget')}
                        className="form-control"
                        id="annTarget"
                        defaultValue={''}
                      >
                       
                        <option value={2}>student</option>
                        <option value={1}>faculty</option>
                      </select> */}

                      <div
                        class="btn-toolbar"
                        role="toolbar"
                        aria-label="Toolbar with button groups"
                      >
                        <div
                          class="btn-group me-2"
                          role="group"
                          aria-label="faculty group"
                        >
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="btncheck1"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-primary"
                            for="btncheck1"
                          >
                            Faculty
                          </label>
                        </div>

                        <div
                          class="btn-group"
                          role="group"
                          aria-label="student group"
                        >
                          <button type="button" class="btn btn-primary">
                            1
                          </button>
                          <button type="button" class="btn btn-primary">
                            2
                          </button>
                          <button type="button" class="btn btn-primary">
                            3
                          </button>
                          <button type="button" class="btn btn-primary">
                            4
                          </button>
                        </div>
                      </div>

                      <div className="invalid-feeback text-danger">
                        {errors.annTarget?.message}
                      </div>
                    </div>

                    <div className="form-group form-switch col-md-4 col-sm-5 mt-4 mx-4">
                      <label htmlFor="isMail" className="form-check-label">
                        Send mail?
                      </label>
                      <input
                        type="checkbox"
                        // {...register(`isForm`)}
                        defaultChecked={isSendMail}
                        onChange={() => setIsSendMail(!isSendMail)}
                        className="form-check-input mx-3"
                        id="isMail"
                      />
                    </div>
                  </div>
                </div>
              </li>

              <li className="list-group-item">
                <div className="form-group form-switch ms-2 me-auto my-2 p-0">
                  <label htmlFor="isForm" className="form-check-label">
                    Add form?
                  </label>
                  <input
                    type="checkbox"
                    {...register(`isForm`)}
                    className="form-check-input mx-3"
                    id="isForm"
                  />
                </div>

                {watchIsForm && (
                  <>
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
                  </>
                )}
              </li>

              {watchIsForm && (
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

                    {/* <div className="form-group mt-3">
                  <div className="form-check form-switch">
                  <input
                  type="checkbox"
                  className="form-check-input"
                  id="inputRev"
                  />
                  <label className="form-check-label" htmlFor="inputRev">
                  Send order for review
                  </label>
                  </div>
                </div> */}
                  </div>
                </li>
              )}
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

export default CreateAnnouncement
