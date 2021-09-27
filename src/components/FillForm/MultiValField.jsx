import React, { useRef, useState } from 'react'

function MultiValField({ field, id, register, setValue, errors, getValues }) {
  const fieldDataRef = useRef()
  const [noOfFieldData, setNoOfFieldData] = useState(0)

  return (
    <div className="form-row row">
      <div className="form-group col-md-2 col-sm-4 has-validation">
        <label htmlFor="fieldData">{field.fieldName}</label>
        <kbd className="mx-4">{getValues(`fields.${id}.fieldData`)}</kbd>
        <input
          {...register(`fields.${id}.fieldData.${noOfFieldData}`)}
          ref={fieldDataRef}
          className="form-control"
          id="fieldData"
          onFocus={() => {
            setValue(`fields.${id}.fieldName`, field.fieldName, {
              shouldValidate: true,
            })
            console.log(field.fieldType)
            setValue(`fields.${id}.fieldType`, field.fieldType, {
              shouldValidate: true,
            })
          }}
        />

        <div className="invalid-feeback text-danger">
          {errors.fields?.[id]?.fieldData[0]?.message}
        </div>
      </div>
      <button
        className="btn btn-outline-primary col-1 mt-4 p-1"
        style={{ width: '35px', height: '35px' }}
        onClick={() => {
          // setValue(
          //   `fields.${id}.fieldData[${noOfFieldData}]`,
          //   fieldDataRef.current.value,
          // )
          setNoOfFieldData(noOfFieldData + 1)
          fieldDataRef.current.value = ''
        }}
        // disabled={fieldDataRef.current.value == ''}
      >
        +
      </button>
    </div>
  )
}

export default MultiValField
