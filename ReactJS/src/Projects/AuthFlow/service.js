let lastCookieString
let lastCookies = {}

function readCookie(name) {
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

export function getHeaders(file, offset) {
  const attachment = file.file
  if (!attachment) {
    return
  }
  const headers = {
    "X-File-Name": attachment.name,
    "X-File-Offset": offset,
    "X-File-Size": attachment.size,
    "X-File-Type": attachment.type,
    "X-CSRF-Token": readCookie("CSRF-TOKEN"),
  }
  if (file.id) {
    headers["X-File-Id"] = file.id
  }
  return headers
}

export class Service {
  constructor() {
    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")
    headers.append("X-Requested-With", "XMLHttpRequest")
    headers.append("Access-Control-Allow-Headers", "*")
    headers.append("Access-Control-Allow-Methods", "*")
    headers.append("Access-Control-Allow-Credentials", true)
    headers.append("Access-Control-Allow-Origin", "*")
    headers.append("X-CSRF-Token", readCookie("CSRF-TOKEN"))
    // readCookie("CSRF-TOKEN")
    this.baseURL = process.env.NODE_ENV === "production" ? ".." : ".."
    this.headers = headers
  }

  fetch(url, method, options) {
    return fetch(url, options)
      .then((data) => {
        if (["head"].indexOf(method.toLowerCase()) !== -1) return data
        let isJSON = data.headers
          .get("content-type")
          .includes("application/json")
        return isJSON ? data.json() : data
      })
      .catch((err) => {})
  }

  request(url, config = {}, data = {}) {
    const options = Object.assign(
      {
        method: "POST",
        credentials: "include",
        headers: this.headers,
        mode: "cors",
        body: JSON.stringify(data),
      },
      config
    )
    if (config.method === "GET") {
      delete options.body
    }
    return this.fetch(
      `${this.baseURL}${url.indexOf("/") === 0 ? url : `/${url}`}`,
      config.method,
      options
    )
  }

  get(url) {
    const config = {
      method: "GET",
    }
    return this.request(url, config)
  }

  post(url, data) {
    const config = {
      method: "POST",
    }
    return this.request(url, config, data)
  }
}
export default new Service()
