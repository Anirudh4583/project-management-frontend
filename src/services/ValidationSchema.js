import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  username: Yup.string().email().required('username is required'),
  password: Yup.string().min(5).required('password is required'),
})
