import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().min(5).required('password is required'),
})

export const formMakerSchema = Yup.object().shape({
  formName: Yup.string()
    .required('Form Name is required')
    .matches(/^[A-Za-z0-9]*$/, 'Form Name can only contain A-Z, a-z, 0-9'),
  deadline: Yup.date().required('Deadline is required'),
  formData: Yup.string().required('Form Data is required'),
  numberOfFields: Yup.string().required('Number of Fields is required'),
  fields: Yup.array().of(
    Yup.object().shape({
      fieldName: Yup.string().required('Field Name is required'),
      fieldType: Yup.bool().default(false),
    }),
  ),
})

export const announcementSchema = Yup.object().shape({
  isNewThread: Yup.bool(),
  threadData: Yup.object().shape({
    threadName: Yup.string().when('isNewThread', {
      is: true,
      then: Yup.string().required('Thread Name is required'),
      otherwise: Yup.string().nullable(),
    }),
    linkThreadID: Yup.string().when('isNewThread', {
      is: false,
      then: Yup.string().required('Thread ID is required'),
      otherwise: Yup.string().nullable(),
    }),
  }),

  annName: Yup.string()
    .required('Announcement Name is required')
    .matches(
      /^[A-Za-z0-9]*$/,
      'Announcement Name can only contain A-Z, a-z, 0-9',
    ),
  annData: Yup.string().required('Announcement Data is required'),
  annTarget: Yup.number().required('Target is required'),
  // .required('Number of Fields is required')
  isForm: Yup.bool().default(false),

  // form data
  formName: Yup.string().when('isForm', {
    is: true,
    then: Yup.string()
      .required('Form Name is required')
      .matches(/^[A-Za-z0-9]*$/, 'Form Name can only contain A-Z, a-z, 0-9'),
    otherwise: Yup.string().nullable(),
  }),

  deadline: Yup.date().when('isForm', {
    is: true,
    then: Yup.date().required('Deadline is required'),
    otherwise: Yup.date().nullable(),
  }),

  formData: Yup.string().when('isForm', {
    is: true,
    then: Yup.string().required('Form Data is required'),
    otherwise: Yup.string().nullable(),
  }),

  numberOfFields: Yup.string().when('isForm', {
    is: true,
    then: Yup.string().required('Number of Fields is required'),
    otherwise: Yup.string().nullable(),
  }),

  // array baad me dekhta hu
  fields: Yup.array().when('isForm', {
    is: true,
    then: Yup.array().of(
      Yup.object().shape({
        fieldName: Yup.string().required('Field Name is required'),
        fieldType: Yup.bool().default(false),
      }),
    ),
    otherwise: Yup.array().nullable(),
  }),
})

export const fillFormSchema = Yup.object().shape({
  fields: Yup.array().of(
    Yup.object().shape({
      fieldType: Yup.bool().default(false),
      fieldName: Yup.string().required('Field name is required'),

      fieldData: Yup.array().when('fieldType', {
        is: true,
        then: Yup.array().of(Yup.string().required()),
        otherwise: Yup.array().of(
          Yup.string().required('Field value is required'),
        ),
      }),
    }),
  ),
})
