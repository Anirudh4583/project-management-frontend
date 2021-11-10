import React, { useState } from 'react'

function MultiValField({ field, id, register, setValue, errors, getValues }) {
  const [noOfFieldData, setNoOfFieldData] = useState([0])

  return (
    <div className="form-row row">
      <div className="form-group col-md-2 col-sm-4 has-validation">
        <label htmlFor="fieldData">{field.fieldName}</label>
        <kbd className="mx-4">
          {JSON.stringify(getValues(`fields.${id}.fieldData`), null, 0)}
        </kbd>
        {noOfFieldData.map((item, index) => (
          <input
            {...register(`fields.${id}.fieldData.${item}`)}
            key={index}
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
        ))}

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
          setNoOfFieldData((noOfFieldData) => [
            ...noOfFieldData,
            noOfFieldData.length,
          ])
        }}
      >
        +
      </button>
    </div>
  )
}

export default MultiValField
