import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().min(5).required('password is required'),
})

export const formMakerSchema = Yup.object().shape({
  formName: Yup.string().required('Form Name is required'),
  deadline: Yup.date().required('Deadline is required'),
  formData: Yup.string().required('Form Data is required'),
  numberOfFields: Yup.string().required('Number of tickets is required'),
  fields: Yup.array().of(
    Yup.object().shape({
      fieldName: Yup.string().required('Field Name is required'),
      // fieldType: Yup.string().required('Field Type is required'),
      fieldType: Yup.bool().default(false),
    }),
  ),
})
