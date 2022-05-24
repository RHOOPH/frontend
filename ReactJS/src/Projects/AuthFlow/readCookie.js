let lastCookieString
let lastCookies = {}

export default function readCookie(name) {
  let cookieString = document.cookie || ""
  if (cookieString !== lastCookieString) {
    lastCookieString = cookieString
    lastCookies = cookieString.split("; ").reduce((obj, value) => {
      let parts = value.split("=")
      obj[parts[0]] = parts[1]
      return obj
    }, {})
  }
  return lastCookies[name]
}
