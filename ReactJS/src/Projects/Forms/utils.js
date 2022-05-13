export const checkUsername = (username) => {
  return !!username
}

export const checkPassword = (password) => {
  if (password.length < 8) return false
  return /[0-9]/.test(password)
}
