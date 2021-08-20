import React from 'react'

function FormField({ field, register, errors }) {
  //   console.log(errors)
  return (
    <div key={field} className="form-row row mt-3">
      {/* filed name */}
      <div className="form-group col-md-3 col-sm-5">
        <label htmlFor={`fieldName[${field}]`}>Field {field + 1} Name</label>
        <input
          type="text"
          {...register(`fields.${field}.fieldName`)}
          className={`form-control ${
            errors.fields?.[field]?.fieldName ? 'is-invalid' : ''
          }`}
          id={`fieldName[${field}]`}
          placeholder={`Field ${field + 1} Name`}
        />
        <div className="invalid-feeback text-danger">
          {errors.fields?.[field]?.fieldName?.message}
        </div>
      </div>
      {/* filed type */}
      {/* <div className="form-group col-md-2 col-sm-3">
        <label htmlFor={`filedType[${field}]`}>Field {field + 1} Name</label>
        <input
          type="text"
          {...register(`fields[${field}]filedType`)}
          className={`form-control ${
            errors.fields?.[field]?.filedType ? 'is-invalid' : ''
          }`}
          id={`filedType[${field}]`}
          placeholder={`Field ${field + 1} Name`}
        />
        <div className="invalid-feeback text-danger">
          {errors.fields?.[field]?.filedType?.message}
        </div>
      </div> */}

      {/* is filed multi valued */}
      <div className="form-group form-switch col-md-4 col-sm-5 mt-4 mx-4">
        <input
          type="checkbox"
          {...register(`fields.${field}.fieldType`)}
          className={'form-check-input'}
          id={`fieldType[${field}]`}
        />
        <label
          htmlFor={`fieldType[${field}]`}
          className="form-check-label mx-2"
        >
          Accept Multiple Values?
        </label>
      </div>
    </div>
  )
}

export default FormField
