const validateUserName = () => {
  const username = document.getElementById("username").value
  document.getElementById("validationUserName").innerText = username
    ? ""
    : "Username is required"

  return username
}
const validatePassword = (e) => {
  const checkIfValid = (str) => {
    if (str.length < 8) return false
    return str.match(/[0-9]/)
  }
  const password = document.getElementById("password").value
  const isValid = checkIfValid(password)

  document.getElementById("validationPassword").innerText = isValid
    ? ""
    : "Password must have 8 characters and at least 1 digit."

  return isValid
}

const submit = document.getElementById("submit")

submit.onclick = (e) => {
  if (!(validateUserName() && validatePassword())) e.preventDefault()
}
