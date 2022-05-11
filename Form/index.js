const validateUserName = (e) => {
  document.getElementById("validationUserName").innerText = e.value
    ? ""
    : "Username is required"
}
const validatePassword = (e) => {
  const isValid = (str) => {
    if (str.length < 8) return false
    return str.match(/[0-9]/)
  }
  document.getElementById("validationPassword").innerText = isValid(e.value)
    ? ""
    : "Password must have 8 characters and at least 1 digit."
}
