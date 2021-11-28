export const getToken = () => {
  return localStorage.getItem('token') || null
}

export const getRole = () => {
  return localStorage.getItem('role') || null
}

export const getUserEmail = () => {
  return localStorage.getItem('email') || null
}
export const removeSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('email')
}

export const setSession = (token, role,email) => {
  // console.log(token, role)
  if (!localStorage.getItem('token')) localStorage.setItem('token', token)
  if (!localStorage.getItem('role')) localStorage.setItem('role', role)
  if (!localStorage.getItem('email')) localStorage.setItem('email', email)
}

