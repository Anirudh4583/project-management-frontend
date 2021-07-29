export const getToken = () => {
  return localStorage.getItem('token') || null;
};

export const removeUserSession = () => {
  localStorage.removeItem('token');
};

export const setUserSession = (token) => {
  if (!localStorage.getItem('token')) localStorage.setItem('token', token);
};
