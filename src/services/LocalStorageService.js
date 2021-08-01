export const getToken = () => {
  return localStorage.getItem('token') || null
}

export const removeSession = () => {
  localStorage.removeItem('token')
}

export const setSession = (token) => {
  if (!localStorage.getItem('token')) localStorage.setItem('token', token)
}
