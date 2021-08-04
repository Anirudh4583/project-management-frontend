import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().min(5).required('password is required'),
})
